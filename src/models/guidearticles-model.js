'use strict';
const { Model, DataTypes } = require('sequelize');

class GuideArticles extends Model {
  static init(sequelize) {
    super.init({
        title: DataTypes.STRING(100),
        slug: DataTypes.STRING(50),
        content: DataTypes.TEXT,
        id_user: DataTypes.UUIDV4,
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