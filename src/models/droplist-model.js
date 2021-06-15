'use strict';
const { Model, DataTypes } = require('sequelize');

class Droplist extends Model {
  static init(sequelize) {
    super.init({
        mapname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        slug: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
    }, {
      sequelize,
      modelName: 'droplist'
    });
    return this;
  }
}

module.exports = Droplist;