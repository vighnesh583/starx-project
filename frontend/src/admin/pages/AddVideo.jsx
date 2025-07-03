import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";

const AddVideo = () => {
    const [formData, setFormData] = useState({
        course: "",
        topic: "",
        title: "",
        url: "",
    });

    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const courses = ["Select Course", "React", "Python", "Java", "Data Science"];

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { course, topic, title, url } = formData;

        if (!course || !topic || !title || !url) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            await axios.post("http://localhost:5000/api/videos/add", formData);
            setSuccess("Video added successfully!");
            setError("");
            setFormData({ course: "", topic: "", title: "", url: "" });
        } catch (err) {
            setError("Failed to upload video."(err));
            setSuccess("");
        }
    };

    return (
        <div className="flex">
            <Sidebar />
            <main className="ml-64 flex-1">
                <Navbar />
                <div className="p-6 max-w-3xl">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload Course Video</h2>

                    {success && <p className="text-green-600 mb-4">{success}</p>}
                    {error && <p className="text-red-600 mb-4">{error}</p>}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5 bg-white p-6 shadow rounded-lg"
                    >
                        {/* Course Select */}
                        <div>
                            <label className="block text-gray-700 mb-1">Course</label>
                            <select
                                name="course"
                                value={formData.course}
                                onChange={handleChange}
                                className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-lime-400"
                            >
                                {courses.map((course, i) => (
                                    <option key={i} value={i === 0 ? "" : course}>
                                        {course}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Topic Input */}
                        <div>
                            <label className="block text-gray-700 mb-1">Topic</label>
                            <input
                                type="text"
                                name="topic"
                                value={formData.topic}
                                onChange={handleChange}
                                placeholder="e.g. useEffect Hook, Functions, Loops..."
                                className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-lime-400"
                            />
                        </div>

                        {/* Title */}
                        <div>
                            <label className="block text-gray-700 mb-1">Video Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter video title"
                                className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-lime-400"
                            />
                        </div>

                        {/* URL */}
                        <div>
                            <label className="block text-gray-700 mb-1">Video URL</label>
                            <input
                                type="url"
                                name="url"
                                value={formData.url}
                                onChange={handleChange}
                                placeholder="https://youtube.com/embed/..."
                                className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-lime-400"
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-lime-500 hover:bg-lime-600 text-white px-6 py-2 rounded"
                        >
                            Submit Video
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default AddVideo;
