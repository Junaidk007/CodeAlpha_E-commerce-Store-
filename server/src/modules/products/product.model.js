const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true
    },

    highlights: [{
        type: String
    }],

    price: {
        type: Number,
        required: true,
        min: 0
    },

    variants: [
        {
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

            images: [
                {
                    url: {
                        type: String,
                        required: true
                    },
                    filename: {
                        type: String,
                        required: true
                    }
                }
            ],

            sizes: [
                {
                    size: {
                        type: String,
                        enum: ["XS", "S", "M", "L", "XL", "XXL"]
                    },

                    stock: {
                        type: Number,
                        default: 0
                    }
                }
            ]
        }
    ],

    featuredImage: {
        url: {
            type: String,
            required: true
        },
        filename: {
            type: String,
            required: true
        }
    },

    isFeatured: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
module.exports = Product;