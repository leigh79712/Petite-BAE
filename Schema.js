const baseJoi = require("joi");
const sanitizeHtml = require("sanitize-html");
const extension = (joi) => ({
  type: "string",
  base: joi.string(),
  messages: {
    "string.escapeHTML": "{{#label}} must not include HTML!",
  },
  rules: {
    escapeHTML: {
      validate(value, helpers) {
        const clean = sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: {},
        });
        if (clean !== value)
          return helpers.error("string.escapeHTML", { value });
        return clean;
      },
    },
  },
});
const Joi = baseJoi.extend(extension);

module.exports.productSchema = Joi.object({
  products: Joi.string().required().escapeHTML(),
  price: Joi.number().required().min(0),
  description: Joi.string().required().escapeHTML(),
  size: Joi.required(),
  color: Joi.required(),
  category: Joi.required(),
  deleteImage: Joi.array(),
});
