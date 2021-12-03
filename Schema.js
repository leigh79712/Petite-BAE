const Joi = require("joi");

module.exports.productSchema = Joi.object({
  products: Joi.string().required(),
  price: Joi.number().required().min(0),
  description: Joi.string().required(),
  size: Joi.array().required(),
  color: Joi.array().required(),
  category: Joi.array().required(),
});
