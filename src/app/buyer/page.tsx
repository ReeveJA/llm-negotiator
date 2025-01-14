// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function BuyerForm() {
//   const [requirements, setRequirements] = useState("");
//   const [category, setCategory] = useState("");
//   const [minPrice, setMinPrice] = useState("");
//   const [maxPrice, setMaxPrice] = useState("");
//   const [topK, setTopK] = useState(10);
//   const router = useRouter();

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     // Redirect to the results page with the query parameters
//     const query = new URLSearchParams({
//       requirements,
//       category,
//       minPrice,
//       maxPrice,
//       topK: topK.toString(),
//     });

//     router.push(`/buyer/results?${query.toString()}`);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex justify-center items-center">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center">Find Your Product</h2>
//         <div className="mb-4">
//           <label className="block text-gray-700 dark:text-gray-300 mb-2">
//             Requirements
//           </label>
//           <input
//             type="text"
//             value={requirements}
//             onChange={(e) => setRequirements(e.target.value)}
//             required
//             className="w-full px-4 py-2 border text-black dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 dark:text-gray-300 mb-2">
//             Category (Optional)
//           </label>
//           <input
//             type="text"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             className="w-full px-4 py-2 border text-black dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="e.g., smartphones, laptops"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 dark:text-gray-300 mb-2">
//             Minimum Price (Optional)
//           </label>
//           <input
//             type="number"
//             value={minPrice}
//             onChange={(e) => setMinPrice(e.target.value)}
//             className="w-full px-4 py-2 border text-black dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 dark:text-gray-300 mb-2">
//             Maximum Price (Optional)
//           </label>
//           <input
//             type="number"
//             value={maxPrice}
//             onChange={(e) => setMaxPrice(e.target.value)}
//             className="w-full px-4 py-2 border text-black dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div className="mb-6">
//           <label className="block text-gray-700 dark:text-gray-300 mb-2">
//             Number of Results (Top K)
//           </label>
//           <input
//             type="number"
//             value={topK}
//             onChange={(e) => setTopK(Number(e.target.value))}
//             min="1"
//             className="w-full px-4 py-2 border text-gray-400 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full"
//         >
//           Search
//         </button>
//       </form>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BuyerForm() {
  const [requirements, setRequirements] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [topK, setTopK] = useState(10);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Redirect to the results page with the query parameters
    const query = new URLSearchParams({
      requirements,
      category,
      minPrice,
      maxPrice,
      topK: topK.toString(),
    });

    router.push(`/buyer/results?${query.toString()}`);
  };

  return (
    <div className="min-h-screen bg-blue-900/90 flex justify-center items-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
          Find Your Product
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Requirements</label>
            <input
              type="text"
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              required
              className="w-full px-4 py-2 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow duration-200"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Category (Optional)</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow duration-200"
            >
              <option value="">Select a category</option>
              <option value="smartphones">Smartphones</option>
              <option value="laptops">Laptops</option>
              <option value="appliances">Appliances</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Minimum Price (Optional)</label>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full px-4 py-2 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow duration-200"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Maximum Price (Optional)</label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full px-4 py-2 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow duration-200"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Number of Results (Top K)</label>
            <input
              type="number"
              value={topK}
              onChange={(e) => setTopK(Number(e.target.value))}
              min="1"
              className="w-full px-4 py-2 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow duration-200"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

