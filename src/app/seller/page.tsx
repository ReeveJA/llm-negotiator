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


"use client";

import { useState } from "react";

export default function SellerForm() {
  const [productDetails, setProductDetails] = useState("");
  const [price, setPrice] = useState("");
  const [minimumPrice, setMinimumPrice] = useState("");
  const [category, setCategory] = useState("");
  const [isUsed, setIsUsed] = useState(false); // Tracks whether the "Used" button is clicked
  const [condition, setCondition] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!productDetails || !price || !minimumPrice || !category) {
      setErrorMessage("All required fields must be filled.");
      return;
    }

    if (Number(minimumPrice) > Number(price)) {
      setErrorMessage("Minimum price cannot be greater than the listed price.");
      return;
    }

    // Prepare Payload
    const payload = {
      productDetails,
      metadata: {
        price: Number(price),
        minimumPrice: Number(minimumPrice),
        category,
        used: isUsed,
        condition: isUsed ? condition : undefined, // Include condition only if used
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
      setErrorMessage("Something went wrong. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          List Your Product
        </h2>
        {successMessage && (
          <p className="mb-4 text-green-500">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="mb-4 text-red-500">{errorMessage}</p>
        )}

        {/* Product Details */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Product Details
          </label>
          <input
            type="text"
            value={productDetails}
            onChange={(e) => setProductDetails(e.target.value)}
            required
            className="w-full px-4 py-2 border text-black dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Price
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full px-4 py-2 border text-black dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Minimum Price */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Minimum Price
          </label>
          <input
            type="number"
            value={minimumPrice}
            onChange={(e) => setMinimumPrice(e.target.value)}
            required
            className="w-full px-4 py-2 border text-black dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full px-4 py-2 border text-gray-500 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a category</option>
            <option value="smartphones">Smartphones</option>
            <option value="laptops">Laptops</option>
            <option value="appliances">Appliances</option>
          </select>
        </div>

        {/* Used Button */}
        <div className="mb-4">
          <button
            type="button"
            onClick={() => setIsUsed((prev) => !prev)}
            className={`py-2 px-4 rounded ${
              isUsed
                ? "bg-red-500 text-white"
                : "bg-gray-300 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
            }`}
          >
            {isUsed ? "Mark as New" : "Mark as Used"}
          </button>
        </div>

        {/* Condition Dropdown (Only if Used) */}
        {isUsed && (
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Condition
            </label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              required
              className="w-full px-4 py-2 border text-gray-500 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
