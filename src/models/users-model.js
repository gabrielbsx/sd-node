"use strict";
const { Model, DataTypes } = require("sequelize");

class Users extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        username: {
          type: DataTypes.STRING(12),
          unique: true,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING(60),
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        access: {
          type: DataTypes.INTEGER(1)
        },
        status: {
          type: DataTypes.INTEGER(1)
        },
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
