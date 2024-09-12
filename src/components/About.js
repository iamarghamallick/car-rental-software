import React from 'react'

const About = () => {
    const CRS_TITLE = "WeDrive";

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-r from-gray-50 to-gray-100">
            <header className="bg-gradient-to-r from-blue-800 via-blue-600 to-blue-500 text-white">
                <div className="container mx-auto text-center py-16 px-4">
                    <h1 className="text-5xl font-extrabold mb-4">About {CRS_TITLE}</h1>
                    <p className="text-xl mb-8 leading-relaxed">
                        Learn more about our mission, values, and the dedicated team behind {CRS_TITLE}.
                    </p>
                </div>
            </header>

            <main className="flex-grow">
                {/* Company Overview Section */}
                <section className="py-16">
                    <div className="container mx-auto text-center">
                        <h2 className="text-4xl font-extrabold mb-6 text-gray-800">Who We Are</h2>
                        <p className="text-lg mb-8 text-gray-600 leading-relaxed">
                            {CRS_TITLE} is a cutting-edge car rental software designed to streamline vehicle rentals for customers, drivers, and managers. We believe in making transportation accessible and convenient by offering a platform that connects you with the right vehicle, whenever and wherever you need it.
                        </p>
                    </div>
                </section>

                {/* Core Values Section */}
                <section className="bg-white py-16">
                    <div className="container mx-auto text-center">
                        <h2 className="text-4xl font-extrabold mb-6 text-gray-800">Our Core Values</h2>
                        <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-8">
                            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                                <h3 className="text-2xl font-semibold mb-3 text-blue-600">Innovation</h3>
                                <p className="text-gray-700">
                                    We strive to provide cutting-edge technology that enhances the car rental experience, making it easier and faster for all users.
                                </p>
                            </div>
                            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                                <h3 className="text-2xl font-semibold mb-3 text-green-600">Reliability</h3>
                                <p className="text-gray-700">
                                    From vehicle availability to 24/7 customer support, our platform is built to ensure reliable service every time.
                                </p>
                            </div>
                            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                                <h3 className="text-2xl font-semibold mb-3 text-purple-600">Affordability</h3>
                                <p className="text-gray-700">
                                    We offer competitive pricing for customers while ensuring fair earnings for our drivers and partners.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="py-16">
                    <div className="container mx-auto text-center">
                        <h2 className="text-4xl font-extrabold mb-6 text-gray-800">Meet Our Team</h2>
                        <p className="text-lg mb-8 text-gray-600 leading-relaxed">
                            Behind {CRS_TITLE} is a talented and passionate team dedicated to revolutionizing the car rental industry.
                        </p>
                        <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-8">
                            <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/3">
                                <img src="/assets/all-images/ava-1.jpg" alt="Team Member 1" className="w-full h-48 object-cover rounded-t-lg mb-4" />
                                <h3 className="text-2xl font-semibold mb-2">Name Here</h3>
                                <p className="text-gray-700">CEO & Founder</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/3">
                                <img src="/assets/all-images/ava-2.jpg" alt="Team Member 2" className="w-full h-48 object-cover rounded-t-lg mb-4" />
                                <h3 className="text-2xl font-semibold mb-2">Name Here</h3>
                                <p className="text-gray-700">Chief Technology Officer</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/3">
                                <img src="/assets/all-images/ava-3.jpg" alt="Team Member 3" className="w-full h-48 object-cover rounded-t-lg mb-4" />
                                <h3 className="text-2xl font-semibold mb-2">Name Here</h3>
                                <p className="text-gray-700">Head of Customer Relations</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Services Section */}
                <section id='services' className="bg-gradient-to-r from-blue-50 to-blue-100 py-16">
                    <div className="container mx-auto text-center">
                        <h2 className="text-4xl font-extrabold mb-6 text-gray-800">Our Services</h2>
                        <p className="text-lg mb-8 text-gray-600 leading-relaxed">
                            {CRS_TITLE} provides a comprehensive car rental solution with a focus on convenience and quality. Here’s what we offer:
                        </p>
                        <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-8">
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-2xl font-semibold mb-3 text-blue-600">Easy Bookings</h3>
                                <p className="text-gray-700">Our platform makes it simple to book a vehicle in just a few clicks, with instant confirmations.</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-2xl font-semibold mb-3 text-green-600">Wide Vehicle Selection</h3>
                                <p className="text-gray-700">From economy cars to luxury vehicles, we have a variety of options to suit all needs and preferences.</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-2xl font-semibold mb-3 text-purple-600">Driver & Fleet Management</h3>
                                <p className="text-gray-700">Our software provides tools for managing drivers, fleets, and vehicle maintenance with ease.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action Section */}
                <section className="bg-gradient-to-r from-blue-800 via-blue-600 to-blue-500 py-16 text-white">
                    <div className="container mx-auto text-center">
                        <h2 className="text-4xl font-extrabold mb-6">Ready to Join {CRS_TITLE}?</h2>
                        <p className="text-lg mb-8">
                            Whether you&#39;re a customer looking for a ride or a driver wanting to earn more, {CRS_TITLE} is here for you.
                        </p>
                        <a href="#signup" className="bg-blue-800 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 border border-white">
                            Get Started Today
                        </a>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default About