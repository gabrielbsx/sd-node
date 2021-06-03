'use strict';
const { Model, DataTypes } = require('sequelize');

class ForumSubtopics extends Model {
  static init(sequelize) {
    super.init({
        id_user: {
          type: DataTypes.UUIDV4,
          allowNull: false,
        },
        id_topic: {
          type: DataTypes.UUIDV4,
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        slug: {
          type: DataTypes.STRING(100),
          allowNull: false,
          unique: true,
        },
    }, {
      sequelize,
      modelName: 'forum_subtopics'
    });
    return this;
  }
}

module.exports = ForumSubtopics;