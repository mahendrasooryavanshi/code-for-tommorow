const secretKey = process.env.SECKERT_KEY;
const JWT = require("jsonwebtoken");
const auth = {
  accessToken: async (payload) => {
    try {
      let accessToken = await JWT.sign(payload, secretKey, {
        expiresIn: "3h",
      });
      return {
        token: accessToken,
        status: true,
      };
    } catch (error) {
      console.log("access token middleware failed-----", error);
      return {
        token: "",
        status: false,
        role: payload.role,
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
        role: payload.role,
      };
    } catch (error) {
      console.log("refresh-token failed.......", error);
      return {
        status: false,
        token: "",
      };
    }
  },
  authToken: async (token) => {
    try {
      return await JWT.verify(token, secretKey, (error, decoded) => {
        if (error) {
          return {
            status: false,
            error: error,
            verify: {},
          };
        }
        return {
          status: true,
          verify: decoded,
        };
      });
    } catch (error) {
      return {
        status: false,
        error: error,
        verify: {},
      };
    }
  },
};
module.exports = auth;
