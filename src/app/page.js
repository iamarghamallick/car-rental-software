export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <div className="container mx-auto text-center py-12">
          <h1 className="text-4xl font-bold mb-4">Welcome to ADDA-CRS</h1>
          <p className="text-lg mb-6">
            Your trusted partner for convenient and reliable car rentals.
          </p>
          <a href="#services" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            Explore Our Services
          </a>
        </div>

        <section className="bg-gray-100 py-12">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Why Choose ADDA-CRS?</h2>
            <p className="text-lg mb-6">
              We offer a wide range of vehicles to suit your needs, whether you're traveling for business or leisure. Our user-friendly platform makes booking a car quick and easy.
            </p>
            <div className="flex justify-center space-x-8">
              <div>
                <h3 className="text-xl font-bold mb-2">Wide Selection</h3>
                <p>Choose from a variety of cars, from economy to luxury.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Affordable Prices</h3>
                <p>Competitive rates and no hidden fees.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
                <p>We're here to help you at any time, day or night.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Get Started Today!</h2>
            <p className="text-lg mb-6">Sign up now and book your next ride with ease.</p>
            <a href="#signup" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              Sign Up Now
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
