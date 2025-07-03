import React from "react";

const lessons = [
    "Introduction",
    "JSX & Components",
    "Props & State",
    "Hooks Overview",
    "Assignment 1",
    "Quiz 1"
];

const LessonSidebar = () => {
    return (
        <aside className="bg-white w-full lg:w-64 p-4 border-r border-gray-200">
            <h3 className="text-lg font-bold mb-4 text-red-600">Lesson Progress</h3>
            <ul className="space-y-3 text-gray-700 text-sm">
                {lessons.map((lesson, i) => (
                    <li key={i} className="hover:text-red-500 cursor-pointer">{lesson}</li>
                ))}
            </ul>
        </aside>
    );
};

export default LessonSidebar;
