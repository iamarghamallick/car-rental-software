import Link from 'next/link';
import React from 'react';

const Header = () => {
    return (
        <header className="bg-gray-800 text-white py-4 sticky top-0">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-2xl font-bold">
                    ADDA-CRS
                </div>
                <nav>
                    <ul className="flex space-x-6">
                        <li>
                            <Link href="/" className="hover:text-gray-400">Home</Link>
                        </li>
                        <li>
                            <Link href="/#about" className="hover:text-gray-400">About</Link>
                        </li>
                        <li>
                            <Link href="/#services" className="hover:text-gray-400">Services</Link>
                        </li>
                        <li>
                            <Link href="/login" className="hover:text-gray-400">Login</Link>
                        </li>
                        <li>
                            <Link href="/signup" className="hover:text-gray-400">Signup</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
