require('dotenv').config();

const env = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/codealpha', 
    CLOUD_API_KEY: process.env.CLOUD_API_KEY,
    CLOUD_API_SECRET: process.env.CLOUD_API_SECRET,
    CLOUD_NAME: process.env.CLOUD_NAME,
    TOKEN_KEY: process.env.TOKEN_KEY || 'JrnqDufdQ-zb7PwzpbB_pB',
    TOKEN_EXPIRY: process.env.TOKEN_EXPIRY || '7d',
    
}

module.exports = env