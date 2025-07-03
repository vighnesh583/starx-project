const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

// CORS setup for frontend access
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));


app.use(express.json());

// Import routes
const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const contactRoutes = require("./routes/contactRoutes");

// Routes
app.use("/api/auth", authRoutes);      // /login, /isrefadminreg
app.use("/api/admin", studentRoutes); // /
app.use("/api/contact", contactRoutes);

// Connect DB & start server
const PORT = process.env.PORT || 5000;
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.log(err));
