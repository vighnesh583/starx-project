import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";

const AddQuiz = () => {
    const [quizInfo, setQuizInfo] = useState({
        course: "",
        topic: "",
        questions: [
            {
                question: "",
                options: ["", "", "", ""],
                correctAnswer: "",
            },
        ],
    });

    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setQuizInfo({ ...quizInfo, [e.target.name]: e.target.value });
    };

    const handleQuestionChange = (index, field, value) => {
        const updated = [...quizInfo.questions];
        updated[index][field] = value;
        setQuizInfo({ ...quizInfo, questions: updated });
    };

    const handleOptionChange = (qIndex, optIndex, value) => {
        const updated = [...quizInfo.questions];
        updated[qIndex].options[optIndex] = value;
        setQuizInfo({ ...quizInfo, questions: updated });
    };

    const addNewQuestion = () => {
        setQuizInfo({
            ...quizInfo,
            questions: [
                ...quizInfo.questions,
                { question: "", options: ["", "", "", ""], correctAnswer: "" },
            ],
        });
    };

    const deleteQuestion = (index) => {
        const updated = quizInfo.questions.filter((_, i) => i !== index);
        setQuizInfo({ ...quizInfo, questions: updated });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { course, topic, questions } = quizInfo;

        if (!course || !topic || questions.length === 0) {
            setError("Please fill all fields and add at least one question.");
            return;
        }

        try {
            await axios.post("http://localhost:5000/api/quizzes/add", quizInfo);
            setSuccess("Quiz added successfully!");
            setError("");
            setQuizInfo({
                course: "",
                topic: "",
                questions: [{ question: "", options: ["", "", "", ""], correctAnswer: "" }],
            });
        } catch (err) {
            setError("Failed to add quiz."(err));
            setSuccess("");
        }
    };

    return (
        <div className="flex">
            <Sidebar />
            <main className="ml-64 flex-1">
                <Navbar />
                <div className="p-6 max-w-4xl">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Quiz</h2>

                    {success && <p className="text-green-600 mb-4">{success}</p>}
                    {error && <p className="text-red-600 mb-4">{error}</p>}

                    <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow p-6 rounded-lg">
                        {/* Course & Topic */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 mb-1">Course</label>
                                <input
                                    type="text"
                                    name="course"
                                    value={quizInfo.course}
                                    onChange={handleChange}
                                    placeholder="e.g. React, Python"
                                    className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-lime-400"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-1">Topic</label>
                                <input
                                    type="text"
                                    name="topic"
                                    value={quizInfo.topic}
                                    onChange={handleChange}
                                    placeholder="e.g. Hooks, Loops, Variables"
                                    className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-lime-400"
                                />
                            </div>
                        </div>

                        {/* Quiz Questions */}
                        <div className="space-y-8">
                            {quizInfo.questions.map((q, i) => (
                                <div key={i} className="border rounded p-4 bg-gray-50 relative">
                                    <label className="block font-medium mb-2 text-gray-700">
                                        Question {i + 1}
                                    </label>
                                    <input
                                        type="text"
                                        value={q.question}
                                        onChange={(e) => handleQuestionChange(i, "question", e.target.value)}
                                        placeholder="Enter the question"
                                        className="w-full border px-4 py-2 rounded mb-4"
                                    />

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {q.options.map((opt, j) => (
                                            <input
                                                key={j}
                                                type="text"
                                                value={opt}
                                                onChange={(e) => handleOptionChange(i, j, e.target.value)}
                                                placeholder={`Option ${j + 1}`}
                                                className="w-full border px-4 py-2 rounded"
                                            />
                                        ))}
                                    </div>

                                    <div className="mt-4">
                                        <label className="block text-sm text-gray-600 mb-1">
                                            Correct Answer
                                        </label>
                                        <select
                                            value={q.correctAnswer}
                                            onChange={(e) =>
                                                handleQuestionChange(i, "correctAnswer", e.target.value)
                                            }
                                            className="w-full border px-3 py-2 rounded"
                                        >
                                            <option value="">Select Correct Option</option>
                                            {q.options.map((opt, idx) => (
                                                <option key={idx} value={opt}>
                                                    {opt || `Option ${idx + 1}`}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {quizInfo.questions.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => deleteQuestion(i)}
                                            className=" border-solid border-black border p-0.5 absolute top-2 right-2 text-red-500 text-sm bg-white w-20 h-9 rounded-[10%] hover:rounded-[35%] transition-all duration-300 shadow"
                                        >
                                            🗑 Delete
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={addNewQuestion}
                            className="mt-2 px-4 py-2 border rounded text-lime-600 hover:bg-lime-50"
                        >
                            + Add Another Question
                        </button>

                        <button
                            type="submit"
                            className="bg-lime-500 hover:bg-lime-600 text-white px-6 py-2 rounded block mt-6"
                        >
                            Submit Quiz
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default AddQuiz;
