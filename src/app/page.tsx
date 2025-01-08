// import Link from "next/link";
// import React from "react";

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 dark:from-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100">
//       {/* Header */}
//       <header className="py-6 px-8 bg-white dark:bg-gray-800 shadow-md">
//         <div className="max-w-7xl mx-auto flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
//             Sailer
//           </h1>
//           <nav>
//             <a
//               href="#features"
//               className="text-gray-700 dark:text-gray-300 mx-4 hover:underline"
//             >
//               Features
//             </a>
//             <a
//               href="#testimonials"
//               className="text-gray-700 dark:text-gray-300 mx-4 hover:underline"
//             >
//               Testimonials
//             </a>
//             <a
//               href="#cta"
//               className="text-gray-700 dark:text-gray-300 mx-4 hover:underline"
//             >
//               Get Started
//             </a>
//           </nav>
//         </div>
//       </header>

//       {/* Hero Section */}
//       {/* <section className="py-20 px-8 text-center">
//         <div className="max-w-4xl mx-auto">
//           <h2 className="text-4xl font-extrabold text-blue-800 dark:text-blue-200">
//             Don’t Drown in the Sea of E-commerce
//           </h2>
//           <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
//             Join <strong className="text-blue-600 dark:text-blue-400">SAILER</strong> and surf
//             through your deals with ease.
//           </p>
//           <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-200">
//             Get Started for Free
//           </button>
//         </div>
//       </section> */}

//       <section className="py-20 px-8 text-center">
//         <div className="max-w-4xl mx-auto">
//           <h2 className="text-4xl font-extrabold text-blue-800 dark:text-blue-200">
//             Don’t Drown in the Sea of E-commerce
//           </h2>
//           <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
//             Join <strong className="text-blue-600 dark:text-blue-400">SAILER</strong> and surf
//             through your deals with ease.
//           </p>
//           <Link href="/seller">
//             <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-200">
//               Get Started for Free
//             </button>
//           </Link>
//         </div>
//       </section>


//       {/* Features Section */}
//       <section id="features" className="py-20 bg-white dark:bg-gray-800">
//         <div className="max-w-7xl mx-auto px-8">
//           <h3 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100">
//             Features That Help You Set Sail
//           </h3>
//           <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//             <div className="bg-blue-100 dark:bg-gray-700 p-6 rounded-lg shadow-md text-center">
//               <h4 className="text-xl font-bold text-blue-800 dark:text-blue-300">
//                 Smart Matching
//               </h4>
//               <p className="mt-2 text-gray-600 dark:text-gray-300">
//                 Our AI-powered system matches buyers and sellers seamlessly.
//               </p>
//             </div>
//             <div className="bg-blue-100 dark:bg-gray-700 p-6 rounded-lg shadow-md text-center">
//               <h4 className="text-xl font-bold text-blue-800 dark:text-blue-300">
//                 Quick Negotiation
//               </h4>
//               <p className="mt-2 text-gray-600 dark:text-gray-300">
//                 Negotiate deals in just a few clicks with our intuitive tools.
//               </p>
//             </div>
//             <div className="bg-blue-100 dark:bg-gray-700 p-6 rounded-lg shadow-md text-center">
//               <h4 className="text-xl font-bold text-blue-800 dark:text-blue-300">
//                 Secure Transactions
//               </h4>
//               <p className="mt-2 text-gray-600 dark:text-gray-300">
//                 Trust Sailer to keep your deals safe and hassle-free.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-900">
//         <div className="max-w-7xl mx-auto px-8">
//           <h3 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100">
//             What Our Users Say
//           </h3>
//           <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8">
//             <blockquote className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
//               <p className="text-gray-600 dark:text-gray-300">
//                 "Sailer revolutionized the way I approach e-commerce. I can’t
//                 imagine negotiating without it!"
//               </p>
//               <footer className="mt-4 text-gray-700 dark:text-gray-400">
//                 — Jane Doe
//               </footer>
//             </blockquote>
//             <blockquote className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
//               <p className="text-gray-600 dark:text-gray-300">
//                 "The AI matching feature is a game-changer. Deals are so much
//                 easier now!"
//               </p>
//               <footer className="mt-4 text-gray-700 dark:text-gray-400">
//                 — John Smith
//               </footer>
//             </blockquote>
//           </div>
//         </div>
//       </section>

