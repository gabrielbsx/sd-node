'use strict';
const { Model, DataTypes } = require('sequelize');

class ForumTopics extends Model {
  static init(sequelize) {
    super.init({
        id_user: {
          type: DataTypes.UUIDV4,
          allowNull: false,
        },
        id_board: {
          type: DataTypes.UUIDV4,
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
    }, {
      sequelize,
      modelName: 'forum_topics'
    });
    return this;
  }
}

module.exports = ForumTopics;