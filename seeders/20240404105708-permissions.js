"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Permissions", [
      {
        id: 1,
        title: "user.read",
        status: "active",
      },
      {
        id: 2,
        title: "user.delete",
        status: "active",
      },
      {
        id: 3,
        title: "category.read",
        status: "active",
      },
      {
        id: 4,
        title: "category.write",
        status: "active",
      },
      {
        id: 5,
        title: "category.delete",
        status: "active",
      },
      {
        id: 6,
        title: "category.update",
        status: "active",
      },
      {
        id: 7,
        title: "service.update",
        status: "active",
      },
      {
        id: 8,
        title: "service.delete",
        status: "active",
      },
      {
        id: 9,
        title: "service.write",
        status: "active",
      },
      {
        id: 10,
        title: "service.read",
        status: "active",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Permissions", null, {});
  },
};
