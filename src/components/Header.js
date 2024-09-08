"use client";
import Link from 'next/link';
import React, { useState } from 'react';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="bg-gray-800 text-white py-4 sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center px-4">
                <div className="text-2xl font-bold">
                    <Link href="/">ADDA-CRS</Link>
                </div>
                <nav className="hidden md:flex space-x-6">
                    <Link href="/" className="hover:text-gray-400">Home</Link>
                    <Link href="/#about" className="hover:text-gray-400">About</Link>
                    <Link href="/#services" className="hover:text-gray-400">Services</Link>
                    <Link href="/login" className="hover:text-gray-400">Login</Link>
                    <Link href="/signup" className="hover:text-gray-400">Signup</Link>
                </nav>
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
                        </svg>
                    </button>
                </div>
            </div>
            {isOpen && (
                <nav className="md:hidden">
                    <ul className="flex flex-col items-center space-y-4 py-4 bg-gray-700 mt-4">
                        <li>
                            <Link href="/" className="hover:text-gray-400" onClick={toggleMenu}>Home</Link>
                        </li>
                        <li>
                            <Link href="/#about" className="hover:text-gray-400" onClick={toggleMenu}>About</Link>
                        </li>
                        <li>
                            <Link href="/#services" className="hover:text-gray-400" onClick={toggleMenu}>Services</Link>
                        </li>
                        <li>
                            <Link href="/login" className="hover:text-gray-400" onClick={toggleMenu}>Login</Link>
                        </li>
                        <li>
                            <Link href="/signup" className="hover:text-gray-400" onClick={toggleMenu}>Signup</Link>
                        </li>
                    </ul>
                </nav>
            )}
        </header>
    );
};

export default Header;
