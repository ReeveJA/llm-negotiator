// import { NextRequest, NextResponse } from "next/server";
// import OpenAI from "openai";
// import { getPineconeIndex } from "../../../utils/pinecone";

// // Initialize OpenAI client
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// interface NegotiationRequestBody {
//   sessionId: string; // Unique negotiation session ID
//   productDetails: string; // Details of the product being negotiated
//   buyerMessage: string; // Buyer's current message
//   sellerMinimumPrice: number; // Seller's minimum acceptable price
//   rounds: number; // Current round count
// }

// interface PineconeMatch {
//   metadata: {
//     role: string;
//     content: string;
//   };
//   score?: number; // Optional similarity score
// }

// export async function POST(req: NextRequest) {
//   try {
//     const body: NegotiationRequestBody = await req.json();
//     const { sessionId, productDetails, buyerMessage, sellerMinimumPrice, rounds } = body;

//     // Step 1: Validate input
//     if (!sessionId || !productDetails || !buyerMessage || rounds === undefined) {
//       return NextResponse.json({ message: "Missing required fields." }, { status: 400 });
//     }

//     // Step 2: Enforce maximum negotiation rounds
//     if (rounds >= 3) {
//       return NextResponse.json({
//         message: "Maximum negotiation rounds reached.",
//         status: "terminated",
//         rounds,
//       });
//     }

//     // Step 3: Retrieve chat history from Pinecone
//     const index = await getPineconeIndex();
//     const embedding = await openai.embeddings
//       .create({
//         model: "text-embedding-ada-002",
//         input: buyerMessage,
//       })
//       .then((res) => res.data[0].embedding);

//     const chatHistory = await index.query(
//       {
//         vector: embedding, // Query using the buyer's message embedding
//         topK: 10,
//         includeMetadata: true,
//       },
//       {
//         namespace: sessionId,
//       }
//     );

//     // Step 4: Construct developer and user messages
//     const developerMessage = {
//       role: "developer",
//       content: `
//         You are an AI shopkeeper negotiating a product sale.
//         Product details: ${productDetails}.
//         Rules:
//         - Never agree to a price below £${sellerMinimumPrice}.
//         - Provide counteroffers within reason.
//         - End negotiation after 3 rounds if no agreement is reached.
//       `,
//     };

//     const messages = [
//         {
//           role: "developer",
//           content: `
//             You are an AI shopkeeper negotiating a product sale.
//             Product details: ${productDetails}.
//             Rules:
//             - Never agree to a price below £${sellerMinimumPrice}.
//             - Provide counteroffers within reason.
//             - End negotiation after 3 rounds if no agreement is reached.
//           `,
//         },
//         ...(chatHistory.matches || [])
//           .filter((match: PineconeMatch) => match.metadata?.role && match.metadata?.content) // Ensure both role and content exist
//           .map((match: PineconeMatch) => ({
//             role: match.metadata.role,
//             content: match.metadata.content,
//           })),
//         {
//           role: "user",
//           content: buyerMessage,
//         },
//       ];
      

//     console.log("Messages sent to OpenAI:", JSON.stringify(messages, null, 2));

//     // Step 5: Call OpenAI to generate AI response
//     const response = await openai.chat.completions.create({
//       model: "gpt-4",
//       messages,
//     });

//     const aiMessage = response.choices[0].message?.content;

//     if (!aiMessage) {
//       throw new Error("AI response is empty or invalid.");
//     }

//     // Step 6: Save buyer and AI messages to Pinecone
//     // Save buyer and AI messages to Pinecone
// const buyerRecord = {
//     id: `buyer-${Date.now()}`,
//     values: await openai.embeddings.create({
//       model: "text-embedding-ada-002",
//       input: buyerMessage,
//     }).then((res) => res.data[0].embedding),
//     metadata: { role: "user", content: buyerMessage },
//   };
  
//   const aiRecord = {
//     id: `ai-${Date.now()}`,
//     values: await openai.embeddings.create({
//       model: "text-embedding-ada-002",
//       input: aiMessage || "",
//     }).then((res) => res.data[0].embedding),
//     metadata: { role: "assistant", content: aiMessage },
//   };
  
