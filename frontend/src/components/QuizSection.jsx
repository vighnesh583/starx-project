import React, { useState } from "react";

const questions = [
    {
        question: "What is JSX in React?",
        options: ["JavaScript XML", "JavaScript Syntax", "JSON-like syntax", "None"],
        answer: "JavaScript XML"
    },
    {
        question: "Which hook is used for state?",
        options: ["useState", "useEffect", "useContext", "useRef"],
        answer: "useState"
    }
];

const QuizSection = () => {
    const [selected, setSelected] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const handleSelect = (qid, option) => {
        if (!submitted) {
            setSelected({ ...selected, [qid]: option });
        }
    };

    const handleSubmit = () => {
        setSubmitted(true);
    };

    const getScore = () =>
        questions.reduce((score, q, idx) =>
            selected[idx] === q.answer ? score + 1 : score, 0
        );

    return (
        <div>
            <h2 className="text-xl font-bold mb-3">Quick Quiz</h2>
            <div className="space-y-6">
                {questions.map((q, idx) => (
                    <div key={idx} className="bg-white p-4 rounded shadow">
                        <p className="font-semibold mb-2">{q.question}</p>
                        <div className="space-y-1">
                            {q.options.map((option, i) => (
                                <label key={i} className="block">
                                    <input
                                        type="radio"
                                        name={`q-${idx}`}
                                        className="mr-2"
                                        checked={selected[idx] === option}
                                        onChange={() => handleSelect(idx, option)}
                                        disabled={submitted}
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>
                        {submitted && (
                            <p className={`mt-2 ${selected[idx] === q.answer ? "text-green-600" : "text-red-500"}`}>
                                {selected[idx] === q.answer ? "Correct" : `Correct Answer: ${q.answer}`}
                            </p>
                        )}
                    </div>
                ))}
            </div>
            {!submitted ? (
                <button
                    onClick={handleSubmit}
                    className="mt-6 bg-lime-500 hover:bg-lime-600 text-white px-6 py-2 rounded"
                >
                    Submit Quiz
                </button>
            ) : (
                <p className="mt-4 text-lg font-bold text-blue-600">Score: {getScore()} / {questions.length}</p>
            )}
        </div>
    );
};

export default QuizSection;
