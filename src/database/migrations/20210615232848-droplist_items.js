'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     return await queryInterface.createTable('droplist_items', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      droplist_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },
      item_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      eff1: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      effv1: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      eff2: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      effv2: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      eff3: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      effv3: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      slug: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
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
    return await queryInterface.dropTable('droplist_items');
  }
};
