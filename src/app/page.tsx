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

// className="min-h-screen bg-gradient-to-br from-emerald-400 via-teal-500 to-blue-600 [background-image:linear-gradient(to_bottom_right,rgba(16,185,129,0.8),rgba(20,184,166,0.7),rgba(37,99,235,0.8)),url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1Ii8+PC9zdmc+')]

// "use client";

// import Link from "next/link";
// import React from "react";

// export default function Home() {
//   return (
//     <div style={{
//       backgroundImage: `url('/grain.svg')`,
//       backgroundSize: 'contain',
//     }} className="text-gray-900">
//       {/* Header */}
//       <header className="py-6 px-8 bg-white/90 backdrop-blur-sm shadow-lg sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto flex justify-between items-center">
//           <h1 className="text-2xl italic font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
//             S<span className="text-green-500">AI</span>LER
//           </h1>
//           <nav className="space-x-6">
//             <a
//               href="#features"
//               className="text-gray-700 hover:text-emerald-600 transition-colors"
//             >
//               Features
//             </a>
//             <a
//               href="#testimonials"
//               className="text-gray-700 hover:text-emerald-600 transition-colors"
//             >
//               Testimonials
//             </a>
//             <a
//               href="#cta"
//               className="text-gray-700 hover:text-emerald-600 transition-colors"
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
//               Join <strong className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">S<span className="text-green-500">AI</span>LER</strong> and surf
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
//       <section id="features" className="py-24 bg-white/95 backdrop-blur-sm">
//         <div className="max-w-7xl mx-auto px-8">
//           <h3 className="text-3xl font-bold text-center bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
//             Features That Help You Set Sail
//           </h3>
//           <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//             <div className="bg-white p-8 rounded-2xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] hover:transform hover:-translate-y-2 transition-all duration-300">
//               <h4 className="text-xl font-bold text-emerald-600">
//                 Smart Matching
//               </h4>
//               <p className="mt-4 text-gray-600">
//                 Our AI-powered system matches buyers and sellers seamlessly.
//               </p>
//             </div>
//             <div className="bg-white p-8 rounded-2xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] hover:transform hover:-translate-y-2 transition-all duration-300">
//               <h4 className="text-xl font-bold text-emerald-600">
//                 Quick Negotiation
//               </h4>
//               <p className="mt-4 text-gray-600">
//                 Negotiate deals in just a few clicks with our intuitive tools.
//               </p>
//             </div>
//             <div className="bg-white p-8 rounded-2xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] hover:transform hover:-translate-y-2 transition-all duration-300">
//               <h4 className="text-xl font-bold text-emerald-600">
//                 Secure Transactions
//               </h4>
//               <p className="mt-4 text-gray-600">
//                 Trust Sailer to keep your deals safe and hassle-free.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section id="testimonials" className="py-24 bg-emerald-50/95 backdrop-blur-sm">
//         <div className="max-w-7xl mx-auto px-8">
//           <h3 className="text-3xl font-bold text-center bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
//             What Our Users Say
//           </h3>
//           <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-8">
//             <blockquote className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
//               <p className="text-lg text-gray-600">
//                 "Sailer revolutionized the way I approach e-commerce. I can't
//                 imagine negotiating without it!"
//               </p>
//               <footer className="mt-6 text-emerald-600 font-medium">
//                 — Jane Doe
//               </footer>
//             </blockquote>
//             <blockquote className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
//               <p className="text-lg text-gray-600">
//                 "The AI matching feature is a game-changer. Deals are so much
//                 easier now!"
//               </p>
//               <footer className="mt-6 text-emerald-600 font-medium">
//                 — John Smith
//               </footer>
//             </blockquote>
//           </div>
//         </div>
//       </section>

//       {/* Call-to-Action Section */}
//       <section
//         id="cta"
//         className="py-24 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-center"
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
//       <footer className="py-8 bg-white/90 backdrop-blur-sm text-center">
//         <p className="text-sm text-gray-600">
//           © {new Date().getFullYear()} Sailer. All Rights Reserved.
//         </p>
//       </footer>
//     </div>
//   );
// }

