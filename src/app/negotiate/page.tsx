// // "use client";

// // import { useSearchParams } from "next/navigation";
// // import { useState, useEffect } from "react";

// // export default function NegotiationPage() {
// //   const searchParams = useSearchParams();
// //   const productId = searchParams.get("productId");
// //   const [productDetails, setProductDetails] = useState<any>(null);
// //   const [chatHistory, setChatHistory] = useState<any[]>([]);
// //   const [buyerMessage, setBuyerMessage] = useState("");
// //   const [errorMessage, setErrorMessage] = useState("");
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     // Fetch product details
// //     const fetchProductDetails = async () => {
// //       if (!productId) {
// //         setErrorMessage("Product ID is missing.");
// //         setLoading(false);
// //         return;
// //       }

// //       try {
// //         const response = await fetch(`/api/product/${productId}`);
// //         if (response.ok) {
// //           const data = await response.json();
// //           setProductDetails(data);
// //         } else {
// //           setErrorMessage("Failed to fetch product details.");
// //         }
// //       } catch (error) {
// //         setErrorMessage("Something went wrong while fetching product details.");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchProductDetails();
// //   }, [productId]);

// //   const handleSendMessage = async () => {
// //     if (!buyerMessage.trim()) return;

// //     try {
// //       const response = await fetch(`/api/negotiation`, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           sessionId: `session-${productId}`,
// //           productDetails: productDetails?.metadata?.productDetails,
// //           buyerMessage,
// //           sellerMinimumPrice: productDetails?.metadata?.minimumPrice,
// //           rounds: chatHistory.length,
// //         }),
// //       });

// //       if (response.ok) {
// //         const data = await response.json();
// //         setChatHistory((prev) => [
// //           ...prev,
// //           { role: "user", content: buyerMessage },
// //           { role: "assistant", content: data.aiMessage },
// //         ]);
// //         setBuyerMessage("");
// //       } else {
// //         setErrorMessage("Negotiation failed. Please try again.");
// //       }
// //     } catch (error) {
// //       setErrorMessage("Something went wrong during negotiation. Please try again.");
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center min-h-screen text-gray-700 dark:text-gray-300">
// //         Loading product details...
// //       </div>
// //     );
// //   }

// //   if (errorMessage) {
// //     return (
// //       <div className="flex justify-center items-center min-h-screen text-red-500">
// //         {errorMessage}
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8">
// //       <h1 className="text-2xl font-bold mb-4">Negotiation</h1>
// //       {productDetails && (
// //         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-8">
// //           <h4 className="text-lg font-bold text-blue-600 dark:text-blue-400">
// //             {productDetails.metadata?.productDetails || "Unnamed Product"}
// //           </h4>
// //           <p className="text-gray-700 dark:text-gray-300">
// //             Category: {productDetails.metadata?.category || "N/A"}
// //           </p>
// //           <p className="text-gray-700 dark:text-gray-300">
// //             Price: £{productDetails.metadata?.price || "N/A"}
// //           </p>
// //           <p className="text-gray-700 dark:text-gray-300">
// //             Minimum Price: £{productDetails.metadata?.minimumPrice || "N/A"}
// //           </p>
// //         </div>
// //       )}

// //       <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
// //         <h2 className="text-xl font-bold mb-4">Chat</h2>
// //         <div className="mb-4 max-h-60 overflow-y-auto">
// //           {chatHistory.length > 0 ? (
// //             chatHistory.map((message, index) => (
// //               <div
// //                 key={index}
// //                 className={`${
// //                   message.role === "user"
// //                     ? "text-right text-blue-600 dark:text-blue-400"
// //                     : "text-left text-gray-700 dark:text-gray-300"
// //                 } mb-2`}
// //               >
// //                 <strong>{message.role === "user" ? "You" : "AI"}:</strong>{" "}
// //                 {message.content}
// //               </div>
// //             ))
// //           ) : (
// //             <p className="text-gray-500 dark:text-gray-400 text-center">
// //               No messages yet. Start the negotiation!
// //             </p>
// //           )}
// //         </div>

// //         <div className="flex space-x-4">
// //           <input
// //             type="text"
// //             value={buyerMessage}
// //             onChange={(e) => setBuyerMessage(e.target.value)}
// //             className="flex-grow px-4 py-2 border dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             placeholder="Type your message..."
// //           />
// //           <button
// //             onClick={handleSendMessage}
// //             className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
// //           >
// //             Send
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// // "use client";

