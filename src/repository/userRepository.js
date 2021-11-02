import model from '../models';
import hash from '../utils/hash';

const { User } = model;

const { hashPassword } = hash;

class UserRepository {

    static async create(firstName, lastName, email, password) {
        try {
            const record = await User.create({
                firstName, lastName, email, password: await hashPassword(password)
            });
            return record;
        } catch (error) {
            throw new Error(error);
        }
    }
    static async findByEmail(email) {
        try {
            const record = await User.findOne({ where: { email }});

            return record;
        } catch (error) {
            throw new Error(error);            
        }
    }

    static async findById(id) {
        try {
            const record = await User.findByPk(id);

            return record;
        } catch (error) {
            throw new Error(error);
        }
    }

    static async findAll() {
        try {
            const records = await User.findAll({  order: [['createdAt', 'DESC']] });
            return records;
        } catch (error) {
            throw new Error(error);
        }
    }

    static async update(field, changes) {
        try {
            return await User.update(changes, {
                returning: true,
                where: field
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    static async delete(id) {
        try {
           return await User.destroy({
               where: [{ id }]
           });
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default UserRepository;