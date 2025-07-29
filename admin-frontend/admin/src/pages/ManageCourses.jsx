// import React, { useEffect, useState } from "react";
// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";
// import axios from "axios";

// const ManageCourses = () => {
//     const [courses, setCourses] = useState([]);
//     const [error, setError] = useState("");

//     useEffect(() => {
//         fetchCourses();
//     }, []);

//     const fetchCourses = async () => {
//         try {
//             const res = await axios.get("http://localhost:5000/api/courses");
//             setCourses(res.data);
//         } catch (err) {
//             setError("Failed to load courses."(err));
//         }
//     };

//     const handleDelete = async (type, courseId, topicId, contentId) => {
//         try {
//             await axios.delete(`http://localhost:5000/api/${type}/${contentId}`);
//             fetchCourses(); // Refresh list
//         } catch (err) {
//             alert("Failed to delete."(err));
//         }
//     };

//     return (
//         <div className="flex">
//             <Sidebar />
//             <main className="ml-64 flex-1">
//                 <Navbar />
//                 <div className="p-6">
//                     <h2 className="text-2xl font-bold mb-4 text-gray-800">Manage Courses</h2>
//                     {error && <p className="text-red-600 mb-4">{error}</p>}

//                     {courses.map((course) => (
//                         <div key={course.id} className="mb-6 bg-white rounded shadow p-4">
//                             <h3 className="text-xl font-semibold text-lime-600">{course.name}</h3>

//                             {course.topics.map((topic) => (
//                                 <div key={topic.id} className="mt-4 pl-4 border-l-4 border-lime-400">
//                                     <h4 className="text-lg font-semibold mb-2 text-gray-700">
//                                         Topic: {topic.name}
//                                     </h4>

//                                     {/* Videos */}
//                                     {topic.videos?.length > 0 && (
//                                         <div className="mb-3">
//                                             <h5 className="font-medium text-gray-600 mb-1">Videos:</h5>
//                                             <ul className="ml-4 space-y-1 text-sm text-gray-700">
//                                                 {topic.videos.map((vid) => (
//                                                     <li
//                                                         key={vid.id}
//                                                         className="flex justify-between items-center bg-gray-50 p-2 rounded"
//                                                     >
//                                                         <span>{vid.title}</span>
//                                                         <div className="space-x-2">
//                                                             <button
//                                                                 className="text-blue-600 hover:underline text-sm"
//                                                                 onClick={() => alert("Edit not implemented")}
//                                                             >
//                                                                 Edit
//                                                             </button>
//                                                             <button
//                                                                 className="text-red-600 hover:underline text-sm"
//                                                                 onClick={() => handleDelete("videos", course.id, topic.id, vid.id)}
//                                                             >
//                                                                 Delete
//                                                             </button>
//                                                         </div>
//                                                     </li>
//                                                 ))}
//                                             </ul>
//                                         </div>
//                                     )}

//                                     {/* Quizzes */}
//                                     {topic.quizzes?.length > 0 && (
//                                         <div className="mb-3">
//                                             <h5 className="font-medium text-gray-600 mb-1">Quizzes:</h5>
//                                             <ul className="ml-4 space-y-1 text-sm text-gray-700">
//                                                 {topic.quizzes.map((quiz) => (
//                                                     <li
//                                                         key={quiz.id}
//                                                         className="flex justify-between items-center bg-gray-50 p-2 rounded"
//                                                     >
//                                                         <span>{quiz.questionCount} questions</span>
//                                                         <div className="space-x-2">
//                                                             <button
//                                                                 className="text-blue-600 hover:underline text-sm"
//                                                                 onClick={() => alert("Edit not implemented")}
//                                                             >
//                                                                 Edit
//                                                             </button>
//                                                             <button
//                                                                 className="text-red-600 hover:underline text-sm"
//                                                                 onClick={() => handleDelete("quizzes", course.id, topic.id, quiz.id)}
//                                                             >
//                                                                 Delete
//                                                             </button>
//                                                         </div>
//                                                     </li>
//                                                 ))}
//                                             </ul>
//                                         </div>
//                                     )}

//                                     {/* Assignments */}
//                                     {topic.assignments?.length > 0 && (
//                                         <div className="mb-2">
//                                             <h5 className="font-medium text-gray-600 mb-1">Assignments:</h5>
//                                             <ul className="ml-4 space-y-1 text-sm text-gray-700">
//                                                 {topic.assignments.map((assn) => (
//                                                     <li
//                                                         key={assn.id}
//                                                         className="flex justify-between items-center bg-gray-50 p-2 rounded"
//                                                     >
//                                                         <span>{assn.title}</span>
//                                                         <div className="space-x-2">
//                                                             <button
//                                                                 className="text-blue-600 hover:underline text-sm"
//                                                                 onClick={() => alert("Edit not implemented")}
//                                                             >
//                                                                 Edit
//                                                             </button>
//                                                             <button
//                                                                 className="text-red-600 hover:underline text-sm"
//                                                                 onClick={() =>
//                                                                     handleDelete("assignments", course.id, topic.id, assn.id)
//                                                                 }
//                                                             >
//                                                                 Delete
//                                                             </button>
//                                                         </div>
//                                                     </li>
//                                                 ))}
//                                             </ul>
//                                         </div>
//                                     )}
//                                 </div>
//                             ))}
//                         </div>
//                     ))}
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default ManageCourses;

import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

