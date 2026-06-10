const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true,   
    },
    address: [
        {
            fullname: {
                type: String,
                required: true,
            },
            phone: {
                type: String,
                required: true,
            },
            address: {
                type: String,
                required: true,
            },
            city: {
                type: String,
                required: true,
            },
            state: {
                type: String,
                required: true,
            },
            zip: {
                type: String,
                required: true,
            },
            country: {
                type: String,
                required: true,
            },
        }
    ]

}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema);