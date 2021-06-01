'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('rankings', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      nick: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      _class: {
        type: Sequelize.INTEGER(2),
        allowNull: false,
      },
      level: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      guildlevel: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      guild: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      kingdom: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      level: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      evolution: {
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
    return await queryInterface.dropTable('rankings');
  }
};
