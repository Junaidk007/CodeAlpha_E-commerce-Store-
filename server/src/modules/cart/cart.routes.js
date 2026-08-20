const express = require('express');
const router = express.Router();
const wrapAsync = require('../../utils/wrapAsync');
const { fetchCart, addToCart, updateCart, deleteCartItem } = require('./cart.controller');
const { verifyUser } = require('../../middleware/auth.middleware');

router.get('/', verifyUser, wrapAsync(fetchCart));
router.post('/add', verifyUser, wrapAsync(addToCart));
router.put('/', verifyUser, wrapAsync(updateCart));
router.delete('/remove', verifyUser, wrapAsync(deleteCartItem));

module.exports = router;
