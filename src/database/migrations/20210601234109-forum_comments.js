'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('forum_comments', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      id_user: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      id_post: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      like: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable('forum_comments');
  }
};
