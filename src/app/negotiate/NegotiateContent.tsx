// app/negotiate/NegotiateContent.tsx

"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

interface NegotiationData {
  details: string;
}

export default function NegotiateContent() {
  const searchParams = useSearchParams();

  // Parse product metadata from query parameters
  const productMetadata = JSON.parse(searchParams.get("productMetadata") || "{}");

  // State for buyer's messages, AI responses, and deal status
  const [buyerMessage, setBuyerMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<{ role: string; content: string; showOptions?: boolean }[]>([]);
  const [rounds, setRounds] = useState(0);
  const [dealClosed, setDealClosed] = useState(false); // Tracks if the deal is closed
  const [isTyping, setIsTyping] = useState(false); // Tracks if AI is typing
  const [offerAccepted, setOfferAccepted] = useState(false); // Tracks if the offer was accepted

  // Function to handle message submission
  const handleSendMessage = async (message: string) => {
    if (!message.trim() || dealClosed) return;

    // Append buyer's message to chat history
    setChatHistory((prev) => [
      ...prev,
      { role: "user", content: message },
    ]);

    setBuyerMessage("");
    setIsTyping(true); // Show typing indicator

    try {
      const response = await fetch("/api/negotiation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productMetadata,
          buyerMessage: message,
          rounds,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        // Append AI response to chat history
        setChatHistory((prev) => [
          ...prev,
          { role: "assistant", content: data.aiMessage, showOptions: !data.dealClosed },
        ]);

        setRounds(data.rounds); // Update round count
        setDealClosed(data.dealClosed); // Update deal status

        // If the deal is closed due to AI's final offer being accepted
        if (data.dealClosed) {
          setOfferAccepted(true); // Mark offer as accepted
          setIsTyping(false);
          return;
        }

        // Indicate end of negotiation if max rounds are reached
        if (data.rounds >= 3 && !data.dealClosed) {
          setChatHistory((prev) => [
            ...prev,
            { role: "system", content: "Negotiation complete. Final offer provided." },
          ]);
        }
      } else {
        const errorResponse = await response.json();
        setChatHistory((prev) => [
          ...prev,
          { role: "system", content: "Negotiation failed. Please try again." },
          { role: "system", content: JSON.stringify(errorResponse) },
        ]);
      }
    } catch (error: any) {
      setChatHistory((prev) => [
        ...prev,
        { role: "system", content: "An error occurred. Please try again later.", showOptions: false },
      ]);
    } finally {
      setIsTyping(false); // Hide typing indicator
    }
  };

  // Function to handle "Decline" action
  const handleDecline = () => {
    setChatHistory((prev) => [
      ...prev,
      { role: "assistant", content: "Do you have another offer in mind?", showOptions: false },
    ]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600/90 to-blue-800 flex flex-col items-center p-6">
      <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg w-full max-w-4xl">
        <Link href='/'>
          <h1 className="text-2xl italic font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
            S<span className="text-green-500">AI</span>LER
          </h1>
        </Link>
        <h1 className="text-lg font-bold mb-4 text-center bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
          Negotiation for {productMetadata.title || "Unknown Product"}
        </h1>
        <p className="mb-2 text-gray-700">
          <strong>Category:</strong> {productMetadata.category || "N/A"}
        </p>
        <p className="mb-6 text-gray-700">
          <strong>Price:</strong> £{productMetadata.price || "N/A"}
        </p>

        {/* Chat Section */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-inner h-[60vh] overflow-y-auto mb-6">
          {chatHistory.map((message, index) => (
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
                    : "System"}:
                </strong>{" "}
                {message.content}
              </p>
              {message.showOptions && !dealClosed && (
                <div className="mt-2 flex justify-start space-x-4">
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded-lg"
                    onClick={() => {
                      setOfferAccepted(true);
                      setDealClosed(true);
                      setChatHistory((prev) => [
                        ...prev,
                        { role: "system", content: "Offer accepted. Proceed to checkout." },
                      ]);
                    }}
                  >
                    Accept
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded-lg"
                    onClick={handleDecline}
                  >
                    Decline
                  </button>
                </div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="text-left text-emerald-700">
              <p className="animate-typing text-sm">AI is typing<span className="dots">...</span></p>
            </div>
          )}
        </div>

        {/* Proceed to Checkout */}
        {offerAccepted && (
          <div className="flex justify-center mt-6">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-lg shadow-lg"
              onClick={() => console.log("Redirecting to checkout...")}
            >
              Proceed to Checkout
            </button>
          </div>
        )}

        {/* Input Field */}
        {!offerAccepted && (
          <div className="flex items-center space-x-2">
            <input
              type="text"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow duration-200"
              placeholder="Type your message here..."
              value={buyerMessage}
              onChange={(e) => setBuyerMessage(e.target.value)}
              disabled={dealClosed}
            />
            <button
              className={`bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-bold px-4 py-2 rounded-lg shadow-lg transition-transform duration-300 transform hover:-translate-y-1 ${
                dealClosed ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => handleSendMessage(buyerMessage)}
              disabled={dealClosed}
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