// // import { useSearchParams } from "next/navigation";
// // import { useState } from "react";

// // export default function NegotiatePage() {
// //   const searchParams = useSearchParams();

// //   // Parse product metadata from query parameters
// //   const productMetadata = JSON.parse(searchParams.get("productMetadata") || "{}");

// //   // State for buyer's messages and AI responses
// //   const [buyerMessage, setBuyerMessage] = useState("");
// //   const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([
// //     { role: "system", content: `You are negotiating for ${productMetadata.productDetails}` },
// //   ]);
// //   const [rounds, setRounds] = useState(0);

// //   // Function to handle message submission
// //   const handleSendMessage = async () => {
// //     if (!buyerMessage.trim()) return;

// //     // Append buyer's message to chat history
// //     const updatedChatHistory = [
// //       ...chatHistory,
// //       { role: "user", content: buyerMessage },
// //     ];
// //     setChatHistory(updatedChatHistory);

// //     try {
// //       const response = await fetch("/api/negotiation", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           productMetadata,
// //           buyerMessage,
// //           rounds,
// //         }),
// //       });

// //       if (response.ok) {
// //         const data = await response.json();

// //         // Append AI response to chat history
// //         setChatHistory((prev) => [
// //           ...prev,
// //           { role: "assistant", content: data.message },
// //         ]);
// //         setRounds(data.rounds); // Update the round count
// //       } else {
// //         console.error("Negotiation failed. Please try again.");
// //       }
// //     } catch (error) {
// //       console.error("Error during negotiation:", error);
// //     }

// //     setBuyerMessage(""); // Clear input field
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
// //       <h1 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">
// //         Negotiation for {productMetadata.productDetails || "Unknown Product"}
// //       </h1>
// //       <p>Category: {productMetadata.category || "N/A"}</p>
// //       <p>Price: £{productMetadata.price || "N/A"}</p>
// //       <p>Minimum Price: £{productMetadata.minimumPrice || "N/A"}</p>

// //       {/* Chat Section */}
// //       <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
// //         <div className="h-64 overflow-y-auto">
// //           {chatHistory.map((message, index) => (
// //             <div
// //               key={index}
// //               className={`mb-4 ${
// //                 message.role === "user"
// //                   ? "text-right text-blue-700"
// //                   : "text-left text-gray-700"
// //               }`}
// //             >
// //               <p className="text-sm">
// //                 <strong>{message.role === "user" ? "You" : "AI"}:</strong>{" "}
// //                 {message.content}
// //               </p>
// //             </div>
// //           ))}
// //         </div>

// //         {/* Input Field */}
// //         <div className="mt-4 flex items-center space-x-2">
// //           <input
// //             type="text"
// //             className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
// //             placeholder="Type your message here..."
// //             value={buyerMessage}
// //             onChange={(e) => setBuyerMessage(e.target.value)}
// //           />
// //           <button
// //             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
// //             onClick={handleSendMessage}
// //           >
// //             Send
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// // "use client";

// // import { useSearchParams } from "next/navigation";
// // import { useState } from "react";

// // export default function NegotiatePage() {
// //   const searchParams = useSearchParams();

// //   // Parse product metadata from query parameters
// //   const productMetadata = JSON.parse(searchParams.get("productMetadata") || "{}");

// //   // State for buyer's messages and AI responses
// //   const [buyerMessage, setBuyerMessage] = useState("");
// //   const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([
// //     { role: "system", content: `You are negotiating for ${productMetadata.productDetails}` },
// //   ]);
// //   const [rounds, setRounds] = useState(0);

// //   // Function to handle message submission
// //   const handleSendMessage = async () => {
// //     if (!buyerMessage.trim()) return;

// //     // Append buyer's message to chat history
// //     setChatHistory((prev) => [
// //       ...prev,
// //       { role: "user", content: buyerMessage },
// //     ]);

// //     try {
// //       const response = await fetch("/api/negotiation", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           productMetadata,
// //           buyerMessage,
// //           rounds,
// //         }),
// //       });

// //       if (response.ok) {
// //         const data = await response.json();

