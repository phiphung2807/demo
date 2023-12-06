import Joi from "joi";

export const ProductPassSchema = Joi.object({
  product_name: Joi.string().required(),
  product_price: Joi.number().required(),
  product_images: Joi.string().required(),
  product_description: Joi.string(),
  categoryId: Joi.string().required()
});

export const ProductPassUpdateSchema = Joi.object({
  _id: Joi.string(),
  product_name: Joi.string().required(),
  product_price: Joi.number().required(),
  product_images: Joi.string().required(),
  product_description: Joi.string(),
  categoryId: Joi.string().required(),
  createdAt: Joi.date(),
  updatedAt: Joi.date()
});
