import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

const Contact = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/contact/submit", form); // ✅ Backend call
            setSuccess("Your message has been sent!");
            setForm({ name: "", email: "", phone: "", message: "" });
        } catch (err) {
            console.error("Form submission failed:", err);
            alert("Submission failed. Try again.");
        }
        // TODO: Send form data to backend or email service
        console.log("Contact Form Submitted", form);

    };

    return (<>
        <Navbar />
        <div className="min-h-screen bg-gray-100 py-16 px-4">

            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
                <h2 className="text-3xl font-bold text-center text-red-600 mb-6">Contact Us</h2>

                {success && <p className="text-green-600 text-sm mb-4 text-center">{success}</p>}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-lime-400"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-lime-400"
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Your Phone Number"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-lime-400"
                    />
                    <textarea
                        name="message"
                        placeholder="Your Message"
                        value={form.message}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-lime-400 min-h-[120px]"
                    ></textarea>
                    <button
                        type="submit"
                        className="w-full bg-lime-500 hover:bg-lime-600 text-white py-2 rounded"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div> <Footer /> </>
    );
};

export default Contact;
