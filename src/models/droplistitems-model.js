'use strict';
const { Model, DataTypes } = require('sequelize');

class DroplistItems extends Model {
  static init(sequelize) {
    super.init({
        droplist_id: {
            type: DataTypes.UUIDV4,
            allowNull: false,
        },
        item_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        eff1: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        effv1: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        eff2: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        effv2: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        eff3: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        effv3: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        slug: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
    }, {
      sequelize,
      modelName: 'droplist_items'
    });
    return this;
  }
}

module.exports = DroplistItems;