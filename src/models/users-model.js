"use strict";
const { Model, DataTypes } = require("sequelize");

class Users extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING(50),
        username: DataTypes.STRING(12),
        password: DataTypes.STRING(60),
        email: DataTypes.STRING(100),
        access: DataTypes.INTEGER(1),
        status: DataTypes.INTEGER(1),
      },
      {
        sequelize,
        modelName: "users",
      }
    );
    return this;
  }
}

module.exports = Users;