//   // Log the upsert payload for debugging
//   console.log("Upsert Payload:", JSON.stringify([buyerRecord, aiRecord], null, 2));
  
//   // Perform upsert
//   await index.upsert(
//     [buyerRecord, aiRecord], // Pass the array directly
//     { namespace: sessionId } // Specify the namespace separately
//   );
  
  
//     // Step 7: Return AI response and updated round count
//     return NextResponse.json({
//       aiMessage,
//       rounds: rounds + 1,
//       sessionId,
//     });
//   } catch (error: any) {
//     console.error("Error in Negotiation API:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }


// import { NextRequest, NextResponse } from "next/server";
// import OpenAI from "openai";
// import { getPineconeIndex } from "../../../utils/pinecone";

// // Initialize OpenAI client
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// interface NegotiationRequestBody {
//   productMetadata: {
//     productDetails: string;
//     minimumPrice: number;
//     price: number;
//     category?: string;
//     [key: string]: any; // For additional metadata fields
//   };
//   buyerMessage: string;
//   rounds: number;
// }

// export async function POST(req: NextRequest) {
//   try {
//     const body: NegotiationRequestBody = await req.json();
//     const { productMetadata, buyerMessage, rounds } = body;

//     // Step 1: Validate input
//     if (!productMetadata || !buyerMessage || rounds === undefined) {
//       return NextResponse.json({ message: "Missing required fields." }, { status: 400 });
//     }

//     const { productDetails, minimumPrice } = productMetadata;

//     // Step 2: Enforce maximum negotiation rounds
//     if (rounds >= 3) {
//       return NextResponse.json({
//         message: "Maximum negotiation rounds reached.",
//         status: "terminated",
//         rounds,
//       });
//     }

//     // Step 3: Retrieve chat history from Pinecone
//     const index = await getPineconeIndex();
//     const embedding = await openai.embeddings
//       .create({
//         model: "text-embedding-ada-002",
//         input: buyerMessage,
//       })
//       .then((res) => res.data[0].embedding);

//     const sessionId = `negotiation-${productMetadata.productDetails.replace(/\s+/g, "-").toLowerCase()}`;
//     const chatHistory = await index.query(
//       {
//         vector: embedding,
//         topK: 10,
//         includeMetadata: true,
//       },
//       {
//         namespace: sessionId,
//       }
//     );

//     // Step 4: Construct developer and user messages
//     const messages = [
//       {
//         role: "developer",
//         content: `
//           You are an AI shopkeeper negotiating a product sale.
//           Product details: ${productDetails}.
//           Rules:
//           - Never agree to a price below £${minimumPrice}.
//           - Provide counteroffers within reason.
//           - End negotiation after 3 rounds if no agreement is reached.
//         `,
//       },
//       ...(chatHistory.matches || [])
//         .filter((match) => match.metadata?.role && match.metadata?.content) // Ensure both role and content exist
//         .map((match) => ({
//           role: match.metadata.role,
//           content: match.metadata.content,
//         })),
//       {
//         role: "user",
//         content: buyerMessage,
//       },
//     ];

//     console.log("Messages sent to OpenAI:", JSON.stringify(messages, null, 2));

//     // Step 5: Call OpenAI to generate AI response
//     const response = await openai.chat.completions.create({
//       model: "gpt-4",
//       messages,
//     });

//     const aiMessage = response.choices[0].message?.content;

//     if (!aiMessage) {
//       throw new Error("AI response is empty or invalid.");
//     }

//     // Step 6: Save buyer and AI messages to Pinecone
//     const buyerRecord = {
//       id: `buyer-${Date.now()}`,
//       values: await openai.embeddings.create({
//         model: "text-embedding-ada-002",
//         input: buyerMessage,
//       }).then((res) => res.data[0].embedding),
//       metadata: { role: "user", content: buyerMessage },
//     };

//     const aiRecord = {
//       id: `ai-${Date.now()}`,
//       values: await openai.embeddings.create({
//         model: "text-embedding-ada-002",
//         input: aiMessage || "",
//       }).then((res) => res.data[0].embedding),
//       metadata: { role: "assistant", content: aiMessage },
//     };

//     console.log("Upsert Payload:", JSON.stringify([buyerRecord, aiRecord], null, 2));

//     await index.upsert([buyerRecord, aiRecord], { namespace: sessionId });