//       {/* Call-to-Action Section */}
//       <section
//         id="cta"
//         className="py-20 bg-blue-600 text-white text-center"
//       >
//         <div className="max-w-4xl mx-auto">
//           <h3 className="text-3xl font-bold">
//             Ready to Join the Future of E-commerce?
//           </h3>
//           <p className="mt-4 text-lg">
//             Get started for free and transform the way you do business online.
//           </p>
//           <button className="mt-6 bg-white text-blue-600 font-bold py-3 px-6 rounded-lg shadow-md hover:bg-gray-100 transition duration-200">
//             Sign Up Now
//           </button>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="py-6 bg-gray-200 dark:bg-gray-800 text-center">
//         <p className="text-sm text-gray-600 dark:text-gray-300">
//           © {new Date().getFullYear()} Sailer. All Rights Reserved.
//         </p>
//       </footer>
//     </div>
//   );
// }


// "use client";

// import Link from "next/link";
// import React from "react";

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-teal-500 to-blue-600 [background-image:linear-gradient(to_bottom_right,rgba(16,185,129,0.8),rgba(20,184,166,0.7),rgba(37,99,235,0.8)),url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1Ii8+PC9zdmc+')] text-gray-900 dark:text-gray-100">
//       {/* Header */}
//       <header className="py-6 px-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto flex justify-between items-center">
//           <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
//             Sailer
//           </h1>
//           <nav className="space-x-6">
//             <a
//               href="#features"
//               className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
//             >
//               Features
//             </a>
//             <a
//               href="#testimonials"
//               className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
//             >
//               Testimonials
//             </a>
//             <a
//               href="#cta"
//               className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
//             >
//               Get Started
//             </a>
//           </nav>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="py-32 px-8 text-center relative">
//         <div className="max-w-4xl mx-auto">
//           <div className="relative z-10">
//             <h2 className="text-5xl font-extrabold text-white drop-shadow-lg">
//               Don't Drown in the Sea of E-commerce
//             </h2>
//             <p className="mt-6 text-xl text-white/90 drop-shadow">
//               Join <strong className="text-white">SAILER</strong> and surf
//               through your deals with ease.
//             </p>
//             <Link href="/seller">
//               <button className="mt-8 bg-white hover:bg-gray-50 text-emerald-600 font-bold py-4 px-8 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
//                 Get Started for Free
//               </button>
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section id="features" className="py-24 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm">
//         <div className="max-w-7xl mx-auto px-8">
//           <h3 className="text-3xl font-bold text-center bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
//             Features That Help You Set Sail
//           </h3>
//           <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//             <div className="bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] dark:shadow-[0_20px_50px_rgba(8,_112,_184,_0.2)] hover:transform hover:-translate-y-2 transition-all duration-300">
//               <h4 className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
//                 Smart Matching
//               </h4>
//               <p className="mt-4 text-gray-600 dark:text-gray-300">
//                 Our AI-powered system matches buyers and sellers seamlessly.
//               </p>
//             </div>
//             <div className="bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] dark:shadow-[0_20px_50px_rgba(8,_112,_184,_0.2)] hover:transform hover:-translate-y-2 transition-all duration-300">
//               <h4 className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
//                 Quick Negotiation
//               </h4>
//               <p className="mt-4 text-gray-600 dark:text-gray-300">
//                 Negotiate deals in just a few clicks with our intuitive tools.
//               </p>
//             </div>
//             <div className="bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] dark:shadow-[0_20px_50px_rgba(8,_112,_184,_0.2)] hover:transform hover:-translate-y-2 transition-all duration-300">
//               <h4 className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
//                 Secure Transactions
//               </h4>
//               <p className="mt-4 text-gray-600 dark:text-gray-300">
//                 Trust Sailer to keep your deals safe and hassle-free.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section id="testimonials" className="py-24 bg-emerald-50/95 dark:bg-gray-900/95 backdrop-blur-sm">
//         <div className="max-w-7xl mx-auto px-8">
//           <h3 className="text-3xl font-bold text-center bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
//             What Our Users Say
//           </h3>
//           <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-8">
//             <blockquote className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
//               <p className="text-lg text-gray-600 dark:text-gray-300">
//                 "Sailer revolutionized the way I approach e-commerce. I can't
//                 imagine negotiating without it!"
//               </p>
//               <footer className="mt-6 text-emerald-600 dark:text-emerald-400 font-medium">
//                 — Jane Doe
//               </footer>
//             </blockquote>
//             <blockquote className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
//               <p className="text-lg text-gray-600 dark:text-gray-300">
//                 "The AI matching feature is a game-changer. Deals are so much
//                 easier now!"
//               </p>
//               <footer className="mt-6 text-emerald-600 dark:text-emerald-400 font-medium">
//                 — John Smith
//               </footer>
//             </blockquote>
//           </div>
//         </div>
//       </section>

//       {/* Call-to-Action Section */}
//       <section
//         id="cta"
//         className="py-24 bg-gradient-to-r from-emerald-600 to-blue-600 text-white text-center"
//       >
//         <div className="max-w-4xl mx-auto px-8">
//           <h3 className="text-4xl font-bold drop-shadow-lg">
//             Ready to Join the Future of E-commerce?
//           </h3>
//           <p className="mt-6 text-xl text-white/90">
//             Get started for free and transform the way you do business online.
//           </p>
//           <button className="mt-8 bg-white hover:bg-gray-50 text-emerald-600 font-bold py-4 px-8 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
//             Sign Up Now
//           </button>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="py-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-center">
//         <p className="text-sm text-gray-600 dark:text-gray-300">
//           © {new Date().getFullYear()} Sailer. All Rights Reserved.
//         </p>
//       </footer>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-teal-500 to-blue-600 [background-image:linear-gradient(to_bottom_right,rgba(16,185,129,0.8),rgba(20,184,166,0.7),rgba(37,99,235,0.8)),url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1Ii8+PC9zdmc+')] text-gray-900">
      {/* Header */}
      <header className="py-6 px-8 bg-white/90 backdrop-blur-sm shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl italic font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
            S<span className="text-green-500">AI</span>LER
          </h1>
          <nav className="space-x-6">
            <a
              href="#features"
              className="text-gray-700 hover:text-emerald-600 transition-colors"
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="text-gray-700 hover:text-emerald-600 transition-colors"
            >
              Testimonials
            </a>
            <a
              href="#cta"
              className="text-gray-700 hover:text-emerald-600 transition-colors"
            >
              Get Started
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-32 px-8 text-center relative">
        <div className="max-w-4xl mx-auto">
          <div className="relative z-10">
            <h2 className="text-5xl font-extrabold text-white drop-shadow-lg">
              Don't Drown in the Sea of E-commerce
            </h2>
            <p className="mt-6 text-xl text-white/90 drop-shadow">
              Join <strong className="text-white">SAILER</strong> and surf
              through your deals with ease.
            </p>
            <Link href="/seller">
              <button className="mt-8 bg-white hover:bg-gray-50 text-emerald-600 font-bold py-4 px-8 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                Get Started for Free
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-8">
          <h3 className="text-3xl font-bold text-center bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            Features That Help You Set Sail
          </h3>
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] hover:transform hover:-translate-y-2 transition-all duration-300">
              <h4 className="text-xl font-bold text-emerald-600">
                Smart Matching
              </h4>
              <p className="mt-4 text-gray-600">
                Our AI-powered system matches buyers and sellers seamlessly.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] hover:transform hover:-translate-y-2 transition-all duration-300">
              <h4 className="text-xl font-bold text-emerald-600">
                Quick Negotiation
              </h4>
              <p className="mt-4 text-gray-600">
                Negotiate deals in just a few clicks with our intuitive tools.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] hover:transform hover:-translate-y-2 transition-all duration-300">
              <h4 className="text-xl font-bold text-emerald-600">
                Secure Transactions
              </h4>
              <p className="mt-4 text-gray-600">
                Trust Sailer to keep your deals safe and hassle-free.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-emerald-50/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-8">
          <h3 className="text-3xl font-bold text-center bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            What Our Users Say
          </h3>
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <blockquote className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <p className="text-lg text-gray-600">
                "Sailer revolutionized the way I approach e-commerce. I can't
                imagine negotiating without it!"
              </p>
              <footer className="mt-6 text-emerald-600 font-medium">
                — Jane Doe
              </footer>
            </blockquote>
            <blockquote className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <p className="text-lg text-gray-600">
                "The AI matching feature is a game-changer. Deals are so much
                easier now!"
              </p>
              <footer className="mt-6 text-emerald-600 font-medium">
                — John Smith
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section
        id="cta"
        className="py-24 bg-gradient-to-r from-emerald-600 to-blue-600 text-white text-center"
      >
        <div className="max-w-4xl mx-auto px-8">
          <h3 className="text-4xl font-bold drop-shadow-lg">
            Ready to Join the Future of E-commerce?
          </h3>
          <p className="mt-6 text-xl text-white/90">
            Get started for free and transform the way you do business online.
          </p>
          <button className="mt-8 bg-white hover:bg-gray-50 text-emerald-600 font-bold py-4 px-8 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            Sign Up Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-white/90 backdrop-blur-sm text-center">
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} Sailer. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}