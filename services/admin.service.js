const { date } = require("joi");
const connection = require("../models");

const { sequelize, Sequelize } = connection;
const Model = sequelize.models;
const { Category, User, Service } = Model;

const adminService = {
  getUser: async (data) => {
    try {
      return await User.findOne({
        where: data,
      });
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  createCategory: async (data) => {
    try {
      return await Category.create(data);
    } catch (error) {
      console.log(error, "server error");
      return false;
    }
  },
  getCategory: async (data) => {
    try {
      return await Category.findOne({ where: data });
    } catch (error) {
      console.log(error, "Category service error");
      return false;
    }
  },
  catLists: async (data) => {
    try {
      return Category.findAll({
        where: data,
        attributes: {
          exclude: ["updatedAt", "deletedAt"],
        },
        order: [["id", "DESC"]],
      });
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  updateCategory: async (data, where) => {
    try {
      return await Category.update(data, { where: where });
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  addService: async (data) => {
    console.log(data);
    try {
      return await Service.create(data);
    } catch (error) {
      console.log(error);
    }
  },
  findAll: async (data) => {
    try {
      let result = await Service.findAll({
        where: data,
        include: [
          {
            model: Category,
            as: "CategoryDetails",
          },
        ],
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  },
  getService: async (data) => {
    try {
      return await Service.findOne({ where: data });
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  update_service: async (data, where) => {
    try {
      return await Promise.all([
        await Category.update(data, {
          where: {
            id: where.categoryId,
          },
        }),
        await Service.update(data, {
          where: {
            id: where.serviceId,
          },
        }),
      ]);
    } catch (error) {
      return false;
      console.log(error);
    }
  },
  modify_service: async (data1, data2, where) => {
    try {
      return await Promise.all([
        await Category.update(data1, {
          where: {
            id: where.categoryId,
          },
        }),
        await Service.update(data2, {
          where: {
            id: where.serviceId,
          },
        }),
      ]);
    } catch (error) {
      return false;
      console.log(error);
    }
  },
};
module.exports = adminService;
