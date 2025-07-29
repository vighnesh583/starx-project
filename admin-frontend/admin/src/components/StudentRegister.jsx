import React, { useState } from "react";
import axios from "axios";

const initialCourseOptions = [
    {
        name: "",
        topics: [],
        selectedTopics: [],
    },
];

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

const StudentRegister = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        contact: "",
        password: "",
        address: "",
        mode: "OnlineClass",
        doj: "",
        duration: "",
        totalFees: "",
        installments: [{ amount: "", dueDate: "" }],
        aadhaarFile: null,
        courses: initialCourseOptions,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "aadhaarFile") {
            setForm({ ...form, aadhaarFile: files[0] });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleInstallmentChange = (index, field, value) => {
        const updated = [...form.installments];
        updated[index][field] = value;
        setForm({ ...form, installments: updated });
    };

    const addInstallment = () => {
        setForm({
            ...form,
            installments: [...form.installments, { amount: "", dueDate: "" }],
        });
    };

    const addCourse = () => {
        setForm({
            ...form,
            courses: [
                ...form.courses,
                { name: "", topics: [], selectedTopics: [] }
            ],
        });
    };

    const deleteCourse = (index) => {
        const updated = form.courses.filter((_, idx) => idx !== index);
        setForm({ ...form, courses: updated });
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

        const formData = new FormData();

        formData.append("name", form.name);
        formData.append("email", form.email);
        formData.append("contact", form.contact);
        formData.append("password", form.password);
        formData.append("address", form.address);
        formData.append("mode", form.mode);
        formData.append("doj", form.doj);
        formData.append("duration", form.duration);
        formData.append("totalFees", form.totalFees);
        formData.append("aadhaarFile", form.aadhaarFile);

        formData.append("installments", JSON.stringify(form.installments));
        formData.append("courses", JSON.stringify(form.courses));

        try {
            const res = await axios.post("http://localhost:5000/api/students/register", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("✅ Student registered successfully!");
            console.log(res.data);
        } catch (err) {
            console.error("❌ Error registering student:", err.response?.data || err.message);
            alert("❌ Failed to register student");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 px-4 py-8">
            <div className="max-w-5xl mx-auto bg-white shadow p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-center text-lime-600 mb-6">
                    Student Registration
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" className="border px-4 py-2 rounded" />
                        <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="Email" className="border px-4 py-2 rounded" />
                        <input name="contact" value={form.contact} onChange={handleChange} placeholder="Phone Number" className="border px-4 py-2 rounded" />
                        <input name="password" value={form.password} onChange={handleChange} type="password" placeholder="Password" className="border px-4 py-2 rounded" />
                        <input name="address" value={form.address} onChange={handleChange} placeholder="Address" className="border px-4 py-2 rounded" />
                    </div>

                    {/* Aadhaar Upload */}
                    <div>
                        <label className="block font-medium text-gray-700 mb-1">Upload Aadhaar Card (PDF/Image)</label>
                        <input
                            type="file"
                            name="aadhaarFile"
                            accept=".pdf, .png, .jpg, .jpeg"
                            onChange={handleChange}
                            className=" text-black font-semibold px-6 py-1 rounded-full shadow-md border border-black hover:bg-lime-600 transition-all duration-300"

                        />
                        {form.aadhaarFile && (
                            <p className="text-green-600 text-sm mt-1">{form.aadhaarFile.name}</p>
                        )}
                    </div>

                    {/* Mode Toggle */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Mode</label>
                        <div className="flex gap-6 items-center">
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

                    {/* Courses Loop */}
                    {form.courses.map((course, idx) => (
                        <div key={idx} className="border rounded p-4 bg-gray-50 mt-4 space-y-2 relative">
                            <button
                                type="button"
                                onClick={() => deleteCourse(idx)}
                                className="absolute top-2 right-2 text-red-500 text-xs hover:underline"
                            >
                                ❌ Remove Course
                            </button>

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

                            {/* Topic Checkboxes */}
                            {course.topics.length > 0 && (
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

                    <button
                        type="button"
                        onClick={addCourse}
                        className="text-sm text-lime-600 hover:underline"
                    >
                        + Add More Course
                    </button>

                    {/* Dates and Duration */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input type="date" name="doj" value={form.doj} onChange={handleChange} className="border px-4 py-2 rounded" />
                        <input type="text" name="duration" value={form.duration} onChange={handleChange} placeholder="e.g. 6 months" className="border px-4 py-2 rounded" />
                        <input type="number" name="totalFees" value={form.totalFees} onChange={handleChange} placeholder="e.g. 35000" className="border px-4 py-2 rounded" />
                    </div>

                    {/* Installments */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Monthly Installments</label>
                        {form.installments.map((inst, idx) => (
                            <div key={idx} className="flex gap-4 mb-2">
                                <input
                                    type="number"
                                    placeholder="Amount"
                                    value={inst.amount}
                                    onChange={(e) => handleInstallmentChange(idx, "amount", e.target.value)}
                                    className="border px-4 py-2 rounded w-1/2"
                                />
                                <input
                                    type="date"
                                    value={inst.dueDate}
                                    onChange={(e) => handleInstallmentChange(idx, "dueDate", e.target.value)}
                                    className="border px-4 py-2 rounded w-1/2"
                                />
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addInstallment}
                            className="text-sm text-lime-600 hover:underline mt-1"
                        >
                            + Add Installment
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-lime-500 hover:bg-lime-600 text-white py-2 rounded mt-4"
                    >
                        Register Student
                    </button>
                </form>
            </div>
        </div>
    );
};

export default StudentRegister;
