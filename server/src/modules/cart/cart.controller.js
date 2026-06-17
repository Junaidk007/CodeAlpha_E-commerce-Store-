const Cart = require('./cart.model');
const Product = require('../products/product.model');
const ApiResponse = require('../../utils/ApiResponse');
const ApiError = require('../../utils/ApiError');

module.exports.fetchCart = async (req, res) => {
    let cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (!cart) {
        cart = await Cart.create({ user: req.user._id, items: [] });
    }
    res.status(200).json(new ApiResponse(200, 'Cart fetched successfully', cart));
};

module.exports.addToCart = async (req, res) => {
    const { product, quantity, size } = req.body;
    const userId = req.user._id;

    if (!product) {
        throw new ApiError(400, 'Product is required');
    }

    const productExists = await Product.findById(product);
    if (!productExists) {
        throw new ApiError(404, 'Product not found');
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
        cart = await Cart.create({
            user: userId,
            items: [{ product, quantity: quantity || 1, size }]
        });
    } else {
        const existingItemIndex = cart.items.findIndex(
            (item) => item.product.toString() === product && item.size === size
        );

        if (existingItemIndex > -1) {
            cart.items[existingItemIndex].quantity += (quantity || 1);
        } else {
            cart.items.push({ product, quantity: quantity || 1, size });
        }

        await cart.save();
    }

    await cart.populate('items.product');

    res.json(new ApiResponse(200, 'Item added to cart successfully', cart));
};


module.exports.updateCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    if (!productId || !quantity) {
        throw new ApiError(400, 'Product and quantity are required');
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
        throw new ApiError(404, 'Cart not found');
    }

    const existingItemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
    );

    if (existingItemIndex > -1) {
        cart.items[existingItemIndex].quantity = quantity;
    } else {
        throw new ApiError(404, 'Item not found in cart');
    }

    await cart.save();
    await cart.populate('items.product');

    res.json(new ApiResponse(200, 'Item updated successfully', cart));
};