// "use client";

// import Link from "next/link";
// import React from "react";
// import Navbar from "./components/Navbar";

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-green-500/55 via-blue-700 to-blue-900">
//       <Navbar />

//       {/* Hero Section */}
//       <section className="pt-48 pb-32 px-8 text-center relative">
//         <div className="max-w-4xl mx-auto">
//           <div className="relative z-10">
//             <h2 className="text-6xl font-extrabold text-white drop-shadow-lg">
//               Don't Drown in the Sea of E-commerce
//             </h2>
//             <p className="mt-8 text-xl text-white/90 italic">
//               Join <strong className="text-2xl font-bold text-white">S<span className="text-blue-600">AI</span>LER</strong> and surf
//               through your deals with ease.
//             </p>
//             <Link href="/seller">
//               <button className="mt-10 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-medium py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-white/20">
//                 Get Started for Free
//               </button>
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section id="features" className="py-24 bg-white/5 backdrop-blur-md">
//         <div className="max-w-7xl mx-auto px-8">
//           <h3 className="text-3xl font-bold text-center text-white">
//             Features That Help You Set Sail
//           </h3>
//           <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//             <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:transform hover:-translate-y-2 transition-all duration-300">
//               <h4 className="text-xl font-bold text-white">
//                 Smart Matching
//               </h4>
//               <p className="mt-4 text-white/80">
//                 Our AI-powered system matches buyers and sellers seamlessly.
//               </p>
//             </div>
//             <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:transform hover:-translate-y-2 transition-all duration-300">
//               <h4 className="text-xl font-bold text-white">
//                 Quick Negotiation
//               </h4>
//               <p className="mt-4 text-white/80">
//                 Negotiate deals in just a few clicks with our intuitive tools.
//               </p>
//             </div>
//             <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:transform hover:-translate-y-2 transition-all duration-300">
//               <h4 className="text-xl font-bold text-white">
//                 Secure Transactions
//               </h4>
//               <p className="mt-4 text-white/80">
//                 Trust Sailer to keep your deals safe and hassle-free.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section id="testimonials" className="py-24 bg-white/10 backdrop-blur-md">
//         <div className="max-w-7xl mx-auto px-8">
//           <h3 className="text-3xl font-bold text-center text-white">
//             What Our Users Say
//           </h3>
//           <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-8">
//             <blockquote className="p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:shadow-xl transition-all duration-300">
//               <p className="text-lg text-white/90">
//                 "Sailer revolutionized the way I approach e-commerce. I can't
//                 imagine negotiating without it!"
//               </p>
//               <footer className="mt-6 text-emerald-300 font-medium">
//                 — Jane Doe
//               </footer>
//             </blockquote>
//             <blockquote className="p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:shadow-xl transition-all duration-300">
//               <p className="text-lg text-white/90">
//                 "The AI matching feature is a game-changer. Deals are so much
//                 easier now!"
//               </p>
//               <footer className="mt-6 text-emerald-300 font-medium">
//                 — John Smith
//               </footer>
//             </blockquote>
//           </div>
//         </div>
//       </section>

//       {/* Call-to-Action Section */}
//       <section
//         id="cta"
//         className="py-24 bg-white/5 backdrop-blur-md text-center"
//       >
//         <div className="max-w-4xl mx-auto px-8">
//           <h3 className="text-4xl font-bold text-white drop-shadow-lg">
//             Ready to Join the Future of E-commerce?
//           </h3>
//           <p className="mt-6 text-xl text-white/90">
//             Get started for free and transform the way you do business online.
//           </p>
//           <button className="mt-10 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-medium py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-white/20">
//             Sign Up Now
//           </button>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="py-8 bg-white/5 backdrop-blur-md text-center">
//         <p className="text-sm text-white/70">
//           © {new Date().getFullYear()} Sailer. All Rights Reserved.
//         </p>
//       </footer>
//     </div>
//   );
// }