// //         // Append AI response to chat history
// //         setChatHistory((prev) => [
// //           ...prev,
// //           { role: "assistant", content: data.aiMessage }, // Fixed the key for AI response
// //         ]);
// //         setRounds(data.rounds); // Update the round count
// //       } else {
// //         const errorResponse = await response.json();
// //         console.error("Negotiation failed:", errorResponse.error || "Unknown error.");
// //         setChatHistory((prev) => [
// //           ...prev,
// //           { role: "system", content: "Negotiation failed. Please try again." },
// //         ]);
// //       }
// //     } catch (error) {
// //       console.error("Error during negotiation:", error);
// //       setChatHistory((prev) => [
// //         ...prev,
// //         { role: "system", content: "An error occurred. Please try again later." },
// //       ]);
// //     }

// //     setBuyerMessage(""); // Clear input field
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
// //       <h1 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">
// //         Negotiation for {productMetadata.productDetails || "Unknown Product"}
// //       </h1>
// //       <p>Category: {productMetadata.category || "N/A"}</p>
// //       <p>Price: £{productMetadata.price || "N/A"}</p>
// //       <p>Minimum Price: £{productMetadata.minimumPrice || "N/A"}</p>

// //       {/* Chat Section */}
// //       <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
// //         <div className="h-64 overflow-y-auto">
// //           {chatHistory.map((message, index) => (
// //             <div
// //               key={index}
// //               className={`mb-4 ${
// //                 message.role === "user"
// //                   ? "text-right text-white"
// //                   : message.role === "assistant"
// //                   ? "text-left text-teal-200"
// //                   : "text-center text-red-500"
// //               }`}
// //             >
// //               <p className="text-sm">
// //                 <strong>{message.role === "user" ? "You" : message.role === "assistant" ? "AI" : "System"}:</strong>{" "}
// //                 {message.content}
// //               </p>
// //             </div>
// //           ))}
// //         </div>

// //         {/* Input Field */}
// //         <div className="mt-4 flex items-center space-x-2">
// //           <input
// //             type="text"
// //             className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
// //             placeholder="Type your message here..."
// //             value={buyerMessage}
// //             onChange={(e) => setBuyerMessage(e.target.value)}
// //           />
// //           <button
// //             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
// //             onClick={handleSendMessage}
// //           >
// //             Send
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// "use client";

// import { useSearchParams } from "next/navigation";
// import { useState } from "react";

// export default function NegotiatePage() {
//   const searchParams = useSearchParams();

//   // Parse product metadata from query parameters
//   const productMetadata = JSON.parse(searchParams.get("productMetadata") || "{}");

//   // State for buyer's messages and AI responses
//   const [buyerMessage, setBuyerMessage] = useState("");
//   const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([
//     {
//       role: "system",
//       content: `
//        You are an AI shopkeeper negotiating the sale of a product. Your primary goal is to maximize profits for the seller while maintaining professionalism, politeness, and persuasiveness. Strictly adhere to the following rules and guidelines:

//       1. **Product Details**:
//         - Name: {productDetails}
//         - Sticker Price: £{price}
//         - Minimum Acceptable Price (Secret): £{minimumPrice}

//       2. **Negotiation Rules**:
//         - **Never disclose the minimum acceptable price** under any circumstances.
//         - Always aim to keep counteroffers closer to the sticker price (£{price}) to maximize profit.
//         - Respond to offers below the minimum price with firm but polite rejections. Use phrases such as:
//           - "That offer is too low for this premium product."
//           - "This product is worth more due to its quality and demand."
//           - "We cannot accept that offer, but let me provide a better option."
//         - When making counteroffers:
//           - Gradually reduce the price in small increments, but never below the minimum acceptable price.
//           - Justify counteroffers by emphasizing the product's value, exclusivity, and quality.
//           - Counteroffers should aim to bring the buyer closer to the sticker price rather than the minimum.

//       3. **Response Strategy**:
//         - Always justify the pricing decisions. Highlight the product's features, value, and market demand.
//         - If the buyer persists with offers below the minimum, reiterate the quality and value of the product and refuse to lower the price further.
//         - Avoid using apologetic language such as "I'm sorry" for rejecting low offers. Instead, focus on explaining the fairness of the pricing.
//         - If the buyer proposes a reasonable price near the sticker price, consider closing the deal or offering small incentives, such as a free accessory.

