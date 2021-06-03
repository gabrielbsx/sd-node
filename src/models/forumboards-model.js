'use strict';
const { Model, DataTypes } = require('sequelize');

class ForumBoards extends Model {
  static init(sequelize) {
    super.init({
        id_user: {
          type: DataTypes.UUIDV4,
          allowNull: false,
        },
        name: {
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
      modelName: 'forum_boards'
    });
    return this;
  }
}

module.exports = ForumBoards;