'use strict';
const Sequelize = require('sequelize');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Create the RoleMenuPermissions table
    await queryInterface.createTable('RoleMenuPermissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      RoleId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Roles', // The name of the target model (the table name)
          key: 'id',       // The name of the target column (the primary key)
        },
        onUpdate: 'CASCADE', // Cascade updates to related rows
        onDelete: 'CASCADE', // Cascade deletes to related rows
      },
      MenuId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Menus',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      PermissionId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Permissions',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    // Drop the RoleMenuPermissions table
    await queryInterface.dropTable('RoleMenuPermissions');
  },
};