const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Admin Registration
exports.adminRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hash = await bcrypt.hash(password, 10);

        const newAdmin = new User({
            name,
            email,
            password: hash,
            isAdmin: true
        });

        await newAdmin.save();

        res.status(201).json({ message: "Admin registered successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Shared Login (Admin & Student)
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: "User not found" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ error: "Invalid password" });

        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET
        );

        res.json({ token, isAdmin: user.isAdmin });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// axios.post("http://localhost:5000/api/auth/login", { email, password })
//   .then(res => {
//     const { token, isAdmin } = res.data;
//     localStorage.setItem("token", token);

//     if (isAdmin) {
//       navigate("/admin");
//     } else {
//       navigate("/student");
//     }
//   })
//   .catch(err => alert(err.response.data.error));
