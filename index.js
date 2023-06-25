const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 8000;
const User = require("./models/User");
const Property = require("./models/Property");
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");
const cors = require("cors");
const  { Op } = require("sequelize");
const sequelize = require("sequelize");


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var schema = buildSchema(`
  type SearchResult {
    street: String
    firstName: String
    lastName: String
    city: String
    state: String
    zip: String
    rent: Int,
    id: String
  }

  type Query {
    search(searchString: String): [SearchResult],
  }
`);

var root = {
  search: async ({ searchString }) => {
    const searchvalue = searchString.toLowerCase()
    var result = [];

    // perform db search here
    await Property.findAll({
      attributes: {
          exclude: ['createdAt', 'updatedAt']
      },
      where : {
        [Op.or]: [
          sequelize.where(sequelize.fn('LOWER', sequelize.col('street')), 'LIKE', '%' + searchvalue + '%'),
          sequelize.where(sequelize.fn('LOWER', sequelize.col('city')), 'LIKE', '%' + searchvalue + '%'),
          sequelize.where(sequelize.fn('LOWER', sequelize.col('state')), 'LIKE', '%' + searchvalue + '%'),
          sequelize.where(sequelize.fn('LOWER', sequelize.col('zip')), 'LIKE', '%' + searchvalue + '%'),
          sequelize.where(sequelize.cast(sequelize.col('rent'), 'varchar'), 'LIKE', '%' + searchvalue + '%')
        ]
      },
    }).then(data => {
      if(data?.length !== 0){
        data.map(property => {
          result.push(property)
        })
        
      }
    })

   await User.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
      where: {
        [Op.or]: [
          sequelize.where(sequelize.fn('LOWER', sequelize.col('firstName')), 'LIKE', '%' + searchvalue + '%'),
          sequelize.where(sequelize.fn('LOWER', sequelize.col('lastName')), 'LIKE', '%' + searchvalue + '%'),
          sequelize.where(sequelize.fn('LOWER', sequelize.col('properties.street')), 'LIKE', '%' + searchvalue + '%'),
          sequelize.where(sequelize.fn('LOWER', sequelize.col('properties.city')), 'LIKE', '%' + searchvalue + '%'),
          sequelize.where(sequelize.fn('LOWER', sequelize.col('properties.state')), 'LIKE', '%' + searchvalue + '%'),
          sequelize.where(sequelize.fn('LOWER', sequelize.col('properties.zip')), 'LIKE', '%' + searchvalue + '%'),
          sequelize.where(sequelize.cast(sequelize.col('properties.rent'), 'varchar'), 'LIKE', '%' + searchvalue + '%')
        ]
      },
      include:{
        model: Property,
        as: "properties",
      }
    }).then(data => {

      if (data?.length !== 0) {
        
        data.map(user => {
          const newUser = {
            ...user.dataValues,
            ...user.dataValues.properties[0]?.dataValues
          }
         
          result.push(newUser);
        })
      }
    });

    return result;
  },
};


app.use(
  "/api",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
  Property.sync().then(() => {
    console.log("Property Model created");
  });
  User.sync().then(() => {
    console.log("User Model synced");
  });
});
