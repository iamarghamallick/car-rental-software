import React from 'react';

const Footer = () => {
    const CRS_TITLE = "WeDrive";

    return (
        <footer className="bg-gradient-to-r from-gray-900 via-indigo-700 to-purple-900 text-white py-4">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} {CRS_TITLE} - All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
