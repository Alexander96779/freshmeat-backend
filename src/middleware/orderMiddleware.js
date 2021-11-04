import Response from '../utils/response';
import OrderSchema from '../module/orderSchema';
import validator from '../utils/validator';

const { trimmer } = validator;

class OrderMiddleware {

  static async param(req, res, next) {
    const { error } = OrderSchema.orderParam(req.params);
    try {
      if (error) {
        const response = new Response(res, 422, error.message);
        return response.sendErrorMessage();
      }

      return next();
    } catch (err) {
      const response = new Response(res, 500, err || 'Internal server error');
      return response.sendErrorMessage();
    }
  }


  static async validate(req, res, next) {
    const orderData = trimmer(req.body);
    const { error } = OrderSchema.bodySchema(orderData);

    try {
      if (error) {
        const response = new Response(res, 422, error.message);
        return response.sendErrorMessage();
      }
      req.orderData = orderData;
      return next();
    } catch (err) {
      const response = new Response(res, 500, err);
      return response.sendErrorMessage();
    }
  }
}

export default OrderMiddleware;