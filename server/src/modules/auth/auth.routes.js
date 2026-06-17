const express = require('express');
const router = express.Router();
const wrapAsync = require('../../utils/wrapAsync');
const { signup , signin} = require('./auth.controller');
const { signupValidation, signinValidation } = require('./auth.validation');
// const { verifyUser } = require('../../middleware/auth.middleware');

router.post('/signup', signupValidation, wrapAsync(signup));
router.post('/signin', signinValidation, wrapAsync(signin));


// router.get('/verify', verifyUser, (req, res) => {
//     res.status(200).send('auth is working');
// });

module.exports = router;    
