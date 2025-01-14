// "use client";

// import { useState } from "react";

// export default function SellerForm() {
//   const [productDetails, setProductDetails] = useState("");
//   const [price, setPrice] = useState("");
//   const [minimumPrice, setMinimumPrice] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Validate inputs
//     if (!productDetails || !price || !minimumPrice) {
//       setErrorMessage("All fields are required.");
//       return;
//     }

//     if (Number(minimumPrice) > Number(price)) {
//       setErrorMessage("Minimum price cannot be greater than the listed price.");
//       return;
//     }

//     // Prepare payload
//     const payload = {
//       productDetails,
//       metadata: {
//         price: Number(price),
//         minimumPrice: Number(minimumPrice),
//       },
//     };

//     try {
//       const response = await fetch("/api/seller", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setSuccessMessage(`Product saved successfully! Product ID: ${data.productId}`);
//         setErrorMessage("");
//         setProductDetails("");
//         setPrice("");
//         setMinimumPrice("");
//       } else {
//         const errorData = await response.json();
//         setErrorMessage(errorData.message || "Error saving product.");
//         setSuccessMessage("");
//       }
//     } catch (error) {
//       setErrorMessage("Something went wrong. Please try again.");
//       setSuccessMessage("");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex justify-center items-center">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center">
//           List Your Product
//         </h2>
//         {successMessage && (
//           <p className="mb-4 text-green-500">{successMessage}</p>
//         )}
//         {errorMessage && (
//           <p className="mb-4 text-red-500">{errorMessage}</p>
//         )}
//         <div className="mb-4">
//           <label className="block text-gray-700 dark:text-gray-300 mb-2">
//             Product Details
//           </label>
//           <input
//             type="text"
//             value={productDetails}
//             onChange={(e) => setProductDetails(e.target.value)}
//             required
//             className="w-full px-4 py-2 border dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 dark:text-gray-300 mb-2">
//             Price
//           </label>
//           <input
//             type="number"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             required
//             className="w-full px-4 py-2 border dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div className="mb-6">
//           <label className="block text-gray-700 dark:text-gray-300 mb-2">
//             Minimum Price
//           </label>
//           <input
//             type="number"
//             value={minimumPrice}
//             onChange={(e) => setMinimumPrice(e.target.value)}
//             required
//             className="w-full px-4 py-2 border dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }


// "use client";

// import { useState } from "react";

// export default function SellerForm() {
//   const [productDetails, setProductDetails] = useState("");
//   const [price, setPrice] = useState("");
//   const [minimumPrice, setMinimumPrice] = useState("");
//   const [category, setCategory] = useState("");
//   const [isUsed, setIsUsed] = useState(false); // Tracks whether the "Used" button is clicked
//   const [condition, setCondition] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Validation
//     if (!productDetails || !price || !minimumPrice || !category) {
//       setErrorMessage("All required fields must be filled.");
//       return;
//     }

//     if (Number(minimumPrice) > Number(price)) {
//       setErrorMessage("Minimum price cannot be greater than the listed price.");
//       return;
//     }

//     // Prepare Payload
//     const payload = {
//       productDetails,
//       metadata: {
//         price: Number(price),
//         minimumPrice: Number(minimumPrice),
//         category,
//         used: isUsed,
//         condition: isUsed ? condition : undefined, // Include condition only if used
//       },
//     };

//     try {
//       const response = await fetch("/api/seller", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setSuccessMessage(`Product saved successfully! Product ID: ${data.productId}`);
//         setErrorMessage("");
//         setProductDetails("");
//         setPrice("");
//         setMinimumPrice("");
//         setCategory("");
//         setIsUsed(false);
//         setCondition("");
//       } else {
//         const errorData = await response.json();
//         setErrorMessage(errorData.message || "Error saving product.");
//         setSuccessMessage("");
//       }
//     } catch (error) {
//       setErrorMessage("Something went wrong. Please try again.");
//       setSuccessMessage("");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex justify-center items-center">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center">
//           List Your Product
//         </h2>
//         {successMessage && (
//           <p className="mb-4 text-green-500">{successMessage}</p>
//         )}
//         {errorMessage && (
//           <p className="mb-4 text-red-500">{errorMessage}</p>
//         )}

