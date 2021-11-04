import model from '../models';

const { Order } = model;

class OrderRepository {

    static async create( product_id, phone_number, quantity, delivery, status, total_price ) {
        try {
            const record = await Order.create({ product_id, phone_number, quantity, delivery, status, total_price });

            return record;
        } catch (error) {
            throw new Error(error);
        }
    }

    static async findOne(options) {
        try {
            const record = await Order.findOne({ where: { ...options }});

            return record;
        } catch (error) {
            throw new Error(error);
        }
    }

    static async findById(id) {
        try {
            const record = await Order.findByPk(id);

            return record;
        } catch (error) {
            throw new Error(error);
        }
    }

    static async findAll() {
        try {
            const records = await Order.findAll({  order: [['createdAt', 'DESC']] });
            return records;
        } catch (error) {
            throw new Error(error);
        }
    }

    static async update(field, changes) {
        try {
            return await Order.update(changes, {
                returning: true,
                where: field
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    static async delete(id) {
        try {
           return await Order.destroy({
               where: [{ id }]
           });
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default OrderRepository;