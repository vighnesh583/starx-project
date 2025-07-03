// src/components/CoursesSection.jsx
import React from "react";
import SchoolIcon from "@mui/icons-material/School";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import CodeIcon from "@mui/icons-material/Code";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import InfoIcon from "@mui/icons-material/Info";
import { Link } from 'react-router-dom';

const courses = [
    {
        icon: <AutoGraphIcon fontSize="large" className="text-red-600" />,
        title: "Data Science & Analytics with AI",
        description:
            "Analyze data and build AI models using Python, SQL, and machine learning techniques.",
        highlights: ["Tesseract OCR", "Tableau", "NumPy", "Tensorflow", "Excel"],
    },
    {
        icon: <CodeIcon fontSize="large" className="text-red-600" />,
        title: "Python Full Stack Development",
        description:
            "Build dynamic web applications using Python, Django, and front-end technologies.",
        highlights: ["AWS", "Python", "JavaScript", "CSS", "HTML"],
    },
    {
        icon: <SchoolIcon fontSize="large" className="text-red-600" />,
        title: "Java Full Stack Development",
        description:
            "Develop robust applications with Java, Spring Boot, and modern front-end tools.",
        highlights: ["AWS", "Java", "JavaScript", "CSS", "HTML"],
    },
];

const CoursesSection = () => {
    return (
        <section className="container mx-auto py-16 px-4">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
                Our Top Courses
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
                {courses.map((course, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-md hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden flex flex-col justify-between"
                    >
                        <div className="p-6">
                            <div className="mb-4">{course.icon}</div>
                            <h3 className="text-xl font-bold mb-2 text-gray-800">{course.title}</h3>
                            <p className="text-sm text-gray-600 mb-4">{course.description}</p>

                            <div className="flex flex-wrap gap-2 mt-4">
                                {course.highlights.map((item, i) => (
                                    <span
                                        key={i}
                                        className="text-xs bg-gray-100 border border-gray-300 px-2 py-1 rounded-full text-gray-700"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="px-6 py-4 border-t flex justify-between items-center">
                            <button className="flex items-center gap-1 text-sm px-3 py-1 border rounded hover:bg-gray-100">
                                <CloudDownloadIcon fontSize="small" />
                                Download Brochure
                            </button>
                            <button className="flex items-center gap-1 text-sm px-3 py-1 bg-lime-400 hover:bg-lime-500 text-white font-medium rounded mx-3">
                                <InfoIcon fontSize="small" />
                                <Link to="/courses" > Know More</Link>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CoursesSection;
