// "use client";

// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import { useRouter} from "next/navigation";

// export default function BuyerResults() {
//     const router = useRouter()
//   const searchParams = useSearchParams();
//   const [results, setResults] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const handleAccept = (product: any) => {
//     console.log("Accepting product:", product.id);
//     // Placeholder for backend logic to accept the product
//     // Example: call `/api/accept` endpoint in the future
//   };

//   // Function to handle Decline
//   const handleDecline = (product: any) => {
//     console.log("Declining product:", product.id);
//     // Placeholder for backend logic to decline the product
//     // Example: call `/api/decline` endpoint in the future
//   };

//   // Function to handle Negotiate
//   const handleNegotiate = (product: any) => {
//     console.log("Starting negotiation for product:", product.id);
//     // Redirect to the negotiation page with productId
//     router.push(`/negotiate?productId=${product.id}`);
//   };


//   useEffect(() => {
//     const fetchResults = async () => {
//       setLoading(true);
//       setError("");

//       const query = {
//         requirements: searchParams.get("requirements") || "",
//         topK: parseInt(searchParams.get("topK") || "10"),
//         filters: {
//           category: searchParams.get("category") || undefined,
//           price: {
//             min: searchParams.get("minPrice")
//               ? parseInt(searchParams.get("minPrice") || "0")
//               : undefined,
//             max: searchParams.get("maxPrice")
//               ? parseInt(searchParams.get("maxPrice") || "0")
//               : undefined,
//           },
//         },
//       };

//       try {
//         const response = await fetch("/api/query", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(query),
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setResults(data.matches || []);
//         } else {
//           setError("Failed to fetch results. Please try again.");
//         }
//       } catch (error) {
//         setError("Something went wrong. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchResults();
//   }, [searchParams]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen text-gray-700 dark:text-gray-300">
//         Loading results...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center min-h-screen text-red-500">
//         {error}
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8">
//       <h1 className="text-2xl font-bold mb-8 text-center">Search Results</h1>
//       {results.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {results.map((result, index) => (
//             // <div
//             //   key={index}
//             //   className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
//             // >
//             //   <h4 className="text-lg font-bold text-blue-600 dark:text-blue-400">
//             //     {result.metadata?.productDetails || "Unnamed Product"}
//             //   </h4>
//             //   <p className="text-gray-700 dark:text-gray-300">
//             //     Category: {result.metadata?.category || "N/A"}
//             //   </p>
//             //   <p className="text-gray-700 dark:text-gray-300">
//             //     Price: £{result.metadata?.price || "N/A"}
//             //   </p>
//             //   <p className="text-gray-700 dark:text-gray-300">
//             //     Minimum Price: £{result.metadata?.minimumPrice || "N/A"}
//             //   </p>
//             // </div>
//             <div
//                 key={index}
//                 className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
//                 >
//                 <h4 className="text-lg font-bold text-blue-600 dark:text-blue-400">
//                     {result.metadata?.productDetails || "Unnamed Product"}
//                 </h4>
//                 <p className="text-gray-700 dark:text-gray-300">
//                     Category: {result.metadata?.category || "N/A"}
//                 </p>
//                 <p className="text-gray-700 dark:text-gray-300">
//                     Price: £{result.metadata?.price || "N/A"}
//                 </p>
//                 <p className="text-gray-700 dark:text-gray-300">
//                     Minimum Price: £{result.metadata?.minimumPrice || "N/A"}
//                 </p>

//                 {/* Buttons */}
//                 <div className="mt-4 flex space-x-4">
//                     <button
//                     className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
//                     onClick={() => handleAccept(result)}
//                     >
//                     Accept
//                     </button>
//                     <button
//                     className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
//                     onClick={() => handleDecline(result)}
//                     >
//                     Decline
//                     </button>
//                     <button
//                     className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
//                     onClick={() => handleNegotiate(result)}
//                     >
//                     Negotiate
//                     </button>
//                 </div>
//             </div>

//           ))}
//         </div>
//       ) : (
//         <p className="text-gray-500 dark:text-gray-400 text-center">
//           No results found.
//         </p>
//       )}
//     </div>
//   );
// }


"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function BuyerResults() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleAccept = (product: any) => {
    console.log("Accepting product:", product.id);
    // Placeholder for backend logic to accept the product
  };

  const handleDecline = (product: any) => {
    console.log("Declining product:", product.id);
    // Placeholder for backend logic to decline the product
  };

  const handleNegotiate = (product: any) => {
    console.log("Starting negotiation for product:", product);
  
    // Serialize the product metadata into a query string
    const query = new URLSearchParams({
      productMetadata: JSON.stringify(product.metadata),
    }).toString();
  
    // Redirect to the negotiation page with the serialized query
    router.push(`/negotiate?${query}`);
  };

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError("");

      const query = {
        requirements: searchParams.get("requirements") || "",
        topK: parseInt(searchParams.get("topK") || "10"),
        filters: {
          category: searchParams.get("category") || undefined,
          price: {
            min: searchParams.get("minPrice")
              ? parseInt(searchParams.get("minPrice") || "0")
              : undefined,
            max: searchParams.get("maxPrice")
              ? parseInt(searchParams.get("maxPrice") || "0")
              : undefined,
          },
        },
      };

      try {
        const response = await fetch("/api/query", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(query),
        });

        if (response.ok) {
          const data = await response.json();
          setResults(data.matches || []);
        } else {
          setError("Failed to fetch results. Please try again.");
        }
      } catch (error) {
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-700 dark:text-gray-300">
        Loading results...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-8 text-center">Search Results</h1>
      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {results.map((result, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
            >
              <h4 className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {result.metadata?.productDetails || "Unnamed Product"}
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                Category: {result.metadata?.category || "N/A"}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Price: £{result.metadata?.price || "N/A"}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Minimum Price: £{result.metadata?.minimumPrice || "N/A"}
              </p>

              {/* Buttons */}
              <div className="mt-4 flex space-x-4">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleAccept(result)}
                >
                  Accept
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDecline(result)}
                >
                  Decline
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleNegotiate(result)}
                >
                  Negotiate
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400 text-center">
          No results found.
        </p>
      )}
    </div>
  );
}
