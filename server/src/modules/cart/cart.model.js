const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },

    image: {
        url: {
            type: String,
            required: true
        },
        filename: {
            type: String,
            required: true
        }
    },

    color: {
        name: {
            type: String,
            required: true
        },
        hex: {
            type: String,
            required: true
        }
    },

    quantity: {
        type: Number,
        default: 1,
        min: 1
    },

    size: {
        type: String,
        enum: ["XS", "S", "M", "L", "XL", "XXL"]
    }
}, { _id: false });

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },

    items: [cartItemSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model("Cart", cartSchema);
