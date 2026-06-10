const mongoose = require('mongoose');
const env = require('./env.config');


const connectDB = async () => {
    try {
        await mongoose.connect(env.MONGO_URI);
        console.log("mongo db is connected with host"+mongoose.connection.host);

    } catch (error) {
        console.log("mongo db is not connected"+error);
        process.exit(1); // this line will  terminat the application if the database is not connected
    }
}

module.exports = connectDB;