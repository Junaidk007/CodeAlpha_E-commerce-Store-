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
    const { product, quantity, size, color, image } = req.body;
    const userId = req.user._id;

    if (!product) {
        throw new ApiError(400, 'Product id is required');
    }

    const productExists = await Product.findById(product);
    if (!productExists) {
        throw new ApiError(404, 'Product not found');
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
        cart = await Cart.create({
            user: userId,
            items: [{ product, quantity: quantity || 1, size, color, image }]
        });
    } else {
        const existingItemIndex = cart.items.findIndex(
            (item) => item.product.toString() === product && item.size === size && item.color.name === color.name
        );

        if (existingItemIndex > -1) {
            cart.items[existingItemIndex].quantity += (quantity || 1);
        } else {
            cart.items.push({ product, quantity: quantity || 1, size, color, image });

            await cart.save();
        }

        await cart.populate('items.product');

        res.json(new ApiResponse(200, 'Item added to cart successfully', cart));
    };
}    


module.exports.updateCart = async (req, res) => {
    const { productId, quantity, size, color } = req.body;
    const userId = req.user._id;

    if (!productId || !quantity) {
        throw new ApiError(400, 'Product and quantity are required');
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
        throw new ApiError(404, 'Cart not found');
    }

    const existingItemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId && item.size === size && item.color.name === color.name
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

module.exports.deleteCartItem = async (req, res) => {
    const { productId, size, color } = req.body;
    const userId = req.user._id;

    if (!productId) {
        throw new ApiError(400, 'Product id is required');
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
        throw new ApiError(404, 'Cart not found');
    }

    cart.items = cart.items.filter((item) => {
        const matchesProduct = item.product.toString() === productId;
        const matchesSize = size ? item.size === size : true;
        const colorName = typeof color === 'object' ? color?.name : color;
        const matchesColor = colorName ? item.color?.name === colorName : true;
        return !(matchesProduct && matchesSize && matchesColor);
    });

    await cart.save();
    await cart.populate('items.product');

    res.json(new ApiResponse(200, 'Item removed from cart successfully', cart));
}