'use strict';
const { Model, DataTypes } = require('sequelize');

class DonatePackages extends Model {
  static init(sequelize) {
    super.init({
        name: DataTypes.STRING(100),
        percent: DataTypes.INTEGER.UNSIGNED,
        value: DataTypes.INTEGER.UNSIGNED,
        donate: DataTypes.INTEGER.UNSIGNED,
    }, {
      sequelize,
      modelName: 'donate_packages'
    });
    return this;
  }
}
  
module.exports = DonatePackages;