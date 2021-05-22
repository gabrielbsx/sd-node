'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('guilds', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      guild_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        unique: true,
      },
      name: {
        type: Sequelize.STRING(),
        allowNull: false,
        unique: true,
      },
      sub01: {
        type: Sequelize.STRING(),
      },
      sub02: {
        type: Sequelize.STRING(),
      },
      sub03: {
        type: Sequelize.STRING(),
      },
      citizen: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      kingdom: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      fame: {
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
    return await queryInterface.dropTable('guilds');
  }
};
