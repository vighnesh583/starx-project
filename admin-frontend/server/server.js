const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const studentRoutes = require("./routes/studentRoutes");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));
app.use("/api/students", studentRoutes);

const PORT = process.env.PORT || 5000;
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`)))
    .catch((err) => console.error("❌ MongoDB connection failed", err));
