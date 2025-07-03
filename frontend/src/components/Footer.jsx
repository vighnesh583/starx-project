// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white mt-10">
            <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h2 className="font-bold text-lg mb-2">StarX</h2>
                    <p>Empowering students with industry-relevant IT training.</p>
                </div>
                <div>
                    <h2 className="font-bold text-lg mb-2">Quick Links</h2>
                    <ul>
                        <li><Link to="/courses" className="hover:text-red-500">Courses</Link></li>
                        <li><Link to="/placements" className="hover:text-red-500">Placements</Link></li>
                        <li><Link to="" className="hover:text-red-500">FAQs</Link></li>
                    </ul>
                </div>
                <div>
                    <h2 className="font-bold text-lg mb-2">Contact</h2>
                    <p>Email: info@starxinnovation.com</p>
                    <p>Phone: +91 12345 67890</p>
                </div>
            </div>
            <div className="text-center py-4 bg-gray-900">
                &copy; {new Date().getFullYear()} StarXInnovation. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
