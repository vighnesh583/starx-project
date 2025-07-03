import React from "react";
import { NavLink } from "react-router-dom";
import {
    Video,
    BookOpen,
    FilePlus,
    Users,
    BarChart2,
    LayoutDashboard,
    ClipboardList
} from "lucide-react";

const Sidebar = () => {
    return (
        <aside className="w-64 h-screen bg-gray-900 text-white fixed left-0 top-0 p-6 space-y-6">
            <h1 className="text-2xl font-bold mb-8 text-center text-lime-400">StarX Admin</h1>

            <nav className="space-y-4">
                <NavLink to="/" className="flex items-center gap-3 hover:text-lime-400">
                    <LayoutDashboard /> Dashboard
                </NavLink>
                <NavLink to="/add-video" className="flex items-center gap-3 hover:text-lime-400">
                    <Video /> Add Video
                </NavLink>
                <NavLink to="/add-quiz" className="flex items-center gap-3 hover:text-lime-400">
                    <ClipboardList /> Add Quiz
                </NavLink>
                <NavLink to="/add-assignment" className="flex items-center gap-3 hover:text-lime-400">
                    <FilePlus /> Add Assignment
                </NavLink>
                <NavLink to="/manage-courses" className="flex items-center gap-3 hover:text-lime-400">
                    <BookOpen /> Manage Courses
                </NavLink>
                <NavLink to="/students" className="flex items-center gap-3 hover:text-lime-400">
                    <Users /> Student Manager
                </NavLink>
                <NavLink to="/progress" className="flex items-center gap-3 hover:text-lime-400">
                    <BarChart2 /> Progress Tracker
                </NavLink>
            </nav>
        </aside>
    );
};

export default Sidebar;
