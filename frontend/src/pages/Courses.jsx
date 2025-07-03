import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import InfoIcon from "@mui/icons-material/Info";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const courses = [
    {
        icon: "https://cdn-icons-png.flaticon.com/512/2736/2736639.png", // Replace with appropriate icons or use MUI
        title: "Data Science & Analytics with AI",
        desc: "Analyze real-world data and build smart AI models using Python, SQL, ML, and industry-standard tools. Perfect for roles like Data Analyst and AI Engineer.",
        highlights: ["Tesseract OCR", "Tableau", "NumPy", "Tensorflow", "Excel"],

    },
    {
        icon: "https://cdn-icons-png.flaticon.com/512/5968/5968350.png",
        title: "Python Full Stack Development",
        desc: "Build scalable web apps using Django, REST APIs, and modern front-end tech. Become a confident full-stack Python developer.",
        highlights: ["AWS", "Python", "JavaScript", "CSS", "HTML"],
        pdfName: "python-course.pdf",

    },
    {
        icon: "https://cdn-icons-png.flaticon.com/512/226/226777.png",
        title: "Java Full Stack Development",
        desc: "Master Java, Spring Boot, and front-end tools to build enterprise-grade applications. Ideal for backend-heavy roles.",
        highlights: ["AWS", "Java", "JavaScript", "CSS", "HTML"],
    },
    {
        icon: "https://cdn-icons-png.flaticon.com/512/1055/1055687.png",
        title: "Front-End Development",
        desc: "Design stunning, responsive web interfaces using HTML, CSS, JavaScript, and modern libraries like React. Build websites users love to interact with.",
        highlights: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"],
    },
    {
        icon: "https://cdn-icons-png.flaticon.com/512/833/833439.png",
        title: "Cloud Computing & DevOps",
        desc: "Learn how to deploy, monitor, and scale applications on the cloud using AWS, Docker, and CI/CD pipelines. Get ready for roles in modern IT infrastructure.",
        highlights: ["AWS", "Docker", "Kubernetes", "CI/CD", "Azure"],
    },
    {
        icon: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
        title: "UI/UX Design",
        desc: "Create visually appealing and user-friendly designs. Master Figma, user research, wireframing, and prototyping for apps and websites.",
        highlights: ["Figma", "Prototyping", "Wireframing", "User Research", "Design Systems"],
    },
    {
        icon: "https://cdn-icons-png.flaticon.com/512/2942/2942885.png",
        title: "Cyber Security",
        desc: "Understand network security, ethical hacking, and tools to prevent cyber attacks. Train for real-world penetration testing and security roles.",
        highlights: ["Ethical Hacking", "Kali Linux", "Firewall", "Networking", "OWASP"],
    },
    {
        icon: "https://cdn-icons-png.flaticon.com/512/4299/4299927.png",
        title: "MERN Stack Development",
        desc: "Build full-stack web apps using MongoDB, Express.js, React.js, and Node.js. Ideal for building modern, scalable apps end-to-end.",
        highlights: ["MongoDB", "Express", "React", "Node.js", "REST API"],
    },
    {
        icon: "https://cdn-icons-png.flaticon.com/512/906/906361.png",
        title: "Mobile App Development",
        desc: "Create cross-platform mobile apps using Flutter and React Native. Learn how to build, test, and publish apps on Android & iOS stores.",
        highlights: ["Flutter", "React Native", "Dart", "Play Store", "App Store"],
    },

];

const Courses = () => {
    const navigate = useNavigate();

    const handleDownloadClick = (pdfName) => {
        navigate("/download", { state: { pdfName } });
    }
    return (
        <>
            <Navbar />
            <section className="bg-gray-100 py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-center mb-12 text-gray-800">
                        Our Popular Courses
                    </h1>

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {courses.map((course, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:shadow-xl transition-all duration-300"
                            >
                                <div>
                                    <img
                                        src={course.icon}
                                        alt="icon"
                                        className="w-10 h-10 mb-4"
                                    />
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                                        {course.title}
                                    </h3>
                                    <p className="text-gray-700 text-sm mb-4">{course.desc}</p>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {course.highlights.map((tag, idx) => (
                                            <span
                                                key={idx}
                                                className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full border"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="border-t pt-4 mt-4 flex justify-between gap-2">
                                    <button className="flex items-center gap-2 border px-4 py-2 rounded text-sm font-medium text-gray-800 hover:bg-gray-100" onClick={() => handleDownloadClick(course.pdfName)}>
                                        <CloudDownloadIcon className="text-black" />  Download Brochure
                                    </button>
                                    <button className="flex items-center gap-2 bg-lime-400 hover:bg-lime-500 text-white px-4 py-2 rounded text-sm font-medium" onClick={() => handleDownloadClick(course.pdfName)} >
                                        <InfoIcon /> Know More
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Courses;
