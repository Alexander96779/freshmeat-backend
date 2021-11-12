import ProductRepository from '../repository/productRepository';
import Response from '../utils/response';
import DbErrorHandler from '../utils/dbErrorHandler';
import validator from '../utils/validator';
import { v2 as cloudinary } from 'cloudinary';

const { trimmer } = validator;
const {
    CLOUDINARY_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET
  } = process.env;
  cloudinary.config({
    cloud_name: CLOUDINARY_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
  });

class ProductController {

    static async createProduct(req, res) {
        try {
            const { title, description, unit_price, status } = req.body;
            let image = req.files.image;

            if (image.mimetype == "image/jpg" || image.mimetype == "image/jpeg" || image.mimetype == "image/bmp" || image.mimetype == "image/png"||image.mimetype == "image/gif") {
            if (req.files && req.files.image) {
            const file = req.files.image;
            const result = await cloudinary.uploader.upload(file.tempFilePath, {
                public_id: `${Date.now()}`, 
                resource_type: "auto"
            });
            const img_url = result.url;
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
        } else {
            const response = new Response(res, 400, 'Please add an image!');
            response.sendErrorMessage();
        }
    } else {
        const response = new Response(res, 400, 'Image format is not allowed, use ".gif", ".png", ".jpg" or ".jpeg');
        response.sendErrorMessage()
    }
        } catch (error) {
            DbErrorHandler.handleSignupError(res, error);
            console.log(error);
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
            const foundProduct = await ProductRepository.findById(id);
            console.log(foundProduct)
            if (!foundProduct) {
                const response = new Response(res, 404, 'Product not found');
                response.sendErrorMessage();
            }

            let image = req.files.image;

            if (image.mimetype == "image/jpg" || image.mimetype == "image/jpeg" || image.mimetype == "image/bmp" || image.mimetype == "image/png"||image.mimetype == "image/gif") {
            if (req.files && req.files.image) {
                const file = req.files.image;
                const result = await cloudinary.uploader.upload(file.tempFilePath, {
                    public_id: `${Date.now()}`, 
                    resource_type: "auto"
                });
                productData.img_url = result.url;

                await ProductRepository.update({ id }, productData);
                const response = new Response(res, 200, 'Product updated successfully', productData);
                response.sendSuccessResponse();
        } else {
            const response = new Response(res, 400, 'Please add an image!');
            response.sendErrorMessage();
        } 
        }   else {
            const response = new Response(res, 400, 'Image format is not allowed, use ".gif", ".png", or ".jpeg');
            response.sendErrorMessage();
        }

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