//     // Step 7: Return AI response and updated round count
//     return NextResponse.json({
//       aiMessage,
//       rounds: rounds + 1,
//       sessionId,
//     });
//   } catch (error: any) {
//     console.error("Error in Negotiation API:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }


// import { NextRequest, NextResponse } from "next/server";
// import OpenAI from "openai";
// import { getPineconeIndex } from "../../../utils/pinecone";

// // Initialize OpenAI client
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// interface NegotiationRequestBody {
//   productMetadata: {
//     productDetails: string;
//     minimumPrice: number;
//     price: number;
//     category?: string;
//     [key: string]: any; // For additional metadata fields
//   };
//   buyerMessage: string;
//   rounds: number;
// }

// export async function POST(req: NextRequest) {
//   try {
//     const body: NegotiationRequestBody = await req.json();
//     const { productMetadata, buyerMessage, rounds } = body;

//     // Step 1: Validate input
//     if (!productMetadata || !buyerMessage || rounds === undefined) {
//       return NextResponse.json({ message: "Missing required fields." }, { status: 400 });
//     }

//     const { productDetails, minimumPrice } = productMetadata;

//     // Ensure productDetails is safe
//     const safeProductDetails = productDetails || "unknown-product";

//     // Step 2: Enforce maximum negotiation rounds
//     if (rounds >= 3) {
//       return NextResponse.json({
//         message: "Maximum negotiation rounds reached.",
//         status: "terminated",
//         rounds,
//       });
//     }

//     // Step 3: Retrieve chat history from Pinecone
//     const index = await getPineconeIndex();
//     const embedding = await openai.embeddings
//       .create({
//         model: "text-embedding-ada-002",
//         input: buyerMessage,
//       })
//       .then((res) => res.data[0].embedding);

//     const sessionId = `negotiation-${safeProductDetails.replace(/\s+/g, "-").toLowerCase()}`;

//     const chatHistory = await index.query(
//       {
//         vector: embedding,
//         topK: 10,
//         includeMetadata: true,
//       },
//       {
//         namespace: sessionId,
//       }
//     );

//     // Step 4: Construct developer and user messages
//     const messages = [
//       {
//         role: "developer",
//         content: `
//           You are an AI shopkeeper negotiating a product sale.
//           Product details: ${safeProductDetails}.
//           Rules:
//           - Never agree to a price below £${minimumPrice}.
//           - Provide counteroffers within reason.
//           - End negotiation after 3 rounds if no agreement is reached.
//         `,
//       },
//       ...(chatHistory.matches || [])
//         .filter((match: { metadata: { role: any; content: any; }; }) => match.metadata?.role && match.metadata?.content)
//         .map((match: { metadata: { role: any; content: any; }; }) => ({
//           role: match.metadata.role,
//           content: match.metadata.content,
//         })),
//       {
//         role: "user",
//         content: buyerMessage,
//       },
//     ];

//     console.log("Messages sent to OpenAI:", JSON.stringify(messages, null, 2));

//     // Step 5: Call OpenAI to generate AI response
//     const response = await openai.chat.completions.create({
//       model: "gpt-4",
//       messages,
//     });

//     const aiMessage = response.choices[0].message?.content;

//     if (!aiMessage) {
//       throw new Error("AI response is empty or invalid.");
//     }

//     // Step 6: Save buyer and AI messages to Pinecone
//     const buyerRecord = {
//       id: `buyer-${Date.now()}`,
//       values: await openai.embeddings.create({
//         model: "text-embedding-ada-002",
//         input: buyerMessage,
//       }).then((res) => res.data[0].embedding),
//       metadata: { role: "user", content: buyerMessage },
//     };

//     const aiRecord = {
//       id: `ai-${Date.now()}`,
//       values: await openai.embeddings.create({
//         model: "text-embedding-ada-002",
//         input: aiMessage || "",
//       }).then((res) => res.data[0].embedding),
//       metadata: { role: "assistant", content: aiMessage },
//     };

//     console.log("Upsert Payload:", JSON.stringify([buyerRecord, aiRecord], null, 2));

//     await index.upsert([buyerRecord, aiRecord], { namespace: sessionId });

