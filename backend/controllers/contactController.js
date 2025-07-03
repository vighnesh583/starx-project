const Contact = require("../models/Contact");

exports.submitContact = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        // Save with fallback message if none
        const contact = new Contact({
            name,
            email,
            phone,
            message: message?.trim() || "N/A"
        });

        await contact.save();
        res.status(201).json({ message: "Contact form submitted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to submit contact form", details: err.message });
    }
};
