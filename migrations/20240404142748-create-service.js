"use strict";

const category = require("../models/category");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Services", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      categoryID: {
        type: Sequelize.BIGINT,
        allowNull: false,
        field: "category_id",
      },
      serviceName: {
        type: Sequelize.STRING,
        field: "service_name",
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM("Normal", "VIP"),
        allowNull: false,
        defaultValue: "Normal",
      },
      price: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdBy: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: "created_by",
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
        allowNull: true,
        type: Sequelize.DATE,
        field: "deleted_at",
        defaultValue: null,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Services");
  },
};
