import 'dotenv';
import Response from '../utils/response';
import ProductSchema from '../module/productSchema';
import validator from '../utils/validator';

const { trimmer } = validator;

class ProductMiddleware {

  static async param(req, res, next) {
    const { error } = ProductSchema.incidentParam(req.params);
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
    const productData = trimmer(req.body);
    const { error } = ProductSchema.bodySchema(productData);

    try {
      if (error) {
        const response = new Response(res, 422, error.message);
        return response.sendErrorMessage();
      }
      req.productData = productData;
      return next();
    } catch (err) {
      const response = new Response(res, 500, err);
      return response.sendErrorMessage();
    }
  }
}

export default ProductMiddleware;