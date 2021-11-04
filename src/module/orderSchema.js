import Joi from '@hapi/joi';

class OrderSchema {

  static bodySchema(data) {
    const schema = Joi.object().keys({
        product_id: Joi.number()
        .positive()
        .messages({
            'number.base': 'Product Id must be a number',
            'number.positive': 'Product Id must be a positive number'
            }),
      phone_number: Joi.string().min(10).max(10)
        .messages({
          'string.base': 'Phone number must be a string',
          'string.min': 'Phone number length must be at least {{#limit}} characters long',
          'string.max': 'Phone number length must be less than or equal to {{#limit}} characters long',
        }),
        quantity: Joi.number()
                    .positive()
        .messages({
          'number.base': 'Quantity must be a number',
          'number.positive': 'Quantity must be a positive number'
        }),
        total_price: Joi.number()
                    .positive()
        .messages({
          'number.base': 'Total Price must be a number',
          'number.positive': 'Total Price must be a positive number'
        }),
      status: Joi.string().regex(/^(Cancelled|Ordered)$/)
        .messages({
          'string.base': 'status must be a string',
          'string.pattern.base': 'status must be Cancelled or Ordered',
        }),
        delivery: Joi.boolean()
        .messages({
            'boolean.base': 'Delivery must be true of false'
        })
    });
    return schema.validate(data);
  }

  static orderParam(data) {
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

export default OrderSchema;