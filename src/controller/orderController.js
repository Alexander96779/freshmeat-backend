import OrderRepository from '../repository/orderRepository';
import Response from '../utils/response';
import DbErrorHandler from '../utils/dbErrorHandler';
import validator from '../utils/validator';

const { trimmer } = validator;

class OrderController {

    static async createOrder(req, res) {
        try {
            const { product_id, phone_number, quantity, delivery, status, total_price } = req.body;
            const order = await OrderRepository.create(product_id, phone_number, quantity, 
                                delivery, status, total_price);
            const data = {
                id: order.id,
                product_id: order.product_id,
                phone_number: order.phone_number,
                quantity: order.quantity,
                delivery: order.delivery,
                status: order.status,
                total_price: order.total_price
            };
        const response = new Response(res, 200, 'Your Order was placed!', data);
        response.sendSuccessResponse();
        } catch (error) {
            DbErrorHandler.handleSignupError(res, error);
        }
    }

    static async getAll(req, res) {
        let orders;
        try {
            orders = await OrderRepository.findAll({});
            const response = new Response(res, 200, 'Orders retrieved successfully!', orders);
            response.sendSuccessResponse();
        } catch (error) {
            DbErrorHandler.handleSignupError(res, error);
        }
    }

    static async getOne(req, res) {
        try {
            const id = parseInt(req.params.id);
            const order = await OrderRepository.findById(id);
            if (!order) {
                const response = new Response(res, 404, 'Order not found');
                response.sendErrorMessage(); 
            }
            const response = new Response(res, 200, 'Order retrieved successfully!', order);
            response.sendSuccessResponse();
        } catch (error) {
            DbErrorHandler.handleSignupError(res, error);
        }
    }

    static async editOrder(req, res) {
        try {
            const  orderData  = trimmer(req.body);
            const id = parseInt(req.params.id);
            const foundOrder = await OrderRepository.findById(id);

            if (!foundOrder) {
                const response = new Response(res, 404, 'Order not found');
                response.sendErrorMessage();
            }

            const order = await OrderRepository.update({ id }, orderData);
            const response = new Response(res, 200, 'Order updated successfully', orderData);
            response.sendSuccessResponse();

        } catch (error) {
            DbErrorHandler.handleSignupError(res, error);
        }
    }

    static async removeOrder(req, res) {
        try {
            const id = parseInt(req.params.id);
            const foundOrder = await OrderRepository.findById(id);

            if (!foundOrder) {
            const response = new Response(res, 404, 'Order not found');
            response.sendErrorMessage();
            }

            const deleteOrder = await OrderRepository.delete(id);
            const response = new Response(res, 200, 'Order deleted!', foundOrder);
            response.sendSuccessResponse();
        } catch (error) {
            DbErrorHandler.handleSignupError(res, error);
        }
    }

    static async cancelOrder(req, res) {
        try {
            const id = parseInt(req.params.id);
            const foundOrder = await OrderRepository.findById(id);

            if (!foundOrder) {
            const response = new Response(res, 404, 'Order not found');
            response.sendErrorMessage();
            }

            const order = await OrderRepository.update({ id }, { status: 'Cancelled' });
            const response = new Response(res, 200, 'Order deleted!', order);
            response.sendSuccessResponse();
        } catch (error) {
            DbErrorHandler.handleSignupError(res, error); 
        }
    }
}

export default OrderController;