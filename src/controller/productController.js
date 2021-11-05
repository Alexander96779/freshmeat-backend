import ProductRepository from '../repository/productRepository';
import Response from '../utils/response';
import DbErrorHandler from '../utils/dbErrorHandler';
import validator from '../utils/validator';

const { trimmer } = validator;

class ProductController {

    static async createProduct(req, res) {
        try {
            const { title, description, unit_price, status } = req.body;
            if (!req.files) {
                const response = new Response(res, 400, 'Please upload file');
                response.sendErrorMessage();
            }
            let file = req.files.image;
            let img_url=file.name;
    
            if(file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/bmp" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){                    
            file.mv('src/uploads/images_upload/'+file.name, async function(err) {
                if (err) {
                    const response = new Response(res, 500, err);
                    response.sendErrorMessage();
                }
            const product = await ProductRepository.create(title, description, img_url, unit_price, status);
            const data = {
                id: product.id,
                title: product.title,
                description: product.description,
                img_url: product.img_url,
                unit_price: product.unit_price,
                status: product.status
            };
        const response = new Response(res, 200, 'New Product added!', data);
        response.sendSuccessResponse();
                  })
        } else {
            const response = new Response(res, 400, 'Image format is not allowed, use ".gif", ".png", or ".jpeg');
            response.sendErrorMessage();
        }
        } catch (error) {
            DbErrorHandler.handleSignupError(res, error);
        }
    }

    static async getAll(req, res) {
        let products;
        try {
            products = await ProductRepository.findAll({});
            const response = new Response(res, 200, 'Products retrieved successfully!', products);
            response.sendSuccessResponse();
        } catch (error) {
            DbErrorHandler.handleSignupError(res, error);
        }
    }

    static async getOne(req, res) {
        try {
            const id = parseInt(req.params.id);
            const product = await ProductRepository.findById(id);
            if (!product) {
                const response = new Response(res, 404, 'Product not found');
                response.sendErrorMessage(); 
            }
            const response = new Response(res, 200, 'Product retrieved successfully!', product);
            response.sendSuccessResponse();
        } catch (error) {
            DbErrorHandler.handleSignupError(res, error);
        }
    }

    static async editProduct(req, res) {
        try {
            const  productData  = trimmer(req.body);
            const id = parseInt(req.params.id);
            const foundProduct = await ProductRepository.findOne(id);

            if (!foundProduct) {
                const response = new Response(res, 404, 'Product not found');
                response.sendErrorMessage();
            }

            const product = await ProductRepository.update({ id }, productData);
            const response = new Response(res, 200, 'Product updated successfully', productData);
            response.sendSuccessResponse();

        } catch (error) {
            DbErrorHandler.handleSignupError(res, error);
        }
    }

    static async removeProduct(req, res) {
        try {
            const id = parseInt(req.params.id);
            const foundProduct = await ProductRepository.findById(id);

            if (!foundProduct) {
            const response = new Response(res, 404, 'Product not found');
            response.sendErrorMessage();
            }

            const deletedProduct = await ProductRepository.delete(id);
            const response = new Response(res, 200, 'Product deleted!', foundProduct);
            response.sendSuccessResponse();
        } catch (error) {
            DbErrorHandler.handleSignupError(res, error);
        }
    }
}

export default ProductController;