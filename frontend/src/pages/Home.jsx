// src/pages/Home.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CoursesSection from '../components/CoursesSection';
import LearningPath from "../components/LearningPath";
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <Navbar />
            <main className="bg-gray-50">
                <section className="text-center py-20 bg-gradient-to-r from-red-600 to-red-400 text-white">
                    <h1 className="text-4xl font-bold mb-4">Welcome to StarX</h1>
                    <p className="text-xl">Master Full Stack Development, Data Science, and more!</p>
                    <button className="mt-6 px-6 py-2 bg-white text-red-600 font-semibold rounded hover:bg-gray-100">
                        <Link to="/courses" > Explore Courses </Link>
                    </button>
                </section>

                <CoursesSection />
                <LearningPath />
            </main>
            <Footer />
        </>
    );
};

export default Home;
