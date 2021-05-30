'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('donates', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      id_user: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },
      id_package: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },
      state: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      method: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      reference_id: {
        type: Sequelize.STRING(),
        allowNull: false,
        unique: true,
      },
      content: {
        type: Sequelize.STRING(),
        allowNull: false,
      },
      payment_url: {
        type: Sequelize.STRING(),
        allowNull: false,
      },
      qrcode: {
        type: Sequelize.STRING(),
        allowNull: true,
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
    return await queryInterface.dropTable('donates');
  }
};