// "use client";

// import Link from "next/link";
// import React from "react";
// import Navbar from "./components/Navbar";
// import { Anchor, ShoppingBag, Shield, Zap } from "lucide-react";
// import Image from "next/image";
// import bgOcean from '/bgOcean.jpeg'

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-cyan-500/30 via-blue-800 to-blue-950">
//       {/* <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1682686581362-796145f0e123')] bg-cover bg-center opacity-10" /> */}
//       {/* <div className="absolute inset-0 bg-[url('/bgOcean.jpeg')] bg-cover bg-center opacity-10" /> */}
//       <Navbar />

//       {/* Hero Section */}
//       <section className="pt-32 pb-24 px-8 text-center relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-blue-900/50 backdrop-blur-sm" />
        
//         {/* Animated Light Rays */}
//         {/* <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1682686581362-796145f0e123')] bg-cover opacity-20 animate-pulse" /> */}
//         <div className="absolute inset-0 bg-[url('/bgOcean.jpeg')] bg-cover bg-center opacity-50" />
//         <div className="max-w-6xl mx-auto relative z-10">
//           <div className="space-y-6">
//             <div className="inline-block animate-float">
//               <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium">
//                 🌊 Dive into the future of e-commerce
//               </span>
//             </div>
            
//             <h1 className="text-7xl font-extrabold text-white tracking-tight drop-shadow-2xl">
//               Don't Drown in the Sea of <br/>
//               <span className="bg-gradient-to-r from-cyan-300 to-blue-500 text-transparent bg-clip-text">
//                 E-commerce
//               </span>
//             </h1>
            
//             <p className="mt-8 text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
//               Join <strong className="text-2xl font-bold">S<span className="text-cyan-400">AI</span>LER</strong> and navigate 
//               through your deals with the power of AI. Transform your online business into a 
//               smooth-sailing journey.
//             </p>

//             <div className="flex items-center justify-center gap-4 mt-12">
//               <Link href="/seller">
//                 <button className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-white font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:-translate-y-1">
//                   Get Started Free
//                   <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">
//                     →
//                   </span>
//                 </button>
//               </Link>
//               <button className="px-8 py-4 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-medium rounded-full border border-white/20 transition-all duration-300">
//                 Watch Demo
//               </button>
//             </div>

