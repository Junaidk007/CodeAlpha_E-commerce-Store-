const express = require('express');
const app = express();
const cors = require('cors');
const { notFoundHandler, errorHandler } = require('./middleware/error.middleware');


//routes importing
const authRoutes = require('./modules/auth/auth.routes');
const productRoutes = require('./modules/products/product.routes');
const cartRoutes = require('./modules/cart/cart.routes');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))




app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: "ok",
        message: "server is running",
        timestamp: new Date().toISOString()
    })
}) 

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/cart', cartRoutes)


app.use(notFoundHandler);
app.use(errorHandler);


module.exports = app;