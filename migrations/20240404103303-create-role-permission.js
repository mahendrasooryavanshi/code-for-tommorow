"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Role_Permissions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      // roleId: {
      //   type: Sequelize.BIGINT,
      //   references: {
      //     model: "Roles",
      //     key: "id",
      //   },
      //   field: "role_id",
      // },
      // permissionId: {
      //   type: Sequelize.BIGINT,
      //   references: {
      //     model: "Permissions",
      //     key: "id",
      //   },
      //   field: "permission_id",
      // },
      status: {
        type: Sequelize.ENUM("active", "inactive"),
        defaultValue: "active",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: "created_at",
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: "updated_at",
      },
      deletedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: "deleted_at",
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Role_Permissions");
  },
};
