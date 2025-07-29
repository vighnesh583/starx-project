import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const masterCourseList = [
    {
        name: "Python Full Stack",
        topics: ["Django", "REST API", "JavaScript", "CSS", "HTML"],
    },
    {
        name: "Java Full Stack",
        topics: ["Spring Boot", "Hibernate", "JavaScript", "JSP", "Servlets"],
    },
    {
        name: "Data Science",
        topics: ["Python", "Machine Learning", "Pandas", "NumPy", "Matplotlib"],
    },
];

const StudentUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        contact: "",
        password: "",
        address: "",
        mode: "PureOnline",
        doj: "",
        duration: "",
        totalFees: "",
        installments: [],
        courses: [],
        aadhaarFile: "",
        courseCompleted: false,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/students/${id}`);
                setForm({
                    ...data,
                    password: data.plainPassword, // Use decrypted password
                    doj: data.doj?.substring(0, 10),
                });
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch student:", err);
            }
        };

        fetchStudent();
    }, [id]);


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleInstallmentChange = (index, field, value) => {
        const updated = [...form.installments];
        updated[index][field] = value;
        setForm({ ...form, installments: updated });
    };

    const handleCourseSelect = (index, courseName) => {
        const course = masterCourseList.find((c) => c.name === courseName);
        const updatedCourses = [...form.courses];
        updatedCourses[index] = {
            ...updatedCourses[index],
            name: courseName,
            topics: course?.topics || [],
            selectedTopics: [...(course?.topics || [])],
        };
        setForm({ ...form, courses: updatedCourses });
    };

    const handleTopicToggle = (courseIndex, topic) => {
        const updatedCourses = [...form.courses];
        const selected = updatedCourses[courseIndex].selectedTopics;
        updatedCourses[courseIndex].selectedTopics = selected.includes(topic)
            ? selected.filter((t) => t !== topic)
            : [...selected, topic];
        setForm({ ...form, courses: updatedCourses });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/students/${id}`, form);
            alert("Student updated successfully");
            navigate("/studentmanager");
        } catch (err) {
            console.error("Update failed", err);
            alert("Update failed");
        }
    };

    if (loading) return <p className="p-8 text-gray-500">Loading...</p>;

    return (
        <div className="min-h-screen bg-gray-100 px-4 py-8">
            <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold text-center text-lime-600 mb-6">Update Student</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" className="border px-4 py-2 rounded" />
                        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="border px-4 py-2 rounded" />
                        <input name="contact" value={form.contact} onChange={handleChange} placeholder="Phone" className="border px-4 py-2 rounded" />
                        <input
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            type="text"
                            placeholder="Password"
                            className="border px-4 py-2 rounded"
                        />

                        <input name="address" value={form.address} onChange={handleChange} placeholder="Address" className="border px-4 py-2 rounded" />
                    </div>

                    {/* Aadhaar View */}
                    {form.aadhaarFile && (
                        <div>
                            <label className="block font-medium text-gray-700 mb-1">Aadhaar File</label>
                            <a
                                href={`http://localhost:5000/uploads/${form.aadhaarFile}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-600 underline"
                            >
                                View Aadhaar
                            </a>
                        </div>
                    )}

                    {/* Mode */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Mode</label>
                        <div className="flex gap-4">
                            {["PureOnline", "OnlineClass", "Offline"].map((mode) => (
                                <label key={mode} className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="mode"
                                        value={mode}
                                        checked={form.mode === mode}
                                        onChange={handleChange}
                                        className="accent-lime-500"
                                    />
                                    {mode}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Courses */}
                    {form.courses.map((course, idx) => (
                        <div key={idx} className="border rounded p-4 bg-gray-50 mt-4 space-y-2 relative">
                            <label className="block font-medium text-gray-700">Course #{idx + 1}</label>
                            <select
                                value={course.name}
                                onChange={(e) => handleCourseSelect(idx, e.target.value)}
                                className="w-full border px-4 py-2 rounded"
                            >
                                <option value="">-- Select Course --</option>
                                {masterCourseList.map((c) => (
                                    <option key={c.name} value={c.name}>{c.name}</option>
                                ))}
                            </select>

                            {course.topics?.length > 0 && (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                                    {course.topics.map((topic) => (
                                        <label key={topic} className="text-sm text-gray-700">
                                            <input
                                                type="checkbox"
                                                checked={course.selectedTopics.includes(topic)}
                                                onChange={() => handleTopicToggle(idx, topic)}
                                                className="mr-2"
                                            />
                                            {topic}
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}

                    {/* DOJ, Duration, Fees */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input name="doj" value={form.doj} onChange={handleChange} type="date" className="border px-4 py-2 rounded" />
                        <input name="duration" value={form.duration} onChange={handleChange} placeholder="e.g. 6 months" className="border px-4 py-2 rounded" />
                        <input name="totalFees" value={form.totalFees} onChange={handleChange} type="number" placeholder="Total Fees" className="border px-4 py-2 rounded" />
                    </div>

                    {/* Installments */}
                    <div>
                        <label className="font-semibold text-gray-700 block mb-2">Installments</label>
                        {form.installments.map((i, idx) => (
                            <div key={idx} className="flex gap-4 mb-2">
                                <input
                                    value={i.amount}
                                    onChange={(e) => handleInstallmentChange(idx, "amount", e.target.value)}
                                    type="number"
                                    className="border px-4 py-2 rounded w-1/2"
                                    placeholder="Amount"
                                />
                                <input
                                    value={i.dueDate?.substring(0, 10)}
                                    onChange={(e) => handleInstallmentChange(idx, "dueDate", e.target.value)}
                                    type="date"
                                    className="border px-4 py-2 rounded w-1/2"
                                />
                            </div>
                        ))}
                    </div>

                    <button type="submit" className="w-full bg-lime-500 text-white py-2 rounded hover:bg-lime-600 mt-4">
                        Update Student
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/studentmanager")}
                        className="mt-3 text-sm text-blue-600 underline"
                    >
                        ← Back to Student Manager
                    </button>
                </form>
            </div>
        </div>
    );
};

export default StudentUpdate;
