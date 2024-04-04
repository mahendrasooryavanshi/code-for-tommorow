const express = require("express");
const router = express.Router();
const authController = require("../controller/auth.controller");
const {
  signupValidation,
  loginValidation,
} = require("../validation/auth/auth.validation");

router.post("/signup", [signupValidation], authController.index);
router.post("/login", [loginValidation], authController.login);
module.exports = router;
