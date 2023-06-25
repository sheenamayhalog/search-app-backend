"use strict";
const { Model } = require("sequelize");
const { sq } = require("../sequelize");
const { DataTypes } = require("sequelize");
const User = require("./User");

const Property = sq.define("Property", {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: "Users",
      key: "id",
    }
  },
  street: DataTypes.STRING,
  city: DataTypes.STRING,
  state: DataTypes.STRING,
  zip: DataTypes.STRING,
  rent: DataTypes.INTEGER,
});

Property.associate = (models) => {
  Property.belongsTo(models.User, {
    foreignKey: "user_id",
    as: "user"
  });
};


module.exports = Property;
