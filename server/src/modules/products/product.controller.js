const ApiResponse = require('../../utils/ApiResponse');
const product = require('./product.model');
const ApiError = require('../../utils/ApiError');


module.exports.fetchProduct = async (req, res) => {
    const products = await product.find().select('-variants');
    res.json(new ApiResponse(200, 'Products fetched successfully', products));
}

module.exports.fetchProductById = async (req, res) => {
    const { id } = req.params;
    const products = await product.findById(id);

    if (!products) {
        throw new ApiError(404, 'Product not found');
    }

    res.json(new ApiResponse(200, 'Products fetched successfully', products));
}

module.exports.createProduct = async (req, res) => {
    const { title, description, price, highlights, variants, isFeatured, featuredImage } = req.body;
    const products = await product.create({ title, description, price, highlights, variants, isFeatured, featuredImage });
    res.json(new ApiResponse(200, 'Products created successfully', products));
}
