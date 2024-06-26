"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Role_Permissions", [
      {
        role_id: 1,
        permission_id: 1,
      },
      {
        role_id: 1,
        permission_id: 2,
      },
      {
        role_id: 1,
        permission_id: 3,
      },
      {
        role_id: 1,
        permission_id: 4,
      },
      {
        role_id: 1,
        permission_id: 5,
      },
      {
        role_id: 1,
        permission_id: 6,
      },
      {
        role_id: 1,
        permission_id: 7,
      },
      {
        role_id: 1,
        permission_id: 8,
      },
      {
        role_id: 2,
        permission_id: 1,
      },
      {
        role_id: 2,
        permission_id: 3,
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Role_Permissions", null, {});
  },
};
