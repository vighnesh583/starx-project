import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("All fields are required.");
            return;
        }

        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", {
                email,
                password
            });

            const { token, isAdmin } = res.data;

            // Save token locally
            localStorage.setItem("token", token);

            // Navigate based on role
            if (isAdmin) {
                navigate("/admin");
            } else {
                navigate("/learn");
            }

        } catch (err) {
            const msg = err.response?.data?.error || "Login failed.";
            setError(msg);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-red-600 mb-6">Login to StarX</h2>

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-lime-400"
                            placeholder="example@mail.com"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-gray-700 mb-1">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-lime-400"
                                placeholder="••••••••"
                                required
                            />
                            <span
                                className="absolute right-3 top-2.5 text-gray-500 cursor-pointer text-sm"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </span>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-lime-500 hover:bg-lime-600 text-white py-2 rounded transition"
                    >
                        Login
                    </button>
                </form>

                <p className="text-center text-sm mt-4 text-gray-600">
                    Don't have an account?{" "}
                    <a href="/register" className="text-red-500 hover:underline">Register</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
