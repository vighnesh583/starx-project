import React from "react";

const assignments = [
    {
        title: "Assignment 1: React Basics",
        file: "/assignments/react-basics.pdf"
    },
    {
        title: "Assignment 2: Component Tree",
        file: "/assignments/component-tree.pdf"
    }
];

const AssignmentList = () => {
    return (
        <div className="mb-8">
            <h2 className="text-xl font-bold mb-3">Assignments</h2>
            <ul className="space-y-3">
                {assignments.map((item, idx) => (
                    <li key={idx} className="bg-white p-4 rounded shadow hover:bg-gray-50">
                        <a href={item.file} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                            {item.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AssignmentList;
