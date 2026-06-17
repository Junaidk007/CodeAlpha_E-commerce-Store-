const { verifyToken } = require('../utils/jwt');
const User = require('../modules/user/user.model');
const ApiResponse = require('../utils/ApiResponse');


const verifyUser = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.json(new ApiResponse(401, 'Unauthorized: No token provided'));
        }

        let token;
        if (authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
        } else {
            token = authHeader;
        }

        if (!token) {
            return res.json(new ApiResponse(401, 'Unauthorized: Invalid token format'));
        }

        let decoded;
        try {
            decoded = verifyToken(token);
        } catch (error) {
            return res.json(new ApiResponse(401, 'Unauthorized: Invalid or expired token'));
        }

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.json(new ApiResponse(401, 'Unauthorized: User not found'));
        }

        req.user = user;
        
        next();
    } catch (error) {
        console.error('Error in auth middleware:', error);
        return res.json(new ApiResponse(500, 'Internal server error'));
    }
};

module.exports = {
    verifyUser
};