// Demo JSON Data
const demoData = [
    {
        id: "course1",
        name: "React",
        topics: [
            {
                id: "t1",
                name: "Hooks",
                videos: [{ id: "v1", title: "useEffect", url: "https://youtu.be/0ZJgIjIuY7U" }],
                quizzes: [{ id: "q1", questionCount: 5 }],
                assignments: [{ id: "a1", title: "Hooks Assignment" }],
            },
            {
                id: "t2",
                name: "Routing",
                videos: [{ id: "v2", title: "React Router", url: "https://youtu.be/Law7wfdg_ls" }],
                quizzes: [],
                assignments: [],
            },
        ],
    },
    {
        id: "course2",
        name: "Python",
        topics: [
            {
                id: "t3",
                name: "Functions",
                videos: [{ id: "v3", title: "Def Functions", url: "" }],
                quizzes: [{ id: "q2", questionCount: 3 }],
                assignments: [{ id: "a2", title: "Function Task" }],
            },
        ],
    },
];

const ManageCoursesDemo = () => {
    const [courses, setCourses] = useState(demoData);
    const [selectedCourse, setSelectedCourse] = useState("");
    const [selectedTopic, setSelectedTopic] = useState("");

    const getCourse = () => courses.find((c) => c.id === selectedCourse);
    const getTopic = () => getCourse()?.topics.find((t) => t.id === selectedTopic);

    const handleDelete = (type, contentId) => {
        const updatedCourses = courses.map((course) => {
            if (course.id !== selectedCourse) return course;
            const updatedTopics = course.topics.map((topic) => {
                if (topic.id !== selectedTopic) return topic;
                return {
                    ...topic,
                    [type]: topic[type].filter((item) => item.id !== contentId),
                };
            });
            return { ...course, topics: updatedTopics };
        });
        setCourses(updatedCourses);
    };

    return (
        <div className="flex">
//             <Sidebar />
//             <main className="ml-64 flex-1">
//                 <Navbar />
                <div className="min-h-screen bg-gray-100 p-6 max-w-5xl mx-auto">

                    <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Courses</h1>

                    {/* Course Selector */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Select Course</label>
                        <select
                            value={selectedCourse}
                            onChange={(e) => {
                                setSelectedCourse(e.target.value);
                                setSelectedTopic(""); // reset topic
                            }}
                            className="border px-4 py-2 rounded w-full md:w-1/2"
                        >
                            <option value="">-- Choose a course --</option>
                            {courses.map((course) => (
                                <option key={course.id} value={course.id}>
                                    {course.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Topic Selector */}
                    {selectedCourse && (
                        <div className="mb-6">
                            <label className="block text-gray-700 mb-1">Select Topic</label>
                            <select
                                value={selectedTopic}
                                onChange={(e) => setSelectedTopic(e.target.value)}
                                className="border px-4 py-2 rounded w-full md:w-1/2"
                            >
                                <option value="">-- Choose a topic --</option>
                                {getCourse()?.topics.map((topic) => (
                                    <option key={topic.id} value={topic.id}>
                                        {topic.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Content Display */}
                    {selectedTopic && (
                        <div className="bg-white rounded shadow p-6 space-y-6">
                            <h2 className="text-xl font-bold text-lime-600">
                                {getCourse().name} ➝ {getTopic().name}
                            </h2>

                            {/* Videos */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">Videos</h3>
                                {getTopic().videos.length === 0 ? (
                                    <p className="text-sm text-gray-500">No videos added.</p>
                                ) : (
                                    <ul className="space-y-2">
                                        {getTopic().videos.map((video) => (
                                            <li
                                                key={video.id}
                                                className="flex justify-between items-center bg-gray-50 p-3 rounded"
                                            >
                                                <span>{video.title}</span>
                                                <div className="space-x-2">
                                                    <button
                                                        onClick={() => alert(`Edit video: ${video.id}`)}
                                                        className="text-blue-600 text-sm hover:underline"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete("videos", video.id)}
                                                        className="text-red-600 text-sm hover:underline"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            {/* Quizzes */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">Quizzes</h3>
                                {getTopic().quizzes.length === 0 ? (
                                    <p className="text-sm text-gray-500">No quizzes added.</p>
                                ) : (
                                    <ul className="space-y-2">
                                        {getTopic().quizzes.map((quiz) => (
                                            <li
                                                key={quiz.id}
                                                className="flex justify-between items-center bg-gray-50 p-3 rounded"
                                            >
                                                <span>{quiz.questionCount} Questions</span>
                                                <div className="space-x-2">
                                                    <button
                                                        onClick={() => alert(`Edit quiz: ${quiz.id}`)}
                                                        className="text-blue-600 text-sm hover:underline"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete("quizzes", quiz.id)}
                                                        className="text-red-600 text-sm hover:underline"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            {/* Assignments */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">Assignments</h3>
                                {getTopic().assignments.length === 0 ? (
                                    <p className="text-sm text-gray-500">No assignments added.</p>
                                ) : (
                                    <ul className="space-y-2">
                                        {getTopic().assignments.map((assn) => (
                                            <li
                                                key={assn.id}
                                                className="flex justify-between items-center bg-gray-50 p-3 rounded"
                                            >
                                                <span>{assn.title}</span>
                                                <div className="space-x-2">
                                                    <button
                                                        onClick={() => alert(`Edit assignment: ${assn.id}`)}
                                                        className="text-blue-600 text-sm hover:underline"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete("assignments", assn.id)}
                                                        className="text-red-600 text-sm hover:underline"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    )}
                </div >
            </main>
        </div >

    );
};

export default ManageCoursesDemo;
