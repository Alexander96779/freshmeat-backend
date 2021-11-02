import jwt from 'jsonwebtoken';
import 'dotenv';
import UserRepository from '../repository/userRepository';

class AuthUtils {
    static jwtVerify(token) {
        const decodedToken = jwt.verify(token, process.env.KEY);
        return decodedToken;
    }

    static async emailExists({ email }) {
        const isEmailExists = await UserRepository.findByEmail(email);
        return !!isEmailExists;
      }
}

export default AuthUtils;