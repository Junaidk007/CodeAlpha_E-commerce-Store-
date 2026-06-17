const express = require('express');
const router = express.Router();
const wrapAsync = require('../../utils/wrapAsync');
const { fetchCart, addToCart } = require('./cart.controller');
const { verifyUser } = require('../../middleware/auth.middleware');

router.get('/', verifyUser, wrapAsync(fetchCart));
router.post('/', verifyUser, wrapAsync(addToCart));

module.exports = router;
