import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import {
    Users,
    CheckCircle,
    ClipboardList,
    FileText,
    ArrowDownRight,
    ArrowUpRight,
} from "lucide-react";


const Dashboard = () => {
    const activityData = [
        {
            initials: "AJ",
            name: "Alice Johnson",
            email: "alice.j@example.com",
            activity: "Submitted Assignment",
            course: "Advanced Mathematics",
            date: "Today, 10:30 AM",
            status: "Completed",
            bg: "pink-500",
        },
        {
            initials: "RB",
            name: "Robert Brown",
            email: "robert.b@example.com",
            activity: "Completed Quiz",
            course: "Physics 101",
            date: "Today, 9:15 AM",
            status: "Completed",
            bg: "blue-500",
        },
        {
            initials: "SW",
            name: "Sarah Wilson",
            email: "sarah.w@example.com",
            activity: "Watched Lecture",
            course: "History of Art",
            date: "Yesterday, 4:23 PM",
            status: "In Progress",
            bg: "purple-500",
        },
        {
            initials: "MT",
            name: "Michael Thompson",
            email: "michael.t@example.com",
            activity: "Started Assignment",
            course: "Computer Science",
            date: "Yesterday, 2:40 PM",
            status: "In Progress",
            bg: "green-500",
        },
        {
            initials: "EL",
            name: "Emma Lee",
            email: "emma.l@example.com",
            activity: "Missed Quiz",
            course: "Biology",
            date: "2 days ago",
            status: "Missed",
            bg: "red-500",
        },
    ];

    return (
        <div className="flex bg-gray-50 min-h-screen">
            <Sidebar />
            <main className="ml-64 flex-1">
                <Navbar />
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                        <div className="flex gap-4">
                            <select className="border rounded px-3 py-1 text-sm">
                                <option>This Week</option>
                                <option>Last Week</option>
                            </select>
                            <button className="bg-indigo-600 text-white px-4 py-1.5 rounded text-sm hover:bg-indigo-700">
                                Export
                            </button>
                        </div>
                    </div>

                    {/* Stat cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard
                            title="Total Students"
                            value="248"
                            icon={<Users className="text-indigo-500" />}
                            change="+12%"
                            direction="up"
                            note="from last month"
                            color="text-green-600"
                        />
                        <StatCard
                            title="Course Completion"
                            value="78%"
                            icon={<CheckCircle className="text-green-500" />}
                            change="+5%"
                            direction="up"
                            note="from last week"
                            color="text-green-600"
                        />
                        <StatCard
                            title="Avg. Quiz Score"
                            value="82%"
                            icon={<ClipboardList className="text-blue-500" />}
                            change="-2%"
                            direction="down"
                            note="from last week"
                            color="text-red-600"
                        />
                        <StatCard
                            title="Assignments"
                            value="42"
                            icon={<FileText className="text-purple-500" />}
                            change="+8%"
                            direction="up"
                            note="from last month"
                            color="text-green-600"
                        />
                    </div>

                    {/* Performance & Engagement Charts */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white rounded shadow p-4">
                            <div className="flex justify-between mb-2">
                                <h3 className="font-semibold text-gray-800">Student Performance</h3>
                                <select className="text-sm border px-2 py-1 rounded">
                                    <option>Last 7 Days</option>
                                    <option>Last Month</option>
                                </select>
                            </div>
                            <div className="h-48 flex items-center justify-center text-gray-400">
                                {/* Placeholder */}
                                (Chart Area)
                            </div>
                        </div>
                        <div className="bg-white rounded shadow p-4">
                            <div className="flex justify-between mb-2">
                                <h3 className="font-semibold text-gray-800">Course Engagement</h3>
                                <select className="text-sm border px-2 py-1 rounded">
                                    <option>All Courses</option>
                                    <option>Python</option>
                                    <option>Java</option>
                                </select>
                            </div>
                            <div className="h-48 flex items-center justify-center text-gray-400">
                                {/* Placeholder */}
                                (Chart Area)
                            </div>
                        </div>
                    </div>
                </div>
                {/* Recent Activity Table */}
                <div className="mt-10 bg-white rounded shadow p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
                        <a href="#" className="text-sm text-indigo-600 hover:underline">
                            View All
                        </a>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                            <thead>
                                <tr className="text-left text-gray-500">
                                    <th className="py-2 px-4">Student</th>
                                    <th className="py-2 px-4">Activity</th>
                                    <th className="py-2 px-4">Course</th>
                                    <th className="py-2 px-4">Date</th>
                                    <th className="py-2 px-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {activityData.map((entry, i) => (
                                    <tr key={i} className="hover:bg-gray-50">
                                        <td className="py-3 px-4 flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-full bg-${entry.bg} text-white flex items-center justify-center font-bold text-xs`}>
                                                {entry.initials}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-800">{entry.name}</p>
                                                <p className="text-xs text-gray-500">{entry.email}</p>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4">{entry.activity}</td>
                                        <td className="py-3 px-4">{entry.course}</td>
                                        <td className="py-3 px-4">{entry.date}</td>
                                        <td className="py-3 px-4">
                                            <span
                                                className={`text-xs font-semibold px-2 py-1 rounded-full ${entry.status === "Completed"
                                                    ? "bg-green-100 text-green-600"
                                                    : entry.status === "In Progress"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : "bg-red-100 text-red-600"
                                                    }`}
                                            >
                                                {entry.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>


        </div>
    );
};

const StatCard = ({ title, value, icon, change, direction, note, color }) => (
    <div className="bg-white rounded shadow p-4 flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <h2 className="text-xl font-bold text-gray-800">{value}</h2>
            <div className="flex items-center text-xs mt-1">
                {direction === "up" ? (
                    <ArrowUpRight size={14} className={`${color} mr-1`} />
                ) : (
                    <ArrowDownRight size={14} className={`${color} mr-1`} />
                )}
                <span className={`${color} font-medium`}>{change}</span>
                <span className="ml-1 text-gray-500">{note}</span>
            </div>
        </div>
    </div>
);

export default Dashboard;
