'use strict';
const { Model, DataTypes } = require('sequelize');

class GuideArticles extends Model {
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
          allowNull: false,
        },
    }, {
      sequelize,
      modelName: 'guide_articles'
    });
    return this;
  }

  static associate(models) {
    this.belongsToMany(model.User, { foreignKey: 'id_user', as: 'owner' });
  }
}
  
module.exports = GuideArticles;