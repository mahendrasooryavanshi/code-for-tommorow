"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("permissions", [
      {
        id: 1,
        title: "user.read",
        status: "active",
      },
      {
        id: 2,
        title: "user.unfollow",
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
        title: "address.write",
        description: "address_write",
        status: "active",
      },
      {
        id: 8,
        title: "post.delete",
        description: "feed_reel_delete",
        status: "active",
      },
      {
        id: 9,
        title: "post.write",
        description: "feed_reel_write",
        status: "active",
      },
      {
        id: 10,
        title: "post.read",
        description: "feed_reel_read",
        status: "active",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("permissions", null, {});
  },
};