//     // Step 7: Return AI response and updated round count
//     return NextResponse.json({
//       aiMessage,
//       rounds: rounds + 1,
//       sessionId,
//     });
//   } catch (error: any) {
//     console.error("Error in Negotiation API:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }


// import { NextRequest, NextResponse } from "next/server";
// import OpenAI from "openai";
// import { getPineconeIndex } from "../../../utils/pinecone";

// // Initialize OpenAI client
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// interface NegotiationRequestBody {
//   productMetadata: {
//     productDetails: string;
//     minimumPrice: number;
//     price: number;
//     category?: string;
//     [key: string]: any; // For additional metadata fields
//   };
//   buyerMessage: string;
//   rounds: number;
// }

// export async function POST(req: NextRequest) {
//   try {
//     const body: NegotiationRequestBody = await req.json();
//     const { productMetadata, buyerMessage, rounds } = body;

//     // Step 1: Validate input
//     if (!productMetadata || !buyerMessage || rounds === undefined) {
//       return NextResponse.json({ message: "Missing required fields." }, { status: 400 });
//     }

//     const { productDetails, minimumPrice, price } = productMetadata;

//     // Ensure productDetails is safe
//     const safeProductDetails = productDetails || "unknown-product";

//     // Step 2: Enforce maximum negotiation rounds
//     if (rounds >= 3) {
//       return NextResponse.json({
//         message: "Maximum negotiation rounds reached.",
//         status: "terminated",
//         rounds,
//       });
//     }

//     // Step 3: Retrieve chat history from Pinecone
//     const index = await getPineconeIndex();
//     const embedding = await openai.embeddings
//       .create({
//         model: "text-embedding-ada-002",
//         input: buyerMessage,
//       })
//       .then((res) => res.data[0].embedding);

//     const sessionId = `negotiation-${safeProductDetails.replace(/\s+/g, "-").toLowerCase()}`;

//     const chatHistory = await index.query(
//       {
//         vector: embedding,
//         topK: 10,
//         includeMetadata: true,
//       },
//       {
//         namespace: sessionId,
//       }
//     );

//     // Step 4: Construct dynamic system prompt
//     const systemPrompt = `
//       You are an AI shopkeeper negotiating the sale of a product. Your primary goal is to maximize profits for the seller while maintaining professionalism, politeness, and persuasiveness. Strictly adhere to the following rules and guidelines:

//       1. **Product Details**:
//          - Name: ${safeProductDetails}
//          - Sticker Price: £${price}
//          - Minimum Acceptable Price (Secret): £${minimumPrice}

//       2. **Negotiation Rules**:
//          - **Never disclose the minimum acceptable price** under any circumstances.
//          - Always aim to keep counteroffers closer to the sticker price (£${price}) to maximize profit.
//          - Respond to offers below the minimum price with firm but polite rejections. Use phrases such as:
//            - "That offer is too low for this premium product."
//            - "This product is worth more due to its quality and demand."
//            - "We cannot accept that offer, but let me provide a better option."
//          - Gradually reduce the price in small increments, but never below the minimum acceptable price.
//          - Justify counteroffers by emphasizing the product's value, exclusivity, and quality.
//          - Counteroffers should aim to bring the buyer closer to the sticker price rather than the minimum.

//       3. **Response Strategy**:
//          - Always justify pricing decisions by highlighting the product's features, value, and market demand.
//          - If the buyer persists with offers below the minimum, reiterate the quality and value of the product and refuse to lower the price further.
//          - Avoid using apologetic language such as "I'm sorry" for rejecting low offers. Focus on explaining the fairness of the pricing.
//          - If the buyer proposes a reasonable price near the sticker price, consider closing the deal or offering small incentives, such as a free accessory.

//       4. **Termination of Negotiation**:
//          - Limit the negotiation to **3 rounds**.
//          - If no agreement is reached after 3 rounds, politely inform the buyer:
//            - "This is our final price. Thank you for your interest in this product."
//          - Ensure you remain polite and professional even if the buyer refuses the final price.
//     `;

//     const messages = [
//       { role: "developer", content: systemPrompt },
//       ...(chatHistory.matches || [])
//         .filter((match: { metadata: { role: any; content: any; }; }) => match.metadata?.role && match.metadata?.content)
//         .map((match: { metadata: { role: any; content: any; }; }) => ({
//           role: match.metadata.role,
//           content: match.metadata.content,
//         })),
//       { role: "user", content: buyerMessage },
//     ];

