'use strict';
const { Model, DataTypes } = require('sequelize');

class DonateItems extends Model {
  static init(sequelize) {
    super.init({
      slug: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      id_package: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      itemname: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      item_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      eff1: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      effv1: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      eff2: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      effv2: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      eff3: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      effv3: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
    }, {
      sequelize,
      modelName: 'donate_items'
    });
    return this;
  }

  static associate(models) {
    this.hasOne(model.DonatePackage, { foreignKey: 'id_package', as: 'package' })
  }
}
  
module.exports = DonateItems;