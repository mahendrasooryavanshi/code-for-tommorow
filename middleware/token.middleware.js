const auth = require("./auth.middleware");
const constants = require("../constants/constants.json");
const tokenMiddleware = async (req, res, next) => {
  let token = req.headers["authorization"] ? req.headers["authorization"] : "";
  let response = {};
  try {
    if (token === "") {
      response.status = 404;
      response.message = "Token is not found";
      return res.json(response);
    }
    if (token && token.split(" ")[0] === "Bearer") {
      token = token.split(" ")[1];

      let tokenData = await auth.authToken(token);
      if (tokenData.status === false) {
        res.statusCode = 403;
        response.error = "TOKEN_INVALID_ERROR";
        response.errorMessage = "TOKEN_EXPIRED";
        return res.json(response);
      }
      res.token = tokenData.verify;
      next();
    }
  } catch (error) {
    return res.status(400).send("Invalid Token.");
  }
};
module.exports = tokenMiddleware;