//     console.log("Messages sent to OpenAI:", JSON.stringify(messages, null, 2));

//     // Step 5: Call OpenAI to generate AI response
//     const response = await openai.chat.completions.create({
//       model: "gpt-4",
//       messages,
//     });

//     const aiMessage = response.choices[0].message?.content;

//     if (!aiMessage) {
//       throw new Error("AI response is empty or invalid.");
//     }

//     // Step 6: Save buyer and AI messages to Pinecone
//     const buyerRecord = {
//       id: `buyer-${Date.now()}`,
//       values: embedding,
//       metadata: { role: "user", content: buyerMessage },
//     };

//     const aiRecord = {
//       id: `ai-${Date.now()}`,
//       values: await openai.embeddings
//         .create({
//           model: "text-embedding-ada-002",
//           input: aiMessage,
//         })
//         .then((res) => res.data[0].embedding),
//       metadata: { role: "assistant", content: aiMessage },
//     };

//     console.log("Upsert Payload:", JSON.stringify([buyerRecord, aiRecord], null, 2));

//     await index.upsert([buyerRecord, aiRecord], { namespace: sessionId });

//     // Step 7: Return AI response and updated round count
//     return NextResponse.json({
//       aiMessage,
//       rounds: rounds + 1,
//       sessionId,
//     });
//   } catch (error: any) {
//     console.error("Error in Negotiation API:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }


// import { NextRequest, NextResponse } from "next/server";
// import OpenAI from "openai";
// import { getPineconeIndex } from "../../../utils/pinecone";

// // Initialize OpenAI client
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// interface NegotiationRequestBody {
//   productMetadata: {
//     productDetails: string;
//     minimumPrice: number;
//     price: number;
//     category?: string;
//     [key: string]: any; // For additional metadata fields
//   };
//   buyerMessage: string;
//   rounds: number;
//   lastAiOffer?: number; // Track the last AI offer
// }

// export async function POST(req: NextRequest) {
//   try {
//     const body: NegotiationRequestBody = await req.json();
//     const { productMetadata, buyerMessage, rounds, lastAiOffer } = body;

//     // Step 1: Validate input
//     if (!productMetadata || !buyerMessage || rounds === undefined) {
//       return NextResponse.json({ message: "Missing required fields." }, { status: 400 });
//     }

//     const { productDetails, minimumPrice, price } = productMetadata;

//     // Ensure productDetails is safe
//     const safeProductDetails = productDetails || "unknown-product";

//     // Step 2: Enforce maximum negotiation rounds
//     if (rounds >= 3) {
//       return NextResponse.json({
//         message: "Maximum negotiation rounds reached.",
//         status: "terminated",
//         rounds,
//       });
//     }

//     // Step 3: Retrieve chat history from Pinecone
//     const index = await getPineconeIndex();
//     const embedding = await openai.embeddings
//       .create({
//         model: "text-embedding-ada-002",
//         input: buyerMessage,
//       })
//       .then((res) => res.data[0].embedding);

//     const sessionId = `negotiation-${safeProductDetails.replace(/\s+/g, "-").toLowerCase()}`;

//     const chatHistory = await index.query(
//       {
//         vector: embedding,
//         topK: 10,
//         includeMetadata: true,
//       },
//       {
//         namespace: sessionId,
//       }
//     );

//     // Step 4: Construct dynamic system prompt
//     const systemPrompt = `
//       You are an AI shopkeeper negotiating the sale of a product. Your primary goal is to maximize profits for the seller while maintaining professionalism, politeness, and persuasiveness. Strictly adhere to the following rules and guidelines:

//       1. **Product Details**:
//          - Name: ${safeProductDetails}
//          - Sticker Price: £${price}
//          - Minimum Acceptable Price (Secret): £${minimumPrice}

