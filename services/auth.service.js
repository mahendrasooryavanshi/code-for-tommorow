const connection = require("../models");
const { sequelize, Sequelize } = connection;
const Model = sequelize.models;
const { User } = Model;

const authService = {
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
  create: async (data) => {
    try {
      return await User.create(data);
    } catch (error) {
      console.log(error, "server error");
      return false;
    }
  },
};
module.exports = authService;