//       4. **Termination of Negotiation**:
//         - Limit the negotiation to **3 rounds**.
//         - If no agreement is reached after 3 rounds, politely inform the buyer:
//           - "This is our final price. Thank you for your interest in this product."
//         - Ensure you remain polite and professional even if the buyer refuses the final price.

//       ### Examples:
//       - **Scenario**:
//         - Sticker Price: £1299
//         - Minimum Price: £1199
//         - Buyer offers £1000.
        
//       - **Response**:
//         - "Thank you for your interest, but £1000 is far too low for this premium iPhone 15 Pro. This device is one of the most advanced on the market, reflecting its exceptional quality and demand. I can offer it to you for £1250, which is a significant reduction from the original price."

//       - **Buyer Counteroffers £1210**:
//         - "£1210 is closer, but it's still below what we can accept. How about £1235? This is an excellent deal considering the value of this device."

//       - **Final Offer**:
//         - "£1235 is our final price. To make this deal even better, I’ll include a premium screen protector and a fast-charging cable at no extra cost."

//       Adhere strictly to these rules, and ensure your responses are persuasive, professional, and focused on maximizing profit without revealing sensitive pricing details.
//       `,
//     },
//   ]);
//   const [rounds, setRounds] = useState(0);

//   // Function to handle message submission
//   const handleSendMessage = async () => {
//     if (!buyerMessage.trim()) return;

//     // Append buyer's message to chat history
//     setChatHistory((prev) => [
//       ...prev,
//       { role: "user", content: buyerMessage },
//     ]);

//     try {
//       const response = await fetch("/api/negotiation", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           productMetadata,
//           buyerMessage,
//           rounds,
//         }),
//       });

//       if (response.ok) {
//         const data = await response.json();

//         // Append AI response to chat history
//         setChatHistory((prev) => [
//           ...prev,
//           { role: "assistant", content: data.aiMessage },
//         ]);
//         setRounds(data.rounds); // Update the round count
//       } else {
//         const errorResponse = await response.json();
//         console.error("Negotiation failed:", errorResponse.error || "Unknown error.");
//         setChatHistory((prev) => [
//           ...prev,
//           { role: "system", content: "Negotiation failed. Please try again." },
//         ]);
//       }
//     } catch (error) {
//       console.error("Error during negotiation:", error);
//       setChatHistory((prev) => [
//         ...prev,
//         { role: "system", content: "An error occurred. Please try again later." },
//       ]);
//     }

//     setBuyerMessage(""); // Clear input field
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
//       <h1 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">
//         Negotiation for {productMetadata.productDetails || "Unknown Product"}
//       </h1>
//       <p>Category: {productMetadata.category || "N/A"}</p>
//       <p>Price: £{productMetadata.price || "N/A"}</p>
//       <p>Minimum Price: £{productMetadata.minimumPrice || "N/A"}</p>

//       {/* Chat Section */}
//       <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
//         <div className="h-64 overflow-y-auto">
//           {chatHistory.map((message, index) => (
//             <div
//               key={index}
//               className={`mb-4 ${
//                 message.role === "user"
//                   ? "text-right text-white"
//                   : message.role === "assistant"
//                   ? "text-left text-teal-200"
//                   : "text-center text-red-500"
//               }`}
//             >
//               <p className="text-sm">
//                 <strong>{message.role === "user" ? "You" : message.role === "assistant" ? "AI" : "System"}:</strong>{" "}
//                 {message.content}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* Input Field */}
//         <div className="mt-4 flex items-center space-x-2">
//           <input
//             type="text"
//             className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
//             placeholder="Type your message here..."
//             value={buyerMessage}
//             onChange={(e) => setBuyerMessage(e.target.value)}
//           />
//           <button
//             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
//             onClick={handleSendMessage}
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


// "use client";

// import { useSearchParams } from "next/navigation";
// import { useState } from "react";

// export default function NegotiatePage() {
//   const searchParams = useSearchParams();

//   // Parse product metadata from query parameters
//   const productMetadata = JSON.parse(searchParams.get("productMetadata") || "{}");

