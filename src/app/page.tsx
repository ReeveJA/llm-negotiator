import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 dark:from-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="py-6 px-8 bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            Sailer
          </h1>
          <nav>
            <a
              href="#features"
              className="text-gray-700 dark:text-gray-300 mx-4 hover:underline"
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="text-gray-700 dark:text-gray-300 mx-4 hover:underline"
            >
              Testimonials
            </a>
            <a
              href="#cta"
              className="text-gray-700 dark:text-gray-300 mx-4 hover:underline"
            >
              Get Started
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      {/* <section className="py-20 px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-extrabold text-blue-800 dark:text-blue-200">
            Don’t Drown in the Sea of E-commerce
          </h2>
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
            Join <strong className="text-blue-600 dark:text-blue-400">SAILER</strong> and surf
            through your deals with ease.
          </p>
          <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-200">
            Get Started for Free
          </button>
        </div>
      </section> */}

      <section className="py-20 px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-extrabold text-blue-800 dark:text-blue-200">
            Don’t Drown in the Sea of E-commerce
          </h2>
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
            Join <strong className="text-blue-600 dark:text-blue-400">SAILER</strong> and surf
            through your deals with ease.
          </p>
          <Link href="/seller">
            <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-200">
              Get Started for Free
            </button>
          </Link>
        </div>
      </section>


      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-8">
          <h3 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100">
            Features That Help You Set Sail
          </h3>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-blue-100 dark:bg-gray-700 p-6 rounded-lg shadow-md text-center">
              <h4 className="text-xl font-bold text-blue-800 dark:text-blue-300">
                Smart Matching
              </h4>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Our AI-powered system matches buyers and sellers seamlessly.
              </p>
            </div>
            <div className="bg-blue-100 dark:bg-gray-700 p-6 rounded-lg shadow-md text-center">
              <h4 className="text-xl font-bold text-blue-800 dark:text-blue-300">
                Quick Negotiation
              </h4>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Negotiate deals in just a few clicks with our intuitive tools.
              </p>
            </div>
            <div className="bg-blue-100 dark:bg-gray-700 p-6 rounded-lg shadow-md text-center">
              <h4 className="text-xl font-bold text-blue-800 dark:text-blue-300">
                Secure Transactions
              </h4>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Trust Sailer to keep your deals safe and hassle-free.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-8">
          <h3 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100">
            What Our Users Say
          </h3>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <blockquote className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <p className="text-gray-600 dark:text-gray-300">
                "Sailer revolutionized the way I approach e-commerce. I can’t
                imagine negotiating without it!"
              </p>
              <footer className="mt-4 text-gray-700 dark:text-gray-400">
                — Jane Doe
              </footer>
            </blockquote>
            <blockquote className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <p className="text-gray-600 dark:text-gray-300">
                "The AI matching feature is a game-changer. Deals are so much
                easier now!"
              </p>
              <footer className="mt-4 text-gray-700 dark:text-gray-400">
                — John Smith
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section
        id="cta"
        className="py-20 bg-blue-600 text-white text-center"
      >
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold">
            Ready to Join the Future of E-commerce?
          </h3>
          <p className="mt-4 text-lg">
            Get started for free and transform the way you do business online.
          </p>
          <button className="mt-6 bg-white text-blue-600 font-bold py-3 px-6 rounded-lg shadow-md hover:bg-gray-100 transition duration-200">
            Sign Up Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-gray-200 dark:bg-gray-800 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          © {new Date().getFullYear()} Sailer. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
