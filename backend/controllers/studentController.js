const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Admin creates a student
exports.registerStudent = async (req, res) => {
    try {
        const { name, email, password, phone, course } = req.body;
        const hash = await bcrypt.hash(password, 10);

        const newStudent = new User({
            name,
            email,
            password: hash,
            phone,
            course,
            isAdmin: false
        });

        await newStudent.save();

        res.status(201).json({ message: "Student registered successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