//       2. **Negotiation Rules**:
//          - **Never disclose the minimum acceptable price** under any circumstances.
//          - Always aim to keep counteroffers closer to the sticker price (£${price}) to maximize profit.
//          - Respond to offers below the minimum price with firm but polite rejections. Use phrases such as:
//            - "That offer is too low for this premium product."
//            - "This product is worth more due to its quality and demand."
//            - "We cannot accept that offer, but let me provide a better option."
//          - Gradually reduce the price in small increments, but never below the minimum acceptable price.
//          - Justify counteroffers by emphasizing the product's value, exclusivity, and quality.
//          - Counteroffers should aim to bring the buyer closer to the sticker price rather than the minimum.

//       3. **Response Strategy**:
//          - Always justify pricing decisions by highlighting the product's features, value, and market demand.
//          - If the buyer persists with offers below the minimum, reiterate the quality and value of the product and refuse to lower the price further.
//          - Avoid using apologetic language such as "I'm sorry" for rejecting low offers. Focus on explaining the fairness of the pricing.
//          - If the buyer proposes a reasonable price near the sticker price, consider closing the deal or offering small incentives, such as a free accessory.

//       4. **Termination of Negotiation**:
//          - Limit the negotiation to **3 rounds**.
//          - If no agreement is reached after 3 rounds, politely inform the buyer:
//            - "This is our final price. Thank you for your interest in this product."
//          - Ensure you remain polite and professional even if the buyer refuses the final price.
//     `;

//     const messages = [
//       { role: "developer", content: systemPrompt },
//       ...(chatHistory.matches || [])
//         .filter((match: { metadata: { role: any; content: any; }; }) => match.metadata?.role && match.metadata?.content)
//         .map((match: { metadata: { role: any; content: any; }; }) => ({
//           role: match.metadata.role,
//           content: match.metadata.content,
//         })),
//       { role: "user", content: buyerMessage },
//     ];

//     console.log("Messages sent to OpenAI:", JSON.stringify(messages, null, 2));

//     // Step 5: Call OpenAI to generate AI response
//     const response = await openai.chat.completions.create({
//       model: "gpt-4",
//       messages,
//     });

//     let aiMessage = response.choices[0].message?.content;

//     if (!aiMessage) {
//       throw new Error("AI response is empty or invalid.");
//     }

//     // Step 6: Ensure counteroffers are logical
//     const currentOffer = lastAiOffer || price;
//     const newOffer = Math.max(
//       Math.min(currentOffer - 10, price - 10), // Decrement by 10, but stay below sticker price
//       minimumPrice // Never go below minimum price
//     );

//     aiMessage = aiMessage.replace(/\£\d+/, `£${newOffer}`); // Update the AI's response with the new offer

//     // Step 7: Save buyer and AI messages to Pinecone
//     const buyerRecord = {
//       id: `buyer-${Date.now()}`,
//       values: embedding,
//       metadata: { role: "user", content: buyerMessage },
//     };

//     const aiRecord = {
//       id: `ai-${Date.now()}`,
//       values: await openai.embeddings
//         .create({
//           model: "text-embedding-ada-002",
//           input: aiMessage,
//         })
//         .then((res) => res.data[0].embedding),
//       metadata: { role: "assistant", content: aiMessage },
//     };

//     console.log("Upsert Payload:", JSON.stringify([buyerRecord, aiRecord], null, 2));

//     await index.upsert([buyerRecord, aiRecord], { namespace: sessionId });

//     // Step 8: Return AI response and updated round count
//     return NextResponse.json({
//       aiMessage,
//       rounds: rounds + 1,
//       sessionId,
//       lastAiOffer: newOffer, // Track the new offer for future rounds
//     });
//   } catch (error: any) {
//     console.error("Error in Negotiation API:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }


import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { getPineconeIndex } from "../../../utils/pinecone";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface NegotiationRequestBody {
  productMetadata: {
    productDetails: string;
    minimumPrice: number;
    price: number;
    category?: string;
    [key: string]: any; // For additional metadata fields
  };
  buyerMessage: string;
  rounds: number;
  lastAiOffer?: number; // Track the last AI offer
}

