import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const navLinks = (
        <>
            <li><Link to="/" className="hover:text-red-600" onClick={() => setIsOpen(false)}>Home</Link></li>
            <li><Link to="/courses" className="hover:text-red-600" onClick={() => setIsOpen(false)}>Courses</Link></li>
            <li><Link to="/placements" className="hover:text-red-600" onClick={() => setIsOpen(false)}>Placements</Link></li>
            <li><Link to="/about" className="hover:text-red-600" onClick={() => setIsOpen(false)}>About</Link></li>
            <li><Link to="/contact" className="hover:text-red-600" onClick={() => setIsOpen(false)}>Contact</Link></li>
            <li><Link to="/login" className="hover:text-red-600" onClick={() => setIsOpen(false)}>Learn</Link></li>
        </>
    );

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="text-xl font-bold text-red-600">StarX</Link>

                {/* Desktop Menu */}
                <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
                    {navLinks}
                </ul>

                {/* Mobile Hamburger */}
                <button
                    className="md:hidden text-3xl text-gray-700 focus:outline-none"
                    onClick={toggleMenu}
                >
                    {isOpen ? '✕' : '☰'}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <ul className="md:hidden bg-white px-4 py-4 space-y-3 text-gray-700 font-medium border-t">
                    {navLinks}
                </ul>
            )}
        </nav>
    );
};

export default Navbar;
