import model from '../models';

const { Product } = model;

class ProductRepository {
    constructor() {
        this.db = Product;
    }

    async findOne(options) {
        try {
            const record = await this.db.findOne({ where: { ...options }});

            return record;
        } catch (error) {
            throw new Error(error);
        }
    }

    async findById(id) {
        try {
            const record = await this.db.findByPk(id);

            return record;
        } catch (error) {
            throw new Error(error);
        }
    }

    async findAll() {
        try {
            const records = await this.db.findAll({  order: [['createdAt', 'DESC']] });
            return records;
        } catch (error) {
            throw new Error(error);
        }
    }

    async update(field, changes) {
        try {
            return await this.db.update(changes, {
                returning: true,
                where: field
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    async delete(id) {
        try {
           return await this.db.destroy({
               where: [{ id }]
           });
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default ProductRepository;