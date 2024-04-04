const Joi = require("joi");
const categoryValidation = async (req, res, next) => {
  try {
    const CategoryValidation = async (body) => {
      const joiSchema = await Joi.object({
        categoryName: Joi.string().required().messages({
          "any.required": "categoryName  is required.",
          "string.empty": "categoryName cannot be empty.",
        }),
      });
      return joiSchema.validate(body, {
        errors: { wrap: { label: "" } },
      });
    };
    const validation = await CategoryValidation(req.body);
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
const catServiceValidation = async (req, res, next) => {
  try {
    const CategoryValidation = async (body) => {
      const joiSchema = await Joi.object({
        categoryID: Joi.number().required().messages({
          "number.required": "categoryName  is required.",
          "number.empty": "categoryName cannot be empty.",
        }),
        serviceName: Joi.string().required().messages({
          "any.required": "categoryName  is required.",
          "string.empty": "categoryName cannot be empty.",
        }),
        price: Joi.number().required().messages({
          "number.required": "price  is required.",
          "number.empty": "categoryName cannot be empty.",
        }),
      });
      return joiSchema.validate(body, {
        errors: { wrap: { label: " " } },
      });
    };

    const validation = await CategoryValidation(req.body);
    let response = {};
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

module.exports = { categoryValidation, catServiceValidation };
