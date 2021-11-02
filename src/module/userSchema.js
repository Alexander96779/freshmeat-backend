import Joi from 'joi';

class UserSchema {
    static signup(data) {
        const schema = Joi.object({
            email: Joi.string()
              .email({ minDomainSegments: 2 })
              .required()
              .messages({
                'string.base': 'email must be a string',
                'string.email': 'email must be a valid email',
                'any.required': 'email is required',
                'string.empty': 'email is not allowed to be empty'
              }),

              password: Joi.string()
              .min(8)
              .max(64)
              .required()
              .pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
              .messages({
                'string.base': 'password must be a string',
                'string.min': 'password length must be at least {{#limit}} characters long',
                'string.max': 'password length must be less than or equal to {{#limit}} characters long',
                'any.required': 'password is required',
                'string.pattern.base': 'password must include at least a number and a capital letter',
                'string.empty': 'password is not allowed to be empty'
              }),
        });
        return schema.validate(data);
}
}

export default UserSchema;