//         {/* Product Details */}
//         <div className="mb-4">
//           <label className="block text-gray-700 dark:text-gray-300 mb-2">
//             Product Details
//           </label>
//           <input
//             type="text"
//             value={productDetails}
//             onChange={(e) => setProductDetails(e.target.value)}
//             required
//             className="w-full px-4 py-2 border text-black dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {/* Price */}
//         <div className="mb-4">
//           <label className="block text-gray-700 dark:text-gray-300 mb-2">
//             Price
//           </label>
//           <input
//             type="number"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             required
//             className="w-full px-4 py-2 border text-black dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {/* Minimum Price */}
//         <div className="mb-4">
//           <label className="block text-gray-700 dark:text-gray-300 mb-2">
//             Minimum Price
//           </label>
//           <input
//             type="number"
//             value={minimumPrice}
//             onChange={(e) => setMinimumPrice(e.target.value)}
//             required
//             className="w-full px-4 py-2 border text-black dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {/* Category */}
//         <div className="mb-4">
//           <label className="block text-gray-700 dark:text-gray-300 mb-2">
//             Category
//           </label>
//           <select
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             required
//             className="w-full px-4 py-2 border text-gray-500 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">Select a category</option>
//             <option value="smartphones">Smartphones</option>
//             <option value="laptops">Laptops</option>
//             <option value="appliances">Appliances</option>
//           </select>
//         </div>

//         {/* Used Button */}
//         <div className="mb-4">
//           <button
//             type="button"
//             onClick={() => setIsUsed((prev) => !prev)}
//             className={`py-2 px-4 rounded ${
//               isUsed
//                 ? "bg-red-500 text-white"
//                 : "bg-gray-300 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
//             }`}
//           >
//             {isUsed ? "Mark as New" : "Mark as Used"}
//           </button>
//         </div>

//         {/* Condition Dropdown (Only if Used) */}
//         {isUsed && (
//           <div className="mb-4">
//             <label className="block text-gray-700 dark:text-gray-300 mb-2">
//               Condition
//             </label>
//             <select
//               value={condition}
//               onChange={(e) => setCondition(e.target.value)}
//               required
//               className="w-full px-4 py-2 border text-gray-500 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">Select condition</option>
//               <option value="fair">Fair</option>
//               <option value="good">Good</option>
//               <option value="excellent">Excellent</option>
//             </select>
//           </div>
//         )}

//         <button
//           type="submit"
//           className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }


// "use client";

// import { useState } from "react";

// export default function SellerForm() {
//   const [productDetails, setProductDetails] = useState("");
//   const [price, setPrice] = useState("");
//   const [minimumPrice, setMinimumPrice] = useState("");
//   const [category, setCategory] = useState("");
//   const [isUsed, setIsUsed] = useState(false);
//   const [condition, setCondition] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!productDetails || !price || !minimumPrice || !category) {
//       setErrorMessage("All required fields must be filled.");
//       return;
//     }

//     if (Number(minimumPrice) > Number(price)) {
//       setErrorMessage("Minimum price cannot be greater than the listed price.");
//       return;
//     }

//     const payload = {
//       productDetails,
//       metadata: {
//         price: Number(price),
//         minimumPrice: Number(minimumPrice),
//         category,
//         used: isUsed,
//         condition: isUsed ? condition : undefined,
//       },
//     };

//     try {
//       const response = await fetch("/api/seller", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setSuccessMessage(`Product saved successfully! Product ID: ${data.productId}`);
//         setErrorMessage("");
//         setProductDetails("");
//         setPrice("");
//         setMinimumPrice("");
//         setCategory("");
//         setIsUsed(false);
//         setCondition("");
//       } else {
//         const errorData = await response.json();
//         setErrorMessage(errorData.message || "Error saving product.");
//         setSuccessMessage("");
//       }
//     } catch (error) {
//       setErrorMessage("Something went wrong. Please try again.");
//       setSuccessMessage("");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-teal-500 to-blue-600 [background-image:linear-gradient(to_bottom_right,rgba(16,185,129,0.8),rgba(20,184,166,0.7),rgba(37,99,235,0.8)),url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1Ii8+PC9zdmc+')] flex justify-center items-center p-6">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] w-full max-w-md"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
//           List Your Product
//         </h2>
//         {successMessage && (
//           <p className="mb-4 text-emerald-500 bg-emerald-50 p-3 rounded-lg">{successMessage}</p>
//         )}
//         {errorMessage && (
//           <p className="mb-4 text-red-500 bg-red-50 p-3 rounded-lg">{errorMessage}</p>
//         )}

//         <div className="space-y-4">
//           <div>
//             <label className="block text-gray-700 mb-2">
//               Product Details
//             </label>
//             <input
//               type="text"
//               value={productDetails}
//               onChange={(e) => setProductDetails(e.target.value)}
//               required
//               className="w-full px-4 py-2 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow duration-200"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 mb-2">
//               Price
//             </label>
//             <input
//               type="number"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               required
//               className="w-full px-4 py-2 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow duration-200"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 mb-2">
//               Minimum Price
//             </label>
//             <input
//               type="number"
//               value={minimumPrice}
//               onChange={(e) => setMinimumPrice(e.target.value)}
//               required
//               className="w-full px-4 py-2 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow duration-200"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 mb-2">
//               Category
//             </label>
//             <select
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               required
//               className="w-full px-4 py-2 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow duration-200"
//             >
//               <option value="">Select a category</option>
//               <option value="smartphones">Smartphones</option>
//               <option value="laptops">Laptops</option>
//               <option value="appliances">Appliances</option>
//             </select>
//           </div>

