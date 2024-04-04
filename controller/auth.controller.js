const authService = require("../services/auth.service");
const constants = require("../constants/constants.json");
const bcrypt = require("bcrypt");
const authMiddleware = require("../middleware/auth.middleware");
const authController = {
  index: async (req, res) => {
    const name = req.body.name ? req.body.name : "";
    const email = req.body.email ? req.body.email : "";
    let password = req.body.password ? req.body.password : "";
    let response = {};
    try {
      const where = {
        email: email,
        deleted_at: null,
      };
      const isUser = await authService.getUser(where);
      if (isUser) {
        response.statusCode = 402;
        response.error = constants.DUPLICATE_ENTRY;
        response.message = constants.DUPLICATE_ENTRY_EMAIL_MSG;
        return res.json(response);
      }
      const hashPassword = await bcrypt.hashSync(
        password,
        constants.SALT_ROUND
      );
      let data = { name, email, password: hashPassword };
      const result = await authService.create(data);
      res.status = 201;
      response.result = result;
      return res.json(response);
    } catch (error) {
      console.log(error, "__________Error in controller");
    }
  },
  login: async (req, res) => {
    let response = {};
    try {
      const email = req.body.email ? req.body.email.trim().toLowerCase() : "";
      const password = req.body.password ? req.body.password : "";
      const where = { email: email, deleted_at: null };
      const isUser = await authService.getUser(where);
      if (!isUser) {
        res.status = constants.NOT_FOUND_CODE;
        response.error = constants.NOT_FOUND;
        response.message = constants.NOT_FOUND_MESSAGE;
        return res.json(response);
      }
      const verifyPassword = await bcrypt.compare(password, isUser.password);
      if (!verifyPassword) {
        response.error = constants.NotValidCredentials;
        res.status = constants.NotValidCredentials_Code;
        response.statusCode = constants.NotValidCredentials_Code;
        response.message = constants.INVALID_PASSWORD;
        return res.json(response);
      }
      // token expire in 3 hours
      const expirationTime = Math.floor(Date.now() / 1000) + 180 * 60;
      let payload = {
        email: isUser.email,
        status: isUser.status,
        role: isUser.role,
        type: "Bearer",
        expirationTime: expirationTime,
      };
      const accessToken = await authMiddleware.accessToken(payload);
      const refreshToken = await authMiddleware.refreshToken({
        ...payload,
        type: "Refresh",
      });
      if (!accessToken.token || !refreshToken.status) {
        response.error = constants.SOMTHING_WENT_WRONG_MESSAGE;
        response.errorMessage = constants.SOMTHING_WENT_WRONG_MESSAGE;
        res.statusCode = constants.SOMTHING_WRONG_CODE;
        return res.json(response);
      }
      res.status = 201;
      res
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          sameSite: "strict",
        })
        .header("Authorization", accessToken, {
          httpOnly: true,
          sameSite: "strict",
        });
      response.status = "success";
      response.type = "Bearer";
      response.expiredAt = expirationTime;
      response.token = {
        accessToken: accessToken.token,
        refreshToken: refreshToken.token,
      };
      return res.json(response);
    } catch (error) {
      console.log(error, "__________login error controller");
    }
  },
};
module.exports = authController;
