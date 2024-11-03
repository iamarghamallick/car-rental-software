import React from 'react'

const About = () => {
    const CRS_TITLE = "WeDrive";
    const features = [
        {
            title: "Innovation",
            color: "text-blue-600",
            description:
                "We strive to provide cutting-edge technology that enhances the car rental experience, making it easier and faster for all users.",
        },
        {
            title: "Reliability",
            color: "text-green-600",
            description:
                "From vehicle availability to 24/7 customer support, our platform is built to ensure reliable service every time.",
        },
        {
            title: "Affordability",
            color: "text-purple-600",
            description:
                "We offer competitive pricing for customers while ensuring fair earnings for our drivers and partners.",
        },
    ];
    const teamMembers = [
        { name: "Aman Santra", id: "11500122009", imgSrc: "/assets/all-images/avater.png", border: "border border-blue-500" },
        { name: "Diptam Kundu", id: "11500122011", imgSrc: "/assets/all-images/avater.png", border: "border border-green-500" },
        { name: "Dipon De", id: "11500122012", imgSrc: "/assets/all-images/avater.png", border: "border border-red-500" },
        { name: "Argha Mallick", id: "11500122014", imgSrc: "/assets/all-images/avater.png", border: "border border-purple-500" },
    ];
    const services = [
        {
            title: "Easy Bookings",
            color: "text-blue-600",
            description:
                "Our platform makes it simple to book a vehicle in just a few clicks, with instant confirmations.",
        },
        {
            title: "Wide Vehicle Selection",
            color: "text-green-600",
            description:
                "From economy cars to luxury vehicles, we have a variety of options to suit all needs and preferences.",
        },
        {
            title: "Driver & Fleet Management",
            color: "text-purple-600",
            description:
                "Our software provides tools for managing drivers, fleets, and vehicle maintenance with ease.",
        },
    ];

    return (
        <div className="flex flex-col min-h-screen px-1">
            <header className="rounded-lg my-4 bg-gradient-to-r from-blue-800 via-blue-600 to-blue-500 text-white">
                <div className="container mx-auto text-center py-16 px-4">
                    <h1 className="text-5xl font-extrabold mb-4">About {CRS_TITLE}</h1>
                    <p className="text-xl mb-8 leading-relaxed">
                        Learn more about our mission, values, and the dedicated team behind {CRS_TITLE}.
                    </p>
                </div>
            </header>

            <main className="flex flex-col gap-4">
                {/* Company Overview Section */}
                <section className="py-16">
                    <div className="container mx-auto text-center">
                        <h2 className="text-4xl font-extrabold mb-6 text-gray-800">Who We Are</h2>
                        <p className="text-xl mb-8 text-gray-600 leading-relaxed">
                            {CRS_TITLE} is a cutting-edge car rental software designed to streamline vehicle rentals for customers, drivers, and managers. We believe in making transportation accessible and convenient by offering a platform that connects you with the right vehicle, whenever and wherever you need it.
                        </p>
                    </div>
                </section>

                {/* Core Values Section */}
                <section className="relative rounded-lg p-2 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 rounded-lg -z-10"></div>
                    <div className="absolute inset-0 border-4 border-transparent rounded-lg z-0 bg-clip-border bg-gradient-to-r from-blue-500 via-green-500 to-purple-500"></div>
                    <div className="relative z-10 bg-white rounded-lg p-8">
                        <div className="container mx-auto text-center">
                            <h2 className="text-4xl font-extrabold mb-6 text-gray-800">Our Core Values</h2>
                            <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-8">
                                {features.map((feature, index) => (
                                    <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-lg drop-shadow-md hover:shadow-2xl transition-shadow duration-300">
                                        <h3 className={`text-2xl font-semibold mb-3 ${feature.color}`}>
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-700">{feature.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="py-16">
                    <div className="container mx-auto text-center">
                        <h2 className="text-4xl font-extrabold mb-6 text-gray-800">Meet Our Team</h2>
                        <p className="text-xl mb-8 text-gray-600 leading-relaxed">
                            Behind {CRS_TITLE} is a talented and passionate team dedicated to revolutionizing the car rental industry.
                        </p>
                        <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-8">
                            {teamMembers.map((member, index) => (
                                <div key={index} className={`${member.border} p-6 rounded-lg shadow-md w-full md:w-1/3`}>
                                    <img
                                        src={member.imgSrc}
                                        alt={`Team Member ${index + 1}`}
                                        className="w-full h-48 object-cover rounded-full mb-4"
                                    />
                                    <h3 className="text-3xl font-semibold mb-2">{member.name}</h3>
                                    <p className="text-xl text-gray-700">{member.id}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Services Section */}
                <section id='services' className="relative bg-gradient-to-r from-blue-50 to-blue-100 p-2 rounded-lg">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 rounded-lg -z-10"></div>
                    <div className="absolute inset-0 border-4 border-transparent rounded-lg z-0 bg-clip-border bg-gradient-to-r from-blue-500 via-green-500 to-purple-500"></div>
                    <div className="relative z-10 bg-white rounded-lg p-8">
                        <div className="container mx-auto text-center rounded-lg">
                            <h2 className="text-4xl font-extrabold mb-6 text-gray-800">Our Services</h2>
                            <p className="text-xl mb-8 text-gray-600 leading-relaxed">
                                {CRS_TITLE} provides a comprehensive car rental solution with a focus on convenience and quality. Here&apos;s what we offer:
                            </p>
                            <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-8">
                                {services.map((feature, index) => (
                                    <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-lg drop-shadow-md hover:shadow-2xl transition-shadow duration-300">
                                        <h3 className={`text-2xl font-semibold mb-3 ${feature.color}`}>
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-700">{feature.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action Section */}
                <section className="mb-4 rounded-lg bg-gradient-to-r from-blue-800 via-blue-600 to-blue-500 py-16 text-white">
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