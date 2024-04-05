"use strict";
/** @type {import('sequelize-cli').Migration} */
(
  module.exports = {
    async up(queryInterface, Sequelize) {
      await queryInterface.bulkInsert("Users", [
        {
          name: "admin",
          email: "admin@codesfortomorrow.com",
          status: "active",
          role: "admin",
          password:
            "$2b$10$AOkLiC0SIR2/WnTou6lZ2u4VGZZafHZ601NzQwbxYtMm2D6VGSk3W",
        },
      ]);
    },

    async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete("Users", null, {});
    },
  }
);
