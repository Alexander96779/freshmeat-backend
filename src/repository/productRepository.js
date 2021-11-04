import model from '../models';

const { Product } = model;

class ProductRepository {

    static async create(title, description, img_url, unit_price, status ) {
        try {
            const record = await Product.create({ title, description, img_url, unit_price, status});

            return record;
        } catch (error) {
            throw new Error(error);
        }
    }

    static async findOne(options) {
        try {
            const record = await Product.findOne({ where: { ...options }});

            return record;
        } catch (error) {
            throw new Error(error);
        }
    }

    static async findById(id) {
        try {
            const record = await Product.findByPk(id);

            return record;
        } catch (error) {
            throw new Error(error);
        }
    }

    static async findAll() {
        try {
            const records = await Product.findAll({  order: [['createdAt', 'DESC']] });
            return records;
        } catch (error) {
            throw new Error(error);
        }
    }

    static async update(field, changes) {
        try {
            return await Product.update(changes, {
                returning: true,
                where: field
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    static async delete(id) {
        try {
           return await Product.destroy({
               where: [{ id }]
           });
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default ProductRepository;