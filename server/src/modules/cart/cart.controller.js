const Cart = require('./cart.model');
const Product = require('../products/product.model');
const ApiResponse = require('../../utils/ApiResponse');
const ApiError = require('../../utils/ApiError');

// GET /api/cart
// Fetch the logged-in user's cart. If they have no cart yet, create an empty one.
module.exports.fetchCart = async (req, res) => {
    let cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (!cart) {
        cart = await Cart.create({ user: req.user._id, items: [] });
    }
    res.status(200).json(new ApiResponse(200, true, 'Cart fetched successfully', cart));
};

// POST /api/cart/add
// Add an item to the cart. If the exact same product+size+color already exists, just increase quantity.
module.exports.addToCart = async (req, res) => {
    const { product, quantity, size, color, image, stock } = req.body;
    const userId = req.user._id;

    if (!product) {
        throw new ApiError(400, 'Product id is required');
    }

    // Make sure the product actually exists in the DB
    const productExists = await Product.findById(product);
    if (!productExists) {
        throw new ApiError(404, 'Product not found');
    }

    // NOTE: We store the UNIT price (price per 1 item), NOT price * quantity.
    // The frontend will multiply by quantity when displaying the total.
    const unitPrice = productExists.price;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
        // First time this user adds anything — create a brand new cart
        cart = await Cart.create({
            user: userId,
            totalCount: quantity || 1,
            items: [{ product, quantity: quantity || 1, size, color, image, stock, price: unitPrice }]
        });

        // Populate product details so the response has full product info
        await cart.populate('items.product');

        return res.json(new ApiResponse(200, true, 'Item added to cart successfully', cart));
    }

    // Cart already exists — check if this exact item (same product + size + color) is already in it
    const existingItemIndex = cart.items.findIndex(
        (item) =>
            item.product.toString() === product &&
            item.size === size &&
            item.color.name === color.name   // compare by color name (most readable)
    );

    if (existingItemIndex > -1) {
        // Item already in cart — just increase its quantity
        cart.items[existingItemIndex].quantity += (quantity || 1);
    } else {
        // New item — add it to the cart
        cart.items.push({ product, quantity: quantity || 1, size, color, image, stock, price: unitPrice });
    }

    // Recalculate the total number of items across all cart entries
    cart.totalCount = cart.items.reduce((total, item) => total + item.quantity, 0);

    await cart.save();
    await cart.populate('items.product');  // fill in full product data

    res.json(new ApiResponse(200, true, 'Item added to cart successfully', cart));
};

// PUT /api/cart
// Update the quantity of a specific item already in the cart
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

    // Find the specific item to update (matched by product + size + color name)
    const existingItemIndex = cart.items.findIndex(
        (item) =>
            item.product.toString() === productId &&
            item.size === size &&
            item.color.name === color.name
    );

    if (existingItemIndex > -1) {
        cart.items[existingItemIndex].quantity = quantity;
    } else {
        throw new ApiError(404, 'Item not found in cart');
    }

    // Recalculate total count
    cart.totalCount = cart.items.reduce((total, item) => total + item.quantity, 0);

    await cart.save();
    await cart.populate('items.product');

    res.json(new ApiResponse(200, true, 'Item updated successfully', cart));
};

// DELETE /api/cart/remove
// Remove a specific item from the cart (matched by product + size + color)
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

    // Keep all items EXCEPT the one that matches product + size + color
    const colorName = typeof color === 'object' ? color?.name : color;

    cart.items = cart.items.filter((item) => {
        const matchesProduct = item.product.toString() === productId;
        const matchesSize = size ? item.size === size : true;
        const matchesColor = colorName ? item.color?.name === colorName : true;
        // Remove the item only if ALL three match
        return !(matchesProduct && matchesSize && matchesColor);
    });

    // Recalculate total count
    cart.totalCount = cart.items.reduce((total, item) => total + item.quantity, 0);

    await cart.save();
    await cart.populate('items.product');

    res.json(new ApiResponse(200, true, 'Item removed from cart successfully', cart));
};
