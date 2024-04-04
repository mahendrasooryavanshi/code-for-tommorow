"use strict";

const { now } = require("sequelize/types/utils");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("roles", [
      {
        title: "admin",
        deletedAt: null,
        createdAt: new Date(),
      },
      {
        title: "user",
        status: "active",
        createdAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Roles", null, {});
  },
};
