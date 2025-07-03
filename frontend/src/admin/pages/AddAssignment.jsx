import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";

const AddAssignment = () => {
    const [form, setForm] = useState({
        course: "",
        topic: "",
        files: [],
    });

    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setForm({ ...form, files: Array.from(e.target.files) });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.course || !form.topic || form.files.length === 0) {
            setError("Please fill all fields and upload at least one PDF.");
            return;
        }

        const formData = new FormData();
        formData.append("course", form.course);
        formData.append("topic", form.topic);
        form.files.forEach((file) => formData.append("assignments", file));

        try {
            await axios.post("http://localhost:5000/api/assignments/add", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setSuccess("Assignment uploaded successfully!");
            setError("");
            setForm({ course: "", topic: "", files: [] });
        } catch (err) {
            setError("Failed to upload assignment."(err));
            setSuccess("");
        }
    };

    return (
        <div className="flex">
            <Sidebar />
            <main className="ml-64 flex-1">
                <Navbar />
                <div className="p-6 max-w-3xl">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Assignment</h2>

                    {success && <p className="text-green-600 mb-4">{success}</p>}
                    {error && <p className="text-red-600 mb-4">{error}</p>}

                    <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow p-6 rounded-lg">
                        <div>
                            <label className="block text-gray-700 mb-1">Course</label>
                            <input
                                type="text"
                                name="course"
                                value={form.course}
                                onChange={handleChange}
                                placeholder="e.g. Python, Java"
                                className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-lime-400"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-1">Topic</label>
                            <input
                                type="text"
                                name="topic"
                                value={form.topic}
                                onChange={handleChange}
                                placeholder="e.g. Loops, OOPs"
                                className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-lime-400"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-1">Upload PDF(s)</label>
                            <input
                                type="file"
                                name="assignments"
                                accept="application/pdf"
                                multiple
                                onChange={handleFileChange}
                                className="block w-46 border-solid border-black border p-0.5 hover:text-green-600 text-sm bg-white  rounded-[5%] hover:rounded-[6%] transition-all duration-300 shadow"
                            />
                            {form.files.length > 0 && (
                                <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
                                    {form.files.map((file, i) => (
                                        <li key={i}>{file.name}</li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="bg-lime-500 hover:bg-lime-600 text-white px-6 py-2 rounded"
                        >
                            Submit Assignment
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default AddAssignment;
