import joi from '@hapi/joi';
import UserRepository from '../repository/userRepository';
import Response from '../utils/response';

class AuthMiddleware {
    static async signup(req, res, next) {
        const Schema = joi.object({
          email: joi.string()
          .email()
          .required()
          .messages({
            'string.base': 'email must be a string',
            'string.email': 'email must be a valid email',
            'any.required': 'email is required',
            'string.empty': 'email is not allowed to be empty'
          }),
          password: joi.string()
          .min(8)
          .max(64)
          .required()
          .pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
          .messages({
            'string.base': 'password must be a string',
            'string.min': 'password length must be at least {{#limit}} characters long',
            'string.max': 'password length must be less than or equal to {{#limit}} characters long',
            'any.required': 'password is required',
            'string.pattern.base': 'password must include a capital letter, special character and number',
            'string.empty': 'password is not allowed to be empty'
          }),
        });
    
        const { error } = Schema.validate(req.body);
        const emailExists = await UserRepository.findByEmail(req.body.email);

        if (emailExists) {
            const response = new Response(res, 409, 'Email already used');
            return response.sendErrorMessage();
        }
        if (error) {
          return res.status(400).json({
            status: 400,
            error: error.details[0].message.replace(/"/g, ''),
          });
        }
        next();
      }

      static login(req, res, next) {
        const Schema = joi.object({
          email: joi.string()
          .email()
          .required()
          .pattern( /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
          .messages({
            'string.base': 'email must be a string',
            'string.email': 'email must be a valid email',
            'any.required': 'email is required',
            'string.empty': 'email is not allowed to be empty'
          }),
          password: joi.string()
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
    
        const { error } = Schema.validate(req.body);

        if (error) {
          return res.status(400).json({
            status: 400,
            error: error.details[0].message.replace(/"/g, ''),
          });
        }
        next();
      }
}

export default AuthMiddleware