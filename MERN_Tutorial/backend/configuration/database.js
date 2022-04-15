const mongoose = require('mongoose')

const connectDB = async () => {
    console.log('connecting to mongoDB : ',new Date().toLocaleString());
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected at ${conn.connection.host} :  ${new Date().toLocaleString()}`.underline);
    } catch (error) {
        console.log(error);
        process.exit(1)
    } 
}

module.exports = connectDB