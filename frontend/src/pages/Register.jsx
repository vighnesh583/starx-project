import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (Object.values(formData).some((field) => field.trim() === "")) {
            return setError("All fields are required.");
        }

        if (formData.password !== formData.confirmPassword) {
            return setError("Passwords do not match.");
        }

        // TODO: API call to register
        console.log("Registering:", formData);
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-red-600 mb-6">Create an Account</h2>

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="username"
                        placeholder="Full Name"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-lime-400"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-lime-400"
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-lime-400"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-lime-400"
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-lime-400"
                    />
                    <button
                        type="submit"
                        className="w-full bg-lime-500 hover:bg-lime-600 text-white py-2 rounded"
                    >
                        Register
                    </button>
                </form>

                <p className="text-center text-sm mt-4 text-gray-600">
                    Already have an account?{" "}
                    <a href="/login" className="text-red-500 hover:underline">Login</a>
                </p>
            </div>
        </div>
    );
};

export default Register;
