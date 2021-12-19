const Joi = require("joi");

module.exports.productSchema = Joi.object({
  products: Joi.string().required(),
  price: Joi.number().required().min(0),
  description: Joi.string().required(),
  size: Joi.required(),
  color: Joi.required(),
  category: Joi.required(),
  deleteImage: Joi.array(),
});
