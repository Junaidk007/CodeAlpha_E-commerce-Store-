const Joi = require('joi');
const ApiResponse = require('../../utils/ApiResponse');

const productSchema = Joi.object({
    title: Joi.string().trim().required().messages({
        'string.empty': 'Title is required',
        'any.required': 'Title is required'
    }),
    description: Joi.string().required().messages({
        'string.empty': 'Description is required',
        'any.required': 'Description is required'
    }),
    highlights: Joi.array().items(Joi.string()).messages({
        'array.base': 'Highlights must be an array of strings'
    }),
    price: Joi.number().min(0).required().messages({
        'number.base': 'Price must be a number',
        'number.min': 'Price cannot be negative',
        'any.required': 'Price is required'
    }),
    oldPrice: Joi.number().min(0).optional().messages({
        'number.base': 'Old price must be a number',
        'number.min': 'Old price cannot be negative'
    }),
    variants: Joi.array().items(
        Joi.object({
            color: Joi.object({
                name: Joi.string().required().messages({
                    'string.empty': 'Color name is required',
                    'any.required': 'Color name is required'
                }),
                hex: Joi.string().required().messages({
                    'string.empty': 'Color hex code is required',
                    'any.required': 'Color hex code is required'
                })
            }).required().messages({
                'any.required': 'Color configuration is required'
            }),
            images: Joi.array().items(
                Joi.object({
                    url: Joi.string().required().messages({
                        'string.empty': 'Image URL is required',
                        'any.required': 'Image URL is required'
                    }),
                    filename: Joi.string().required().messages({
                        'string.empty': 'Image filename is required',
                        'any.required': 'Image filename is required'
                    })
                })
            ).required().messages({
                'any.required': 'Images are required'
            }),
            sizes: Joi.array().items(
                Joi.object({
                    size: Joi.string().required().messages({
                        'string.empty': 'Size is required',
                        'any.required': 'Size is required'
                    }),
                    stock: Joi.number().min(0).default(0).messages({
                        'number.min': 'Stock cannot be negative'
                    })
                })
            )
        })
    ),
    isFeatured: Joi.boolean().default(false),
    featuredImage: Joi.object({
        url: Joi.string().required().messages({
            'string.empty': 'Featured image URL is required',
            'any.required': 'Featured image URL is required'
        }),
        filename: Joi.string().required().messages({
            'string.empty': 'Featured image filename is required',
            'any.required': 'Featured image filename is required'
        })
    }).required().messages({
        'any.required': 'Featured image is required'
    })
});

const createProductValidation = (req, res, next) => {
    const { error } = productSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMessages = error.details.map(detail => detail.message).join(', ');
        return res.status(400).json(new ApiResponse(400, errorMessages));
    }
    next();
};

module.exports = {
    createProductValidation
};
