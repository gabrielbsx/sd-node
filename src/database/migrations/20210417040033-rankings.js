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
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      classe: {
        type: Sequelize.INTEGER(2),
        allowNull: false,
      },
      ev: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      medal: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      power: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      ban: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      level: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      hasSub: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      sub_level: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      sub_class: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      sub_face: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 1,
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
