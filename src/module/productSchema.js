import Joi from '@hapi/joi';

class ProductSchema {

  static bodySchema(data) {
    const schema = Joi.object().keys({
      title: Joi.string().min(3).max(50)
        .messages({
          'string.base': 'Title must be a string',
          'string.min': 'Title length must be at least {{#limit}} characters long',
          'string.max': 'Title length must be less than or equal to {{#limit}} characters long',
        }),
      description: Joi.string().min(5).max(255)
        .messages({
          'string.base': 'Description must be a string',
          'string.min': 'Description length must be at least {{#limit}} characters long',
          'string.max': 'Description length must be less than or equal to {{#limit}} characters long',
        }),
      img_url: Joi.string().min(1).max(255)
        .messages({
          'string.base': 'Image Url must be a string',
          'string.min': 'Image Url length must be at least {{#limit}} characters long',
          'string.max': 'Image Url length must be less than or equal to {{#limit}} characters long',
        }),
        unit_price: Joi.number()
                    .positive()
        .messages({
          'number.base': 'Unit Price must be a number',
          'number.positive': 'Unit Price must be a positive number'
        }),
      status: Joi.string().regex(/^(In Stock|Sold Out)$/)
        .messages({
          'string.base': 'status must be a string',
          'string.pattern.base': 'status must be In Stock|Sold Out',
        })
    });
    return schema.validate(data);
  }

  static incidentParam(data) {
    const schema = Joi.object({
      id: Joi.number()
        .integer()
        .positive()
        .min(1)
        .messages({
          'number.base': 'Parameter id must be a number',
          'string.min': 'Parameter id  length must be at least {{#limit}} characters long',
          'number.integer': 'Parameter id  must be an integer',
          'number.positive': 'Parameter id  must be a positive number',
          'number.unsafe': 'Parameter id  must be a safe number',
          'any.required': 'Parameter id  is required',
        }),
    });

    return schema.validate(data);
  }

}

export default ProductSchema;