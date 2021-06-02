'use strict';
const { Model, DataTypes } = require('sequelize');

class ForumComments extends Model {
  static init(sequelize) {
    super.init({
        id_user: {
          type: DataTypes.UUIDV4,
          allowNull: false,
        },
        id_post: {
          type: DataTypes.UUIDV4,
          allowNull: false,
        },
        comment: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        like: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
    }, {
      sequelize,
      modelName: 'forum_comments'
    });
    return this;
  }
}

module.exports = ForumComments;