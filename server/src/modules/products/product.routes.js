const express = require('express');
const router = express.Router();
const wrapAsync = require('../../utils/wrapAsync');
const { fetchProduct, fetchProductById, createProduct } = require('./product.controller');
const { createProductValidation } = require('./product.validation');
// const {Storage} = require('../../config/cloudinary.config')
// const upload = multer({ Storage })

router.get('/', wrapAsync(fetchProduct));
router.get('/:id', wrapAsync(fetchProductById));
router.post('/', createProductValidation, wrapAsync(createProduct));

module.exports = router;
