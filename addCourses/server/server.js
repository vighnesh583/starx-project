const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./utils/db");
const router = require("./routes/courseRoute");


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/", router);



const PORT = process.env.PORT || 5000;
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`)))
    .catch((err) => console.error("❌ MongoDB connection failed", err));