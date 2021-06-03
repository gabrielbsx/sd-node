'use strict';
const { Model, DataTypes } = require('sequelize');

class ForumPosts extends Model {
  static init(sequelize) {
    super.init({
        id_user: {
          type: DataTypes.UUIDV4,
          allowNull: false,
        },
        id_subtopic: {
          type: DataTypes.UUIDV4,
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        like: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
        slug: {
          type: DataTypes.STRING(100),
          allowNull: false,
          unique: true,
        },
    }, {
      sequelize,
      modelName: 'forum_posts'
    });
    return this;
  }
}

module.exports = ForumPosts;