//             <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center text-white/80">
//               <div className="space-y-2">
//                 <h4 className="text-3xl font-bold text-white">2M+</h4>
//                 <p className="text-sm">Active Users</p>
//               </div>
//               <div className="space-y-2">
//                 <h4 className="text-3xl font-bold text-white">$500M</h4>
//                 <p className="text-sm">Transactions</p>
//               </div>
//               <div className="space-y-2">
//                 <h4 className="text-3xl font-bold text-white">99.9%</h4>
//                 <p className="text-sm">Uptime</p>
//               </div>
//               <div className="space-y-2">
//                 <h4 className="text-3xl font-bold text-white">4.9/5</h4>
//                 <p className="text-sm">User Rating</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section id="features" className="py-24 bg-blue-950/50 backdrop-blur-md">
//         <div className="max-w-7xl mx-auto px-8">
//           <h3 className="text-4xl font-bold text-center text-white mb-4">
//             Features That Help You Set Sail
//           </h3>
//           <p className="text-center text-white/80 max-w-2xl mx-auto mb-16">
//             Navigate the e-commerce waters with confidence using our powerful tools and features
//           </p>
          
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
//             {[
//               {
//                 icon: <Anchor className="w-6 h-6 text-cyan-400" />,
//                 title: "Smart Matching",
//                 description: "AI-powered system matches buyers and sellers seamlessly"
//               },
//               {
//                 icon: <Zap className="w-6 h-6 text-cyan-400" />,
//                 title: "Quick Negotiation",
//                 description: "Negotiate deals in just a few clicks with intuitive tools"
//               },
//               {
//                 icon: <Shield className="w-6 h-6 text-cyan-400" />,
//                 title: "Secure Transactions",
//                 description: "Keep your deals safe and hassle-free with our platform"
//               },
//               {
//                 icon: <ShoppingBag className="w-6 h-6 text-cyan-400" />,
//                 title: "Inventory Management",
//                 description: "Manage your products with powerful tracking tools"
//               }
//             ].map((feature, index) => (
//               <div key={index} className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2">
//                 <div className="p-3 rounded-lg bg-white/10 w-fit mb-4">
//                   {feature.icon}
//                 </div>
//                 <h4 className="text-xl font-bold text-white mb-2">
//                   {feature.title}
//                 </h4>
//                 <p className="text-white/70">
//                   {feature.description}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Rest of the sections remain the same */}
//       {/* Testimonials Section */}
//       <section id="testimonials" className="py-24 bg-blue-900/30 backdrop-blur-md">
//         <div className="max-w-7xl mx-auto px-8">
//           <h3 className="text-4xl font-bold text-center text-white mb-16">
//             What Our Users Say
//           </h3>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {[
//               {
//                 quote: "SAILER revolutionized how I approach e-commerce. The AI matching is incredible!",
//                 author: "Jane Cooper",
//                 role: "E-commerce Manager"
//               },
//               {
//                 quote: "The negotiation tools saved me countless hours. Best platform I've used!",
//                 author: "John Smith",
//                 role: "Online Retailer"
//               },
//               {
//                 quote: "Security and ease of use make SAILER stand out from the competition.",
//                 author: "Sarah Johnson",
//                 role: "Digital Entrepreneur"
//               }
//             ].map((testimonial, index) => (
//               <blockquote key={index} className="p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
//                 <p className="text-lg text-white/90 mb-6">
//                   "{testimonial.quote}"
//                 </p>
//                 <footer>
//                   <div className="font-medium text-white">{testimonial.author}</div>
//                   <div className="text-cyan-400 text-sm">{testimonial.role}</div>
//                 </footer>
//               </blockquote>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-24 bg-gradient-to-b from-blue-900/50 to-blue-950/50 text-center">
//         <div className="max-w-4xl mx-auto px-8">
//           <h3 className="text-4xl font-bold text-white mb-6">
//             Ready to Transform Your E-commerce Journey?
//           </h3>
//           <p className="text-xl text-white/90 mb-12">
//             Join thousands of successful businesses already using SAILER
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-white font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
//               Start Free Trial
//             </button>
//             <button className="px-8 py-4 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-medium rounded-full border border-white/20 transition-all duration-300">
//               Schedule Demo
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="py-8 bg-blue-950/80 backdrop-blur-md text-center">
//         <p className="text-sm text-white/70">
//           © {new Date().getFullYear()} SAILER. All rights reserved.
//         </p>
//       </footer>
//     </div>
//   );
// }


"use client";

import Link from "next/link";
import React from "react";
import Navbar from "./components/Navbar";
import { Anchor, ShoppingBag, Shield, Zap } from "lucide-react";


