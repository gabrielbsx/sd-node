'use strict';
const { Model, DataTypes } = require('sequelize');

class Donates extends Model {
  static init(sequelize) {
    super.init({
        id_user: DataTypes.UUIDV4,
        id_package: DataTypes.UUIDV4,
    }, {
      sequelize,
      modelName: 'donates'
    });
    return this;
  }
}

module.exports = Donates;