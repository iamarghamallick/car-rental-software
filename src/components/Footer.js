import React from 'react';

const Footer = () => {
    const CRS_TITLE = "WeDrive";

    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} {CRS_TITLE} - All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
