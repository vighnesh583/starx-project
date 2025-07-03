import React, { useState, useEffect } from "react";

const NotesSection = () => {
    const [notes, setNotes] = useState("");

    useEffect(() => {
        const savedNotes = localStorage.getItem("studentNotes");
        if (savedNotes) {
            setNotes(savedNotes);
        }
    }, []);

    const handleChange = (e) => {
        setNotes(e.target.value);
        localStorage.setItem("studentNotes", e.target.value);
    };

    return (
        <div className="mt-10">
            <h2 className="text-xl font-bold mb-2">My Notes</h2>
            <textarea
                className="w-full min-h-[150px] p-4 border rounded shadow focus:outline-none focus:ring-2 focus:ring-lime-400 text-sm"
                value={notes}
                onChange={handleChange}
                placeholder="Write your thoughts, doubts, or important points here..."
            />
        </div>
    );
};

export default NotesSection;
