const authService = require("../services/auth.service");
const constants = require("../constants/constants.json");
const bcrypt = require("bcrypt");
const authMiddleware = require("../middleware/auth.middleware");
const adminService = require("../services/admin.service");
const { date } = require("joi");
const { response } = require("express");
const adminController = {
  addCategory: async (req, res) => {
    let categoryName = req.body.categoryName ? req.body.categoryName : "";
    let token = res.token;
    const role = token.role;
    const email = token.email;
    let response = {};
    try {
      if (role !== "admin") {
        res.status = 402;
        response.error = "NOT_ALLOW";
        response.message = " You do not have Permission for this Operation";
        return res.json(response);
      }
      const where = { email: email, deletedAt: null };

      const user = await adminService.getUser(where);
      const createdBy = user.id;
      const isCategory = await adminService.getCategory({
        categoryName: categoryName,
        deleted_at: null,
      });
      if (isCategory) {
        response.statusCode = 402;
        response.message = "can't create same category";
        return res.json(response);
      }
      let data = { categoryName, createdBy };

      const category = await adminService.createCategory(data);
      console.log(category, "_________________");
      if (!category) {
        res.status = constants.SOMTHING_WRONG_CODE;
        response.error = constants.SOMTHING_WENT_WRONG_ERROR;
        response.message = constants.SOMTHING_WENT_WRONG_MESSAGE;
        return res.json(response);
      }
      response.statusCode = 201;
      response.result = category;
      return res.json(response);
    } catch (error) {
      console.log(error, "error __________");
    }
  },
  categoryList: async (req, res) => {
    let token = res.token;
    const role = token.role;
    let response = {};
    try {
      if (role !== "admin") {
        res.status = 402;
        response.error = "NOT_ALLOW";
        response.message = " You do not have Permission for this Operation";
        return res.json(response);
      }
      const catList = await adminService.catLists({ deletedAt: null });

      if (!catList) {
        response.statusCode = 40;
        response.message = "there is no list found";
        return res.json(response);
      }

      response.statusCode = 201;
      response.result = catList;
      return res.json(response);
    } catch (error) {
      console.log(error, "error __________");
    }
  },
  updateCategory: async (req, res) => {
    let token = res.token;
    const role = token.role;
    const categoryName = req.body.categoryName ? req.body.categoryName : "";
    const categoryId = req.params.categoryId ? req.params.categoryId : "";
    let response = {};
    try {
      if (role !== "admin") {
        res.status = 402;
        response.error = "NOT_ALLOW";
        response.message = " You do not have Permission for this Operation";
        return res.json(response);
      }
      const isCatId = await adminService.getCategory({
        deletedAt: null,
        id: categoryId,
      });
      if (!isCatId) {
        res.status = 404;
        response.error = constants.NOT_FOUND;
        response.message = constants.CAT_NOT_FOUND_MESSAGE;
        return res.json(response);
      }
      const updateCat = await adminService.updateCategory(
        { categoryName: categoryName },
        { deletedAt: null, id: categoryId }
      );
      if (!updateCat) {
        response.statusCode = constants.SOMTHING_WRONG_CODE;
        response.error = constants.SOMTHING_WENT_WRONG_ERROR;
        response.message = constants.SOMTHING_WENT_WRONG_MESSAGE;
        return res.json(response);
      }
      response.statusCode = 201;
      response.message = "category updated successfully";
      return res.json(response);
    } catch (error) {
      console.log(error, "error controller");
    }
  },
  deleteCategory: async (req, res) => {
    let token = res.token;
    const role = token.role;
    const categoryId = req.params.categoryId ? req.params.categoryId : "";
    let response = {};
    try {
      if (role !== "admin") {
        res.status = 402;
        response.error = "NOT_ALLOW";
        response.message = " You do not have Permission for this Operation";
        return res.json(response);
      }
      const isCatId = await adminService.getCategory({
        deletedAt: null,
        id: categoryId,
      });
      if (!isCatId) {
        res.status = 404;
        response.error = constants.NOT_FOUND;
        response.message = constants.CAT_NOT_FOUND_MESSAGE;
        return res.json(response);
      }
      const updateCat = await adminService.updateCategory(
        { deletedAt: new Date() },
        { deletedAt: null, id: categoryId }
      );
      if (!updateCat) {
        response.statusCode = constants.SOMTHING_WRONG_CODE;
        response.error = constants.SOMTHING_WENT_WRONG_ERROR;
        response.message = constants.SOMTHING_WENT_WRONG_MESSAGE;
        return res.json(response);
      }
      response.statusCode = 201;
      response.message = "category deleted successfully";
      return res.json(response);
    } catch (error) {
      console.log(error);
    }
  },

  // services of category
  addServices: async (req, res) => {
    let token = res.token;
    const role = token.role;
    const serviceName = req.body.serviceName ? req.body.serviceName : "";
    const categoryID = req.body.categoryID ? req.body.categoryID : "";
    const price = req.body.price ? req.body.price : "";
    const type = req.body.type ? req.body.type : "";
    let response = {};
    try {
      if (role !== "admin") {
        res.status = 402;
        response.error = "NOT_ALLOW";
        response.message = " You do not have Permission for this Operation";
        return res.json(response);
      }
      const isCategory = await adminService.getCategory({
        id: categoryID,
        deletedAt: null,
      });

      if (!isCategory) {
        res.status = constants.NOT_FOUND_CODE;
        response.error = constants.NOT_FOUND;
        response.message = constants.CAT_NOT_FOUND_MESSAGE;
        return res.json(response);
      }
      const user = await adminService.getUser({
        email: token.email,
        deletedAt: null,
      });
      const createdBy = user.id;
      let data = { categoryID, serviceName, price, createdBy };
      if (type !== "") {
        data = { ...data, type: type };
      }

      const addService = await adminService.addService(data);
      if (!addService) {
        response.statusCode = constants.SOMTHING_WRONG_CODE;
        response.error = constants.SOMTHING_WENT_WRONG_ERROR;
        response.message = constants.SOMTHING_WENT_WRONG_MESSAGE;
        return res.json(response);
      }
      response.statusCode = 201;
      response.result = addService;
      return res.json(response);
    } catch (error) {
      console.log(error, "error controller");
    }
  },
  getAllServices: async (req, res) => {
    let token = res.token;
    const role = token.role;
    let response = {};
    try {
      if (role !== "admin") {
        res.status = 402;
        response.error = "NOT_ALLOW";
        response.message = " You do not have Permission for this Operation";
        return res.json(response);
      }
      let result = await adminService.findAll({ deletedAt: null });
      console.log(result);
      response.statusCode = 201;
      response.result = result;
      return res.json(response);
    } catch (error) {
      console.log(error);
    }
  },
  removeService: async (req, res) => {
    let token = res.token;
    const role = token.role;
    let response = {};
    const categoryId = req.params.categoryId ? req.params.categoryId : "";
    const serviceId = req.params.serviceId ? req.params.serviceId : "";
    try {
      if (role !== "admin") {
        res.status = 402;
        response.error = "NOT_ALLOW";
        response.message = " You do not have Permission for this Operation";
        return res.json(response);
      }
      const isCategory = await adminService.getCategory({
        id: categoryId,
        deletedAt: null,
      });
      if (!isCategory) {
        response.statusCode = constants.NOT_FOUND_CODE;
        response.error = constants.NOT_FOUND;
        response.message = constants.CAT_NOT_FOUND_MESSAGE;
        return res.json(response);
      }
      console.log(isCategory);
      const isService = await adminService.getService({
        deletedAt: null,
        id: serviceId,
      });
      if (!isService) {
        response.statusCode = constants.NOT_FOUND_CODE;
        response.error = constants.NOT_FOUND;
        response.message = "service id not found";
        return res.json(response);
      }
      let update = await adminService.update_service(
        { deletedAt: new Date() },
        { categoryId: categoryId, serviceId: serviceId }
      );
      if (!update) {
        response.statusCode = constants.SOMTHING_WRONG_CODE;
        response.error = constants.SOMTHING_WENT_WRONG_ERROR;
        response.message = constants.SOMTHING_WENT_WRONG_MESSAGE;
        return res.json(response);
      }
      response.statusCode = 201;
      response.message = "Deleted successfully";
      return res.json(response);
    } catch (error) {
      console.log(error);
    }
  },
  update_service: async (req, res) => {
    let token = res.token;
    const role = token.role;
    let response = {};
    const categoryId = req.params.categoryId ? req.params.categoryId : "";
    const serviceId = req.params.serviceId ? req.params.serviceId : "";
    const categoryName = req.body.categoryName ? req.body.categoryName : "";
    const serviceName = req.body.serviceName ? req.params.serviceName : "";
    const price = req.body.price ? req.body.price : "";
    const type = req.body.type;

    try {
      if (role !== "admin") {
        res.status = 402;
        response.error = "NOT_ALLOW";
        response.message = " You do not have Permission for this Operation";
        return res.json(response);
      }

      const isCategory = await adminService.getCategory({
        id: categoryId,
        deletedAt: null,
      });
      if (!isCategory) {
        response.statusCode = constants.NOT_FOUND_CODE;
        response.error = constants.NOT_FOUND;
        response.message = constants.CAT_NOT_FOUND_MESSAGE;
        return res.json(response);
      }
      let categoryData = {
        updatedAt: new Date(),
      };
      if (categoryName !== " ") {
        categoryData.categoryName = categoryName;
      }

      const isService = await adminService.getService({
        deletedAt: null,
        id: serviceId,
      });
      if (!isService) {
        response.statusCode = constants.NOT_FOUND_CODE;
        response.error = constants.NOT_FOUND;
        response.message = "service id not found";
        return res.json(response);
      }
      let serviceUpdate = {
        updatedAt: new Date(),
      };
      if (serviceName !== " ") {
        serviceUpdate.serviceName = categoryName;
      }
      if (price !== "") {
        serviceUpdate.price = price;
      }
      if (type !== "") {
        serviceUpdate.type = type;
      }
      let update = await adminService.update_service(
        categoryData,
        serviceUpdate,
        { categoryId: categoryId, serviceId: serviceId }
      );
      if (!update) {
        response.statusCode = constants.SOMTHING_WRONG_CODE;
        response.error = constants.SOMTHING_WENT_WRONG_ERROR;
        response.message = constants.SOMTHING_WENT_WRONG_MESSAGE;
        return res.json(response);
      }
      response.statusCode = 201;
      response.message = "service updated successfully";
      return res.json(response);
    } catch (error) {
      console.log(error);
    }
  },
};
module.exports = adminController;