//   // State for buyer's messages and AI responses
//   const [buyerMessage, setBuyerMessage] = useState("");
//   const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([
//     {
//       role: "system",
//       content: `
//         You are an AI shopkeeper negotiating a product sale.
//         Product details: ${productMetadata.productDetails}.
//         Rules:
//         - Never agree to a price below £${productMetadata.minimumPrice}.
//         - Never tell the buyer what the minimum price is and never display £${productMetadata.minimumPrice}
//         - Make counteroffers closer to £${productMetadata.price} to maximize profit.
//         - Ensure to make only small decrements in sale price.
//         - Stay closer to £${productMetadata.price} than £${productMetadata.minimumPrice} when negotiating as profit is important.
//         - Respond firmly but politely to offers below the minimum price.
//         - Justify pricing by highlighting the product's quality and demand.
//         - Limit negotiation to 3 rounds if no agreement is reached.
//       `,
//     },
//   ]);
//   const [rounds, setRounds] = useState(0);

//   // Function to handle message submission
//   // const handleSendMessage = async () => {
//   //   if (!buyerMessage.trim()) return;

//   //   // Append buyer's message to chat history
//   //   setChatHistory((prev) => [
//   //     ...prev,
//   //     { role: "user", content: buyerMessage },
//   //   ]);

//   //   try {
//   //     const response = await fetch("/api/negotiation", {
//   //       method: "POST",
//   //       headers: { "Content-Type": "application/json" },
//   //       body: JSON.stringify({
//   //         productMetadata,
//   //         buyerMessage,
//   //         rounds,
//   //       }),
//   //     });

//   //     if (response.ok) {
//   //       const data = await response.json();

//   //       // Append AI response to chat history
//   //       setChatHistory((prev) => [
//   //         ...prev,
//   //         { role: "assistant", content: data.aiMessage },
//   //       ]);
//   //       setRounds(data.rounds); // Update the round count
//   //     } else {
//   //       const errorResponse = await response.json();
//   //       console.error("Negotiation failed:", errorResponse.error || "Unknown error.");
//   //       setChatHistory((prev) => [
//   //         ...prev,
//   //         { role: "system", content: "Negotiation failed. Please try again." },
//   //       ]);
//   //     }
//   //   } catch (error) {
//   //     console.error("Error during negotiation:", error);
//   //     setChatHistory((prev) => [
//   //       ...prev,
//   //       { role: "system", content: "An error occurred. Please try again later." },
//   //     ]);
//   //   }

//   //   setBuyerMessage(""); // Clear input field
//   // };

//   const handleSendMessage = async () => {
//     if (!buyerMessage.trim()) return;
  
//     // Append buyer's message to chat history
//     setChatHistory((prev) => [
//       ...prev,
//       { role: "user", content: buyerMessage },
//     ]);
  
//     try {
//       const response = await fetch("/api/negotiation", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           productMetadata,
//           buyerMessage,
//           rounds,
//         }),
//       });
  
//       if (response.ok) {
//         const data = await response.json();
  
//         // Check for backend logic enforcement
//         if (data.aiMessage.includes(productMetadata.minimumPrice)) {
//           console.warn("AI disclosed the minimum price, which should not happen.");
//         }
  
//         // Append AI response to chat history
//         setChatHistory((prev) => [
//           ...prev,
//           { role: "assistant", content: data.aiMessage },
//         ]);
//         setRounds(data.rounds); // Update the round count
  
//         // End negotiation if max rounds are reached
//         if (data.rounds >= 3) {
//           setChatHistory((prev) => [
//             ...prev,
//             { role: "system", content: "Negotiation complete. Final offer provided." },
//           ]);
//         }
//       } else {
//         const errorResponse = await response.json();
//         console.error("Negotiation failed:", errorResponse.error || "Unknown error.");
//         setChatHistory((prev) => [
//           ...prev,
//           { role: "system", content: "Negotiation failed. Please try again." },
//         ]);
//       }
//     } catch (error) {
//       console.error("Error during negotiation:", error);
//       setChatHistory((prev) => [
//         ...prev,
//         { role: "system", content: "An error occurred. Please try again later." },
//       ]);
//     }
  
//     setBuyerMessage(""); // Clear input field
//   };
  

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
//       <h1 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">
//         Negotiation for {productMetadata.productDetails || "Unknown Product"}
//       </h1>
//       <p>Category: {productMetadata.category || "N/A"}</p>
//       <p>Price: £{productMetadata.price || "N/A"}</p>
//       {/* <p>Minimum Price: £{productMetadata.minimumPrice || "N/A"}</p> */}

