'use strict';
const { Model, DataTypes } = require('sequelize');

class Guides extends Model {
  static init(sequelize) {
    super.init({
        title: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        slug: {
          type: DataTypes.STRING(100),
          allowNull: false,
          unique: true,
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        id_user: {
          type: DataTypes.UUIDV4,
          unique: true,
          allowNull: false,
        },
    }, {
      sequelize,
      modelName: 'guides'
    });
    return this;
  }

  static associate(models) {
    this.belongsToMany(model.User, { foreignKey: 'id_user', as: 'owner' });
  }
}
  
module.exports = Guides;