//           <div>
//             <button
//               type="button"
//               onClick={() => setIsUsed((prev) => !prev)}
//               className={`py-2 px-4 rounded-lg transition-all duration-300 ${
//                 isUsed
//                   ? "bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-xl"
//                   : "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg hover:shadow-xl"
//               }`}
//             >
//               {isUsed ? "Mark as New" : "Mark as Used"}
//             </button>
//           </div>

//           {isUsed && (
//             <div>
//               <label className="block text-gray-700 mb-2">
//                 Condition
//               </label>
//               <select
//                 value={condition}
//                 onChange={(e) => setCondition(e.target.value)}
//                 required
//                 className="w-full px-4 py-2 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow duration-200"
//               >
//                 <option value="">Select condition</option>
//                 <option value="fair">Fair</option>
//                 <option value="good">Good</option>
//                 <option value="excellent">Excellent</option>
//               </select>
//             </div>
//           )}

//           <button
//             type="submit"
//             className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
//           >
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }


"use client";

import { useState } from "react";

export default function SellerForm() {
  const [title, setTitle] = useState(""); // New state for title
  const [productDetails, setProductDetails] = useState("");
  const [price, setPrice] = useState("");
  const [minimumPrice, setMinimumPrice] = useState("");
  const [category, setCategory] = useState("");
  const [isUsed, setIsUsed] = useState(false);
  const [condition, setCondition] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !productDetails || !price || !minimumPrice || !category) {
      setErrorMessage("All required fields must be filled.");
      return;
    }

    if (Number(minimumPrice) > Number(price)) {
      setErrorMessage("Minimum price cannot be greater than the listed price.");
      return;
    }

    const payload = {
      title, // Include title
      productDetails,
      metadata: {
        price: Number(price),
        minimumPrice: Number(minimumPrice),
        category,
        used: isUsed,
        condition: isUsed ? condition : undefined,
      },
    };

    try {
      const response = await fetch("/api/seller", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(`Product saved successfully! Product ID: ${data.productId}`);
        setErrorMessage("");
        setTitle(""); // Clear title
        setProductDetails("");
        setPrice("");
        setMinimumPrice("");
        setCategory("");
        setIsUsed(false);
        setCondition("");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Error saving product.");
        setSuccessMessage("");
      }
    } catch (error) {
      setErrorMessage(`Something went wrong. Please try again. ${error}`);
      setSuccessMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br bg-blue-900/90 flex justify-center items-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
          List Your Product
        </h2>
        {successMessage && (
          <p className="mb-4 text-emerald-500 bg-emerald-50 p-3 rounded-lg">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="mb-4 text-red-500 bg-red-50 p-3 rounded-lg">{errorMessage}</p>
        )}

        <div className="space-y-4">
          {/* New Title Input */}
          <div>
            <label className="block text-gray-700 mb-2">Product Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow duration-200"
            />
          </div>
          {/* Existing Form Fields */}
          <div>
            <label className="block text-gray-700 mb-2">Product Details</label>
            <input
              type="text"
              value={productDetails}
              onChange={(e) => setProductDetails(e.target.value)}
              required
              className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow duration-200"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow duration-200"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Minimum Price</label>
            <input
              type="number"
              value={minimumPrice}
              onChange={(e) => setMinimumPrice(e.target.value)}
              required
              className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow duration-200"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow duration-200"
            >
              <option value="">Select a category</option>
              <option value="smartphones">Smartphones</option>
              <option value="laptops">Laptops</option>
              <option value="appliances">Appliances</option>
            </select>
          </div>
          <div>
            <button
              type="button"
              onClick={() => setIsUsed((prev) => !prev)}
              className={`py-2 px-4 rounded-lg transition-all duration-300 ${
                isUsed
                  ? "bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-xl"
                  : "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg hover:shadow-xl"
              }`}
            >
              {isUsed ? "Mark as New" : "Mark as Used"}
            </button>
          </div>
          {isUsed && (
            <div>
              <label className="block text-gray-700 mb-2">Condition</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                required
                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow duration-200"
              >
                <option value="">Select condition</option>
                <option value="fair">Fair</option>
                <option value="good">Good</option>
                <option value="excellent">Excellent</option>
              </select>
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
