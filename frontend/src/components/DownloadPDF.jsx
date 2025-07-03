// src/components/DownloadPDF.jsx
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const DownloadPDF = () => {
    const location = useLocation();
    const { pdfName = "StarX-pdf.pdf" } = location.state || {};

    const [form, setForm] = useState({ name: "", email: "", phone: "" });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/contact/submit", form); // ✅ Backend call
            setSubmitted(true);
            handleDownload(); // proceed with download
        } catch (err) {
            console.error("Form submission failed:", err);
            alert("Submission failed. Try again.");
        }
        // Optional: send data to backend or email service
        console.log("Form submitted:", form);

    };

    const handleDownload = () => {
        const pdfUrl = `/pdfs/${pdfName}`;
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.setAttribute("download", pdfName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
            <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
                {!submitted ? (
                    <>
                        <h2 className="text-2xl font-bold text-red-600 mb-4">Access Form</h2>
                        <p className="text-gray-700 mb-4">Please fill this form before downloading.</p>

                        <form onSubmit={handleSubmit} className="space-y-4 text-left">
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={form.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-lime-400"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-lime-400"
                                required
                            />
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Your Phone Number"
                                value={form.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-lime-400"
                                required
                            />

                            <button
                                type="submit"
                                className="w-full bg-lime-500 hover:bg-lime-600 text-white py-2 rounded"
                            >
                                Submit & Download PDF
                            </button>
                        </form>
                    </>
                ) : (
                    <>
                        <h2 className="text-2xl font-bold text-green-600 mb-4">Thank You!</h2>
                        <p className="text-gray-700">Your download should begin shortly.</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default DownloadPDF;
