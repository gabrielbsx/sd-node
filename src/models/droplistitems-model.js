'use strict';
const { Model, DataTypes } = require('sequelize');

class DroplistItems extends Model {
  static init(sequelize) {
    super.init({
        droplist_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
        },
        item_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        eff1: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        effv1: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        eff2: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        effv2: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        eff3: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        effv3: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        slug: {
            type: Sequelize.STRING(100),
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