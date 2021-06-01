'use strict';
const { Model, DataTypes } = require('sequelize');

class News extends Model {
  static init(sequelize) {
    super.init({
        comment: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        likes: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        id_user: {
            type: DataTypes.UUIDV4,
            allowNull: false,
        },
        id_news: {
            type: DataTypes.UUIDV4,
            allowNull: false,
        },
    }, {
      sequelize,
      modelName: 'news_comments'
    });
    return this;
  }

  static associate(models) {
    this.belongsToMany(model.User, { foreignKey: 'id_user', as: 'owner' });
  }
}
  
module.exports = News;