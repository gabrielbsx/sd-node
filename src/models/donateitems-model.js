'use strict';
const { Model, DataTypes } = require('sequelize');

class DonateItems extends Model {
  static init(sequelize) {
    super.init({
        id_package: DataTypes.INTEGER.UNSIGNED,
        itemname: DataTypes.STRING(100),
        item_id: DataTypes.INTEGER.UNSIGNED,
        eff1: DataTypes.INTEGER.UNSIGNED,
        effv1: DataTypes.INTEGER.UNSIGNED,
        eff2: DataTypes.INTEGER.UNSIGNED,
        effv2: DataTypes.INTEGER.UNSIGNED,
        eff3: DataTypes.INTEGER.UNSIGNED,
        effv3: DataTypes.INTEGER.UNSIGNED,
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