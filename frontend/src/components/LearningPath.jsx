import React from "react";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import PeopleIcon from "@mui/icons-material/People";
import BadgeIcon from "@mui/icons-material/Badge";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import SchoolIcon from "@mui/icons-material/School";

const steps = [
    {
        id: "01",
        step: "Step:1",
        title: "Follow 3A",
        desc: "Focuses on Attendance, Assignment & Assessment for consistent success.",
        icon: <AssignmentTurnedInIcon fontSize="medium" className="text-white" />,
    },
    {
        id: "02",
        step: "Step:2",
        title: "Industry-Specific Skills",
        desc: "Hands-on with tools tailored to high-demand data & dev roles.",
        icon: <PeopleIcon fontSize="medium" className="text-white" />,
    },
    {
        id: "03",
        step: "Step:3",
        title: "Profile Building",
        desc: "Resume, LinkedIn, web portfolio to market yourself.",
        icon: <BadgeIcon fontSize="medium" className="text-white" />,
    },
    {
        id: "04",
        step: "Step:4",
        title: "Exam",
        desc: "Final assessment to test real-world tech readiness.",
        icon: <FactCheckIcon fontSize="medium" className="text-white" />,
    },
    {
        id: "05",
        step: "Step:5",
        title: "Global Certification",
        desc: "Get globally valid, job-ready certifications.",
        icon: <WorkspacePremiumIcon fontSize="medium" className="text-white" />,
    },
    {
        id: "06",
        step: "Step:6",
        title: "Integrated Internship",
        desc: "Apply your skills with real projects and mentoring.",
        icon: <SchoolIcon fontSize="medium" className="text-white" />,
    },
];

const LearningJourney = () => {
    return (
        <section className="bg-gray-900 py-10 px-4 text-white">
            <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Your Learning Journey</h2>
                <p className="text-gray-400 text-sm md:text-base">Track your steps from beginner to professional</p>
            </div>

            <div className="relative max-w-5xl mx-auto">
                <div className="border-l-2 border-dashed border-lime-400 absolute left-1/2 transform -translate-x-1/2 h-full z-0" />

                <div className="space-y-8 relative z-10">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className={`flex items-center justify-between gap-6 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                                }`}
                        >
                            <div className="w-1/2">
                                <div className="bg-white text-gray-800 p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.03]">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="bg-red-600 p-2 rounded-full">{step.icon}</div>
                                        <h3 className="text-lg font-semibold">{step.title}</h3>
                                    </div>
                                    <p className="text-sm text-gray-600">{step.desc}</p>
                                </div>
                            </div>
                            <div className="ml-0 mr-0 font-bold text-lime-500 text-2xl">{step.step}</div>
                            <div className="w-5 h-5 bg-lime-400 rounded-full border-4 border-gray-900 z-20"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LearningJourney;
