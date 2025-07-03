import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import VideoPlayer from "../components/VideoPlayer";
import AssignmentList from "../components/AssignmentList";
import QuizSection from "../components/QuizSection";
import LessonSidebar from "../components/LessonSidebar";
import NotesSection from "../components/NotesSection";

const LessonPage = () => {
    return (
        <>
            <Navbar />
            <div className="flex flex-col lg:flex-row bg-gray-50 min-h-screen">
                <LessonSidebar />
                <main className="flex-1 p-6">
                    <VideoPlayer videoUrl="https://www.w3schools.com/html/mov_bbb.mp4" />
                    <AssignmentList />
                    <QuizSection />
                    <NotesSection />
                </main>
            </div>
            <Footer />
        </>
    );
};

export default LessonPage;
