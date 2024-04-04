const secretKey = process.env.SECKERT_KEY;
const JWT = require("jsonwebtoken");
const auth = {
  accessToken: async (payload) => {
    try {
      let accessToken = await JWT.sign(payload, secretKey, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
      });
      return {
        token: accessToken,
        status: true,
      };
      // return accessToken;
    } catch (error) {
      console.log("access token middleware failed-----", error);
      return {
        token: "",
        status: false,
      };
    }
  },
  refreshToken: async (payload) => {
    try {
      let refreshToken = await JWT.sign(payload, secretKey, {
        expiresIn: "3days",
      });
      return {
        status: true,
        token: refreshToken,
      };
    } catch (error) {
      console.log("refresh-token failed.......", error);
      return {
        status: false,
        token: "",
      };
    }
  },
};
module.exports = auth;