export async function POST(req: NextRequest) {
  try {
    const body: NegotiationRequestBody = await req.json();
    const { productMetadata, buyerMessage, rounds, lastAiOffer } = body;

    // Step 1: Validate input
    if (!productMetadata || !buyerMessage || rounds === undefined) {
      return NextResponse.json({ message: "Missing required fields." }, { status: 400 });
    }

    const { productDetails, minimumPrice, price } = productMetadata;

    // Ensure productDetails is safe
    const safeProductDetails = productDetails || "unknown-product";

    // Step 2: Enforce maximum negotiation rounds
    if (rounds >= 3) {
      return NextResponse.json({
        message: "Maximum negotiation rounds reached.",
        status: "terminated",
        rounds,
      });
    }

    // Step 3: Retrieve chat history from Pinecone
    const index = await getPineconeIndex();
    const embedding = await openai.embeddings
      .create({
        model: "text-embedding-ada-002",
        input: buyerMessage,
      })
      .then((res) => res.data[0].embedding);

    const sessionId = `negotiation-${safeProductDetails.replace(/\s+/g, "-").toLowerCase()}`;

    const chatHistory = await index.query(
      {
        vector: embedding,
        topK: 10,
        includeMetadata: true,
      },
      {
        namespace: sessionId,
      }
    );

    // Step 4: Construct dynamic system prompt
    const systemPrompt = `
    You are an AI shopkeeper negotiating a product sale. Your goal is to maximize seller profits while remaining professional and persuasive. Follow these rules:

1. **Product Details**:
   - Name: ${safeProductDetails}
   - Sticker Price: £${price}
   - Minimum Price (Hidden): £${minimumPrice}

2. **Negotiation Rules**:
   - Never disclose or hint at the minimum price.
   - Counteroffers must be closer to the sticker price than the minimum price.
   - Reject low offers politely but firmly: e.g., "That offer is too low for this premium product."
   - Reduce the price incrementally, but never below the minimum price.
   - Justify pricing by emphasizing quality, demand, and exclusivity.

3. **Response Strategy**:
   - For reasonable offers, negotiate closer to the sticker price.
   - Avoid agreeing to buyer-proposed prices outright unless near the sticker price.
   - Offer final terms in the last round with clear messaging, e.g., "This is our best price."

4. **End Negotiation**:
   - Limit to 3 rounds. End with: "This is our final offer. Thank you for your interest."

Keep responses concise and logical, ensuring no errors or mismatches in price handling.
    `;

    const messages = [
      { role: "developer", content: systemPrompt },
      ...(chatHistory.matches || [])
        .filter((match: { metadata: { role: any; content: any; }; }) => match.metadata?.role && match.metadata?.content)
        .map((match: { metadata: { role: any; content: any; }; }) => ({
          role: match.metadata.role,
          content: match.metadata.content,
        })),
      { role: "user", content: buyerMessage },
    ];

    console.log("Messages sent to OpenAI:", JSON.stringify(messages, null, 2));

    // Step 5: Call OpenAI to generate AI response
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages,
    });

    let aiMessage = response.choices[0].message?.content;

    if (!aiMessage) {
      throw new Error("AI response is empty or invalid.");
    }

    // Step 6: Ensure counteroffers are logical
    const currentOffer = lastAiOffer || price;
    const decrement = Math.floor((currentOffer - minimumPrice) / (3 - rounds));
    const newOffer = Math.max(
      currentOffer - decrement,
      minimumPrice // Never go below minimum price
    );

    aiMessage = aiMessage.replace(/\£\d+/, `£${newOffer}`); // Update the AI's response with the new offer

    // Step 7: Save buyer and AI messages to Pinecone
    const buyerRecord = {
      id: `buyer-${Date.now()}`,
      values: embedding,
      metadata: { role: "user", content: buyerMessage },
    };

    const aiRecord = {
      id: `ai-${Date.now()}`,
      values: await openai.embeddings
        .create({
          model: "text-embedding-ada-002",
          input: aiMessage,
        })
        .then((res) => res.data[0].embedding),
      metadata: { role: "assistant", content: aiMessage },
    };

    console.log("Upsert Payload:", JSON.stringify([buyerRecord, aiRecord], null, 2));

    await index.upsert([buyerRecord, aiRecord], { namespace: sessionId });

    // Step 8: Return AI response and updated round count
    return NextResponse.json({
      aiMessage,
      rounds: rounds + 1,
      sessionId,
      lastAiOffer: newOffer, // Track the new offer for future rounds
    });
  } catch (error: any) {
    console.error("Error in Negotiation API:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
