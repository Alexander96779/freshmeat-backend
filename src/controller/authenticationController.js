import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import hash from '../utils/hash';
import Response from '../utils/response';
import DbErrorHandler from '../utils/dbErrorHandler';
import UserRepository from '../repository/userRepository';
import models from '../models';

dotenv.config();

const { User } = models;
const { decryptPassword } = hash;

class AuthenticationController {
    static async register(req, res) {
        try {
    const { firstName, lastName, email, password } = req.body; 
    const user = await UserRepository.create( firstName, lastName, email, password );
    const tokenData = {
        id: user.id,
        email: email
    };
    const token =  jwt.sign(tokenData, process.env.KEY);
    const data = {
        user: { email: user.email }, 
        token
        }
    const response = new Response(res, 201, 'Account created successfully!', data);
    response.sendSuccessResponse();
        } catch (error) {
            DbErrorHandler.handleSignupError(res, error);
        }
    }

    static  async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await UserRepository.findByEmail(email);

            if (!user) {
                const response = new  Response(res, 404, 'Wrong email or password');
                response.sendErrorMessage();
            }
            const decryptedPassword = await decryptPassword(password, user.password);
            if (!decryptedPassword) {
                const response = new  Response(res, 403, 'Invalid email or password');
                response.sendErrorMessage();
            }
            const tokenData = {
                id: user.id,
                email: user.email
            };
            const token =  jwt.sign(tokenData, process.env.KEY);
            const data = {
                user: { email: user.email }, 
                token
                }
    const response = new Response(res, 200, 'Login is successful!', data);
    response.sendSuccessResponse();
        } catch (error) {
           DbErrorHandler.handleSignupError(res, error); 
        }
    }
}

export default AuthenticationController;