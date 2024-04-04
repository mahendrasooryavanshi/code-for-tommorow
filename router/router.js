const express = require("express");
const router = express.Router();
const authController = require("../controller/auth.controller");
const adminController = require("../controller/admin.controller");
const {
  categoryValidation,
  catServiceValidation,
} = require("../validation/category/category.validation");
const {
  signupValidation,
  loginValidation,
} = require("../validation/auth/auth.validation");
const tokenMiddleware = require("../middleware/token.middleware");

router.post("/signup", [signupValidation], authController.index);
router.post("/login", [loginValidation], authController.login);

// - Create an API to add categories as per the Category Schema.
router.post(
  "/category",
  [tokenMiddleware],
  [categoryValidation],
  adminController.addCategory
);

// - Create an API to get a list of all categories.
router.get("/categories", [tokenMiddleware], adminController.categoryList);

// - Create an API to update a single category as per the schema.
router.put(
  "/category/:categoryId",
  [tokenMiddleware],
  [categoryValidation],
  adminController.updateCategory
);
// - Create an API to remove empty(With no services) category only.
router.delete(
  "/category/:categoryId",
  [tokenMiddleware],
  adminController.deleteCategory
);

// - Create an API to add services as per the Service Schema.
router.post(
  "/category/service",
  [tokenMiddleware],
  [catServiceValidation],
  adminController.addServices
);

// - Create an API to get a list of all services inside any category.
router.get(
  "/category/services",
  [tokenMiddleware],
  adminController.getAllServices
);
// - Create an API to remove service from category.

router.delete(
  "/category/:categoryId/service/:serviceId",
  [tokenMiddleware],
  adminController.removeService
);

// - Create an API to update service as per the service schema.
router.put(
  "/category/:categoryId/service/:serviceId",
  [tokenMiddleware],
  adminController.update_service
);

module.exports = router;
