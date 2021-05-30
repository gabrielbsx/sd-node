'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('picpay_gateway', {
      xpicpaytoken: {
        type: Sequelize.STRING(),
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      xsellertoken: {
        type: Sequelize.STRING(),
        allowNull: false,
        unique: true,
        primaryKey: true,
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
    return await queryInterface.dropTable('picpay_gateway');
  }
};
