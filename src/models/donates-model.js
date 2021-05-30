'use strict';
const { Model, DataTypes } = require('sequelize');

class Donates extends Model {
  static init(sequelize) {
    super.init({
        id_user: {
          type: DataTypes.UUIDV4,
          allowNull: false,
        },
        id_package: {
          type: DataTypes.UUIDV4,
          allowNull: false,
        },
        state: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
    }, {
      sequelize,
      modelName: 'donates'
    });
    return this;
  }
}

module.exports = Donates;