//       {/* Chat Section */}
//       <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
//         <div className="h-64 overflow-y-auto">
//           {chatHistory.map((message, index) => (
//             <div
//               key={index}
//               className={`mb-4 ${
//                 message.role === "user"
//                   ? "text-right text-white"
//                   : message.role === "assistant"
//                   ? "text-left text-teal-200"
//                   : "text-center text-red-500"
//               }`}
//             >
//               <p className="text-sm">
//                 <strong>
//                   {message.role === "user"
//                     ? "You"
//                     : message.role === "assistant"
//                     ? "AI"
//                     : "System"}
//                   :
//                 </strong>{" "}
//                 {message.content}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* Input Field */}
//         <div className="mt-4 flex items-center space-x-2">
//           <input
//             type="text"
//             className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
//             placeholder="Type your message here..."
//             value={buyerMessage}
//             onChange={(e) => setBuyerMessage(e.target.value)}
//           />
//           <button
//             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
//             onClick={handleSendMessage}
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function NegotiatePage() {
  const searchParams = useSearchParams();

  // Parse product metadata from query parameters
  const productMetadata = JSON.parse(searchParams.get("productMetadata") || "{}");

  // State for buyer's messages and AI responses
  const [buyerMessage, setBuyerMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([]);
  const [rounds, setRounds] = useState(0);

  // Function to handle message submission
  const handleSendMessage = async () => {
    if (!buyerMessage.trim()) return;

    // Append buyer's message to chat history
    setChatHistory((prev) => [
      ...prev,
      { role: "user", content: buyerMessage },
    ]);

    try {
      const response = await fetch("/api/negotiation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productMetadata,
          buyerMessage,
          rounds,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        // Append AI response to chat history
        setChatHistory((prev) => [
          ...prev,
          { role: "assistant", content: data.aiMessage },
        ]);
        setRounds(data.rounds); // Update the round count

        // Indicate end of negotiation if max rounds are reached
        if (data.rounds >= 3) {
          setChatHistory((prev) => [
            ...prev,
            { role: "system", content: "Negotiation complete. Final offer provided." },
          ]);
        }
      } else {
        const errorResponse = await response.json();
        console.error("Negotiation failed:", errorResponse.error || "Unknown error.");
        setChatHistory((prev) => [
          ...prev,
          { role: "system", content: "Negotiation failed. Please try again." },
        ]);
      }
    } catch (error) {
      console.error("Error during negotiation:", error);
      setChatHistory((prev) => [
        ...prev,
        { role: "system", content: "An error occurred. Please try again later." },
      ]);
    }

    setBuyerMessage(""); // Clear input field
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-teal-500 to-blue-600 [background-image:linear-gradient(to_bottom_right,rgba(16,185,129,0.8),rgba(20,184,166,0.7),rgba(37,99,235,0.8)),url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1Ii8+PC9zdmc+')] flex justify-center items-center p-6">
      <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
          Negotiation for {productMetadata.productDetails || "Unknown Product"}
        </h1>
        <p className="mb-2 text-gray-700">
          <strong>Category:</strong> {productMetadata.category || "N/A"}
        </p>
        <p className="mb-6 text-gray-700">
          <strong>Price:</strong> £{productMetadata.price || "N/A"}
        </p>

        {/* Chat Section */}
        <div className="bg-white p-4 rounded-lg shadow-inner h-64 overflow-y-auto mb-6">
          {chatHistory.length > 0 ? (
            chatHistory.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  message.role === "user"
                    ? "text-right text-blue-700"
                    : message.role === "assistant"
                    ? "text-left text-emerald-700"
                    : "text-center text-gray-500"
                }`}
              >
                <p className="text-sm">
                  <strong>
                    {message.role === "user"
                      ? "You"
                      : message.role === "assistant"
                      ? "AI"
                      : "System"}
                    :
                  </strong>{" "}
                  {message.content}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">
              Start the negotiation by typing your message below.
            </p>
          )}
        </div>

        {/* Input Field */}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow duration-200"
            placeholder="Type your message here..."
            value={buyerMessage}
            onChange={(e) => setBuyerMessage(e.target.value)}
          />
          <button
            className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-bold px-4 py-2 rounded-lg shadow-lg transition-transform duration-300 transform hover:-translate-y-1"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
