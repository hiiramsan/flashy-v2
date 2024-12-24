const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;

module.exports.connectDB = async () => {
    try {
        const conn = await mongoose.connect(uri);
        console.log(`Mongo connected: ${conn.connection.host}`)
    } catch (error) {
        console.log("MongoDB Error", error)
    }
}

