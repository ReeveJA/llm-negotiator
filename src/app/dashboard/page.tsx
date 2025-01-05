import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="py-6 px-8 bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            Dashboard
          </h1>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-blue-800 dark:text-blue-200">
            Welcome to Your Dashboard
          </h2>
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
            Whether you're here to buy or sell, we've got you covered.
          </p>
          <div className="mt-8 flex justify-center space-x-6">
            <Link href="/buyer">
              <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-200">
                Buy
              </button>
            </Link>
            <Link href="/seller">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-200">
                Sell
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
