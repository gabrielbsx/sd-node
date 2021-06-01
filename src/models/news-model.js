'use strict';
const { Model, DataTypes } = require('sequelize');

class News extends Model {
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
        category: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        id_user: {
          type: DataTypes.UUIDV4,
          allowNull: false,
        },
        likes: {
          type: DataTypes.INTEGER,
          allowNull: false,
        }
    }, {
      sequelize,
      modelName: 'news'
    });
    return this;
  }

  static associate(models) {
    this.belongsToMany(model.User, { foreignKey: 'id_user', as: 'owner' });
  }
}
  
module.exports = News;