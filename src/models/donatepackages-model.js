'use strict';
const { Model, DataTypes } = require('sequelize');

class DonatePackages extends Model {
  static init(sequelize) {
    super.init({
        name: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        slug: {
          type: DataTypes.STRING(100),
          allowNull: false,
          unique: true,
        },
        percent: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
        value: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
        donate: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
    }, {
      sequelize,
      modelName: 'donate_packages'
    });
    return this;
  }
}
  
module.exports = DonatePackages;