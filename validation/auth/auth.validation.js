const Joi = require("joi");
const signupValidation = async (req, res, next) => {
  try {
    let response = {};
    const signUp = async (body) => {
      const joiSchema = await Joi.object({
        name: Joi.string().min(2).max(30).required().messages({
          "any.required": "name is required.",
          "string.empty": "name cannot be empty.",
        }),

        email: Joi.string().email().required().messages({
          "any.required": "Email is required.",
          "string.empty": "Email cannot be empty.",
          "string.email": "Invalid email format.",
        }),
        password: Joi.string().min(8).max(30).required().messages({
          "any.required": "password is required.",
          "string.empty": "password cannot be empty.",
        }),
      });
      return joiSchema.validate(body, { errors: { wrap: { label: "" } } });
    };
    const validation = await signUp(req.body);
    if (validation.error) {
      let { details } = validation.error;
      const message = details.map((i) => i.message).join(",");
      response.message = message;
      response.statusCode = 422;
      response.error = "ValidationError";
      return res.json(response);
    } else {
      next();
    }
  } catch (error) {
    console.log("validation error", error);
  }
};
const loginValidation = async (req, res, next) => {
  try {
    const validateLogin = async (body) => {
      const joiSchema = await Joi.object({
        email: Joi.string().email().required().messages({
          "any.required": "Email is required.",
          "string.empty": "Email cannot be empty.",
          "string.email": "Invalid email format.",
        }),
        password: Joi.string().required().messages({
          "any.required": "password is required.",
          "string.empty": "password cannot be empty.",
        }),
      });
      return joiSchema.validate(body, {
        errors: { wrap: { label: "" } },
      });
    };
    const validation = await validateLogin(req.body);
    let response = {};
    if (validation.error) {
      let { details } = validation.error;
      const message = details.map((i) => i.message).join(", ");
      response.message = message;
      response.statusCode = 422;
      response.error = "ValidationError";
      return res.json(response);
    } else {
      next();
    }
  } catch (error) {
    console.log("validation error", error);
  }
};
module.exports = { signupValidation, loginValidation };
