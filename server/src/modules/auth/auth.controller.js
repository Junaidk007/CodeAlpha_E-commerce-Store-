const user = require('../user/user.model');
const ApiResponse = require('../../utils/ApiResponse');
const bcrypt = require('bcrypt');
const { generateToken } = require('../../utils/jwt');

module.exports.signup = async (req, res) => {
    const { name, email, password } = req.body;

    const existingUser = await user.findOne({ email });

    if (existingUser) {
        return res.status(400).json(new ApiResponse(400, false, 'User already exists'));
    }

    const hashPass = await bcrypt.hash(password, 10);

    await user.create({
        name,
        email,
        password: hashPass
    });

    return res.status(201).json(new ApiResponse(201, true, 'User created successfully'));
}


module.exports.signin = async (req, res) => {
    const { email, password } = req.body;

    const existingUser = await user.findOne({ email }).select("+password");

    if (!existingUser) {
        return res.status(404).json(new ApiResponse(404, false, 'User not found'));
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordValid) {
        return res.status(401).json(new ApiResponse(401, false, 'Invalid password'));
    }

    const payload = {
        id: existingUser._id,
        email: existingUser.email,
        role: existingUser.role
    }

    const token = generateToken(payload);

    return res.status(200).json(new ApiResponse(200, true, 'User signed in successfully', {
        token,
        user: payload
    }));
}
