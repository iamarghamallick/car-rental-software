"use client";
import CarList from "@/components/CarList";

export default function Home() {
  const CRS_TITLE = "WeDrive";

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow">
        <header className="bg-gradient-to-r from-blue-800 via-blue-600 to-blue-500 text-white">
          <div className="container mx-auto text-center py-16 px-4">
            <h1 className="text-5xl font-extrabold mb-4">Welcome to {CRS_TITLE}</h1>
            <p className="text-xl mb-8 leading-relaxed">
              Your trusted partner for convenient and reliable car rentals.
            </p>
            <a href="/about#services" className="bg-blue-800 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 border border-white">
              Explore Our Services
            </a>
          </div>
        </header>

        <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-16">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-extrabold mb-6 text-gray-800">Why Choose {CRS_TITLE}?</h2>
            <p className="text-lg mb-8 leading-relaxed text-gray-600">
              We offer a wide range of vehicles to suit your needs, whether you&#39;re traveling for business or leisure. Our user-friendly platform makes booking a car quick and easy.
            </p>
            <div className="flex flex-col md:flex-row justify-center md:space-x-6 gap-6 md:gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-blue-500">
                <h3 className="text-2xl font-semibold mb-3 text-blue-600">Wide Selection</h3>
                <p className="text-gray-700">Choose from a variety of cars, from economy to luxury.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-green-500">
                <h3 className="text-2xl font-semibold mb-3 text-green-600">Affordable Prices</h3>
                <p className="text-gray-700">Competitive rates and no hidden fees.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-purple-500">
                <h3 className="text-2xl font-semibold mb-3 text-purple-600">24/7 Support</h3>
                <p className="text-gray-700">We&#39;re here to help you at any time, day or night.</p>
              </div>
            </div>
          </div>
        </section>


        <section className="bg-purple-200 py-16">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-extrabold mb-8">Featured Cars</h2>
            <p className="text-lg mb-12 leading-relaxed">
              Explore our top car choices and find the perfect ride for your journey. Each car is equipped to ensure comfort and style.
            </p>
            <CarList />
          </div>
        </section>

        <section className="bg-blue-100 py-16">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-extrabold mb-6">Get Started Today!</h2>
            <p className="text-lg mb-8 leading-relaxed">Sign up now and book your next ride with ease.</p>
            <a href="/signup" className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-500 transition duration-300">
              Sign Up Now
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
