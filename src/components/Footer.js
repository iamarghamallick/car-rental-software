import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGooglePlay, FaApple, FaDesktop } from "react-icons/fa";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: <FaFacebook />, url: "#", label: "Facebook" },
        { icon: <FaTwitter />, url: "#", label: "Twitter" },
        { icon: <FaInstagram />, url: "#", label: "Instagram" },
        { icon: <FaLinkedin />, url: "#", label: "LinkedIn" }
    ];

    const appLinks = [
        { icon: <FaGooglePlay />, url: "/APPS/Android/WeDrive.apk", download: "/APPS/Android/WeDrive.apk", label: "Get it for Android", platform: "Android" },
        { icon: <FaApple />, url: "/APPS/IOS/next-steps.html", download: "/APPS/IOS/next-steps.html", label: "Download on App Store", platform: "iOS" },
        { icon: <FaDesktop />, url: "/APPS/Windows/readme.html", download: "/APPS/Windows/readme.html", label: "Download Desktop App", platform: "Desktop" }
    ];

    return (
        <footer className="bg-gradient-to-r from-gray-900 via-indigo-700 to-purple-900 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold mb-4">About Us</h3>
                        <p className="text-gray-300">Experience the freedom of premium car rentals with our extensive fleet and exceptional service.</p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Locations</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Terms & Conditions</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Privacy Policy</a></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
                        <div className="flex space-x-4">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.url}
                                    aria-label={social.label}
                                    className="text-gray-300 hover:text-white transform hover:scale-110 transition-all duration-300"
                                >
                                    <span className="text-2xl">{social.icon}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-bold mb-4">Download Our App</h3>
                        <div className="space-y-3">
                            {appLinks.map((app, index) => (
                                <a
                                    key={index}
                                    href={app.url}
                                    aria-label={app.label}
                                    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300"
                                >
                                    <span className="text-xl">{app.icon}</span>
                                    <span>{app.platform}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-700">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-300 text-sm">
                            © {currentYear} WeDrive CRS. All Rights Reserved.
                        </p>
                        <div className="mt-4 md:mt-0">
                            <ul className="flex space-x-6">
                                <li>
                                    <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors duration-300">
                                        Terms of Service
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors duration-300">
                                        Privacy Policy
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors duration-300">
                                        Contact Us
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;