export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-500/30 via-blue-800 to-blue-950">
      <div className="absolute inset-0 bg-[url('/bgOcean.jpeg')] bg-cover bg-center" />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-blue-900/80 " />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="space-y-6">
            <div className="inline-block animate-float">
              <span className="px-4 py-2 rounded-full bg-black/30 backdrop-blur-md border border-white/20 text-white text-sm font-medium shadow-lg">
                🌊 Dive into the future of e-commerce
              </span>
            </div>
            
            <h1 className="text-7xl font-extrabold text-white tracking-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]">
              Don't Drown in the Sea of <br/>
              <span className="bg-gradient-to-r from-cyan-300 to-cyan-500 text-transparent bg-clip-text drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                E-commerce
              </span>
            </h1>
            
            <p className="mt-8 text-xl text-white max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
              Join <strong className="text-2xl font-bold">S<span className="text-cyan-300">AI</span>LER</strong> and navigate 
              through your deals with the power of AI. Transform your online business into a 
              smooth-sailing journey.
            </p>

            <div className="flex items-center justify-center gap-4 mt-12">
              <Link href="/seller">
                <button className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-white font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:-translate-y-1">
                  Get Started Free
                  <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </button>
              </Link>
              <button className="px-8 py-4 bg-black/30 backdrop-blur-md hover:bg-black/40 text-white font-medium rounded-full border border-white/20 transition-all duration-300 shadow-lg">
                Watch Demo
              </button>
            </div>

            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
              <div className="space-y-2">
                <h4 className="text-3xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">2M+</h4>
                <p className="text-sm text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">Active Users</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-3xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">$500M</h4>
                <p className="text-sm text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">Transactions</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-3xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">99.9%</h4>
                <p className="text-sm text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">Uptime</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-3xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">4.9/5</h4>
                <p className="text-sm text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">User Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-blue-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-8">
          <h3 className="text-4xl font-bold text-center text-white mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
            Features That Help You Set Sail
          </h3>
          <p className="text-center text-white max-w-2xl mx-auto mb-16 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
            Navigate the e-commerce waters with confidence using our powerful tools and features
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                icon: <Anchor className="w-6 h-6 text-cyan-300" />,
                title: "Smart Matching",
                description: "AI-powered system matches buyers and sellers seamlessly"
              },
              {
                icon: <Zap className="w-6 h-6 text-cyan-300" />,
                title: "Quick Negotiation",
                description: "Negotiate deals in just a few clicks with intuitive tools"
              },
              {
                icon: <Shield className="w-6 h-6 text-cyan-300" />,
                title: "Secure Transactions",
                description: "Keep your deals safe and hassle-free with our platform"
              },
              {
                icon: <ShoppingBag className="w-6 h-6 text-cyan-300" />,
                title: "Inventory Management",
                description: "Manage your products with powerful tracking tools"
              }
            ].map((feature, index) => (
              <div key={index} className="group p-8 rounded-2xl bg-black/30 border border-white/10 hover:bg-black/40 transition-all duration-300 hover:-translate-y-2 shadow-lg">
                <div className="p-3 rounded-lg bg-black/20 w-fit mb-4">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-white mb-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
                  {feature.title}
                </h4>
                <p className="text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-blue-900/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-8">
          <h3 className="text-4xl font-bold text-center text-white mb-16 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
            What Our Users Say
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "SAILER revolutionized how I approach e-commerce. The AI matching is incredible!",
                author: "Jane Cooper",
                role: "E-commerce Manager"
              },
              {
                quote: "The negotiation tools saved me countless hours. Best platform I've used!",
                author: "John Smith",
                role: "Online Retailer"
              },
              {
                quote: "Security and ease of use make SAILER stand out from the competition.",
                author: "Sarah Johnson",
                role: "Digital Entrepreneur"
              }
            ].map((testimonial, index) => (
              <blockquote key={index} className="p-8 bg-black/30 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-black/40 transition-all duration-300 shadow-lg">
                <p className="text-lg text-white mb-6 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
                  "{testimonial.quote}"
                </p>
                <footer>
                  <div className="font-medium text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">{testimonial.author}</div>
                  <div className="text-cyan-300 text-sm drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">{testimonial.role}</div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-blue-900/80 to-blue-950/80 text-center">
        <div className="max-w-4xl mx-auto px-8">
          <h3 className="text-4xl font-bold text-white mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
            Ready to Transform Your E-commerce Journey?
          </h3>
          <p className="text-xl text-white mb-12 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
            Join thousands of successful businesses already using SAILER
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-white font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
              Start Free Trial
            </button>
            <button className="px-8 py-4 bg-black/30 backdrop-blur-md hover:bg-black/40 text-white font-medium rounded-full border border-white/20 transition-all duration-300 shadow-lg">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-blue-950/90 backdrop-blur-md text-center">
        <p className="text-sm text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
          © {new Date().getFullYear()} SAILER. All rights reserved.
        </p>
      </footer>
    </div>
  );
}