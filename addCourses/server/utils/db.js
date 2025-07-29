const mongoose = require("mongoose");

// const URI = "mongodb://127.0.0.1:27017/mern_admin"
// mongoose.connect(URI);

// got mongodb uri from .env file
const URI = process.env.MONGODB_URI;

const connectDb = async () => {
    try {
        await mongoose.connect(URI);
        console.log("connection successful to DB");
    } catch (error) {
        console.log("database connection error");
        process.exit(0);
    }
}

module.exports = connectDb;