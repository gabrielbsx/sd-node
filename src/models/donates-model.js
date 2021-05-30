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
        reference_id: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        content: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        state: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        payment_url: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        qrcode: {
          type: DataTypes.STRING,
          allowNull: true,
        },
    }, {
      sequelize,
      modelName: 'donates'
    });
    return this;
  }
}

module.exports = Donates;