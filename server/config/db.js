const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB Connected With wifi");
    } catch (err) {
        console.error(err);
    }
}

module.exports = { connectDB }