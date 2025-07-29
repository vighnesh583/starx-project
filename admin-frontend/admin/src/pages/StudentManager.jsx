import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import InvoiceTemplate from "../components/InvoiceTemplate";


const StudentManager = () => {
    const [students, setStudents] = useState([]);
    const [filterMode, setFilterMode] = useState("All");
    const navigate = useNavigate();
    const [showInvoice, setShowInvoice] = useState(false);
    const [invoiceData, setInvoiceData] = useState(null);


    // Fetch students from backend
    useEffect(() => {
        axios.get("http://localhost:5000/api/students")

            .then((res) => setStudents(res.data))
            .catch((err) => console.error("Error fetching students:", err));

    }, []);

    const filteredStudents =
        filterMode === "All" ? students : students.filter((s) => s.mode === filterMode);

    const toggleInstallment = (studentId, index) => {
        const updated = students.map((s) => {
            if (s._id === studentId) {
                const updatedInst = s.installments.map((i, idx) =>
                    idx === index ? { ...i, paid: !i.paid } : i
                );
                return { ...s, installments: updatedInst };
            }
            return s;
        });
        setStudents(updated);
    };

    const toggleCourseCompleted = (studentId) => {
        const updated = students.map((s) =>
            s._id === studentId ? { ...s, courseCompleted: !s.courseCompleted } : s
        );
        setStudents(updated);
    };

    const generateInvoice = (student) => {
        const selectedInstallments = student.installments.filter(i => i.paid);

        if (selectedInstallments.length === 0) {
            alert("Please select at least one installment.");
            return;
        }

        setInvoiceData({ student, selectedInstallments });
        setShowInvoice(true);
    };


    const deleteStudent = async (studentId) => {
        if (!window.confirm("Are you sure you want to delete this student?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/students/${studentId}`);
            setStudents(students.filter((s) => s._id !== studentId));
        } catch (err) {
            console.error("Delete failed", err);
        }
    };

    return (
        <div className="flex">
            <Sidebar />
            <main className="ml-64 flex-1">
                <Navbar />
                <div className="min-h-screen bg-gray-100 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-bold text-gray-800">Student Manager</h2>
                        <button
                            onClick={() => navigate("/studentregister")}
                            className="bg-lime-500 hover:bg-lime-600 text-white px-4 py-2 rounded"
                        >
                            Register New Student
                        </button>
                    </div>

                    {/* Filter */}
                    <div className="mb-6">
                        <label className="mr-2 text-gray-700 font-medium">Filter by Mode:</label>
                        <select
                            value={filterMode}
                            onChange={(e) => setFilterMode(e.target.value)}
                            className="border px-4 py-2 rounded"
                        >
                            <option value="All">All</option>
                            <option value="PureOnline">Pure Online</option>
                            <option value="OnlineClass">Online Class</option>
                            <option value="Offline">Offline</option>
                        </select>
                    </div>

                    {filteredStudents.map((student) => (
                        <div
                            key={student._id}
                            className="bg-white rounded shadow p-4 mb-6 space-y-3"
                        >
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-bold text-lime-600">{student.name}</h3>
                                <span className="text-sm text-gray-500">{student.mode} Mode</span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm text-gray-700">
                                <p><strong>Email:</strong> {student.email}</p>
                                <p><strong>Contact:</strong> {student.contact}</p>

                                <p><strong>Address:</strong> {student.address}</p>
                                <p>
                                    <strong>Aadhaar:</strong>{" "}
                                    {student.aadhaarFile ? (
                                        <a
                                            href={`http://localhost:5000/uploads/${student.aadhaarFile}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-blue-600 underline"
                                        >
                                            View File
                                        </a>
                                    ) : (
                                        "Not uploaded"
                                    )}
                                </p>
                                <p><strong>DOJ:</strong> {student.doj?.split("T")[0]}</p>
                                <p><strong>Duration:</strong> {student.duration}</p>
                                <p><strong>Total Fees:</strong> ₹{student.totalFees}</p>
                            </div>

                            {/* Courses */}
                            {student.courses.map((course, i) => (
                                <div key={i} className="mt-2 text-sm">
                                    <p><strong>Course:</strong> {course.name}</p>
                                    <p><strong>Topics:</strong> {course.selectedTopics.join(", ")}</p>
                                </div>
                            ))}

                            {/* Installments */}
                            <div>
                                <h4 className="font-medium text-gray-800 mt-3 mb-2">Installments:</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                                    {student.installments.map((inst, idx) => (
                                        <label key={idx} className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={inst.paid}
                                                onChange={() => toggleInstallment(student._id, idx)}
                                            />
                                            ₹{inst.amount} — Due: {inst.dueDate?.split("T")[0]}
                                        </label>
                                    ))}
                                </div>
                                <button
                                    onClick={() => generateInvoice(student)}
                                    className="mt-3 px-4 py-1 bg-lime-500 text-white rounded hover:bg-lime-600"
                                >
                                    Generate Invoice
                                </button>
                            </div>

                            {/* Course Completed */}
                            <div className="mt-4">
                                <label className="flex items-center gap-2 text-gray-800 text-sm font-medium">
                                    <input
                                        type="checkbox"
                                        checked={student.courseCompleted}
                                        onChange={() => toggleCourseCompleted(student._id)}
                                    />
                                    Course Completed
                                </label>
                            </div>

                            {/* Delete Button */}
                            <button
                                onClick={() => deleteStudent(student._id)}
                                className="mt-3 px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Delete Student
                            </button>
                            <button
                                onClick={() => navigate(`/studentupdate/${student._id}`)}
                                className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 mt-3"
                            >
                                Edit Student
                            </button>

                        </div>
                    ))}
                    {showInvoice && invoiceData && (
                        <InvoiceTemplate
                            student={invoiceData.student}
                            selectedInstallments={invoiceData.selectedInstallments}
                        />
                    )}

                </div>
            </main>
        </div>

    );

};

export default StudentManager;
