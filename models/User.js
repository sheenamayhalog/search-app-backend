"use strict";
const { Model } = require("sequelize");
const { sq } = require("../sequelize");
const { DataTypes } = require("sequelize");
const Property = require("./Property");

const User = sq.define("User", {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
});

User.hasMany(Property, {
  foreignKey: "user_id",
  as: "properties"
});


module.exports = User;
