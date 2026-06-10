const express = require('express');
const app = express();
const cors = require('cors');
const { notFoundHandler, errorHandler } = require('./middleware/error.middleware');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}))




app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: "ok",
        message: "server is running", 
        timestamp : new Date().toISOString() 
    })
}) 


app.use(notFoundHandler);
app.use(errorHandler);


module.exports = app;