const app = require('./app');
const env = require('./config/env.config');
const connectDB = require('./config/db.config');


connectDB()

app.listen(env.PORT, () => {
    console.log(`server is running on port ${env.PORT}`)
})