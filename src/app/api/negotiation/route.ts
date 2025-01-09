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
//     You are an AI shopkeeper negotiating a product sale. Your goal is to maximize seller profits while remaining professional and persuasive. Follow these rules:

// 1. **Product Details**:
//    - Name: ${safeProductDetails}
//    - Sticker Price: £${price}
//    - Minimum Price (Hidden): £${minimumPrice}

// 2. **Negotiation Rules**:
//    - Never disclose or hint at the minimum price.
//    - Counteroffers must be closer to the sticker price than the minimum price.
//    - Reject low offers politely but firmly: e.g., "That offer is too low for this premium product."
//    - Reduce the price incrementally, but never below the minimum price.
//    - Justify pricing by emphasizing quality, demand, and exclusivity.

// 3. **Response Strategy**:
//    - For reasonable offers, negotiate closer to the sticker price.
//    - Avoid agreeing to buyer-proposed prices outright unless near the sticker price.
//    - Offer final terms in the last round with clear messaging, e.g., "This is our best price."

// 4. **End Negotiation**:
//    - Limit to 3 rounds. End with: "This is our final offer. Thank you for your interest."

// Keep responses concise and logical, ensuring no errors or mismatches in price handling.
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
//     const decrement = Math.floor((currentOffer - minimumPrice) / (3 - rounds));
//     const newOffer = Math.max(
//       currentOffer - decrement,
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

//     // Step 3: Calculate thresholds dynamically
//     const difference = price - minimumPrice;
//     const thresholds = {
//       accept: price - 0.25 * difference,
//       counter25: price - 0.35 * difference,
//       counter35: price - 0.50 * difference,
//     };

//     // Extract buyer's offer from message
//     const buyerOffer = parseFloat(buyerMessage.match(/\d+/)?.[0] || "NaN"); // Ensure a default fallback for parsing

//     if (isNaN(buyerOffer)) {
//       return NextResponse.json({
//         message: "Invalid buyer offer. Ensure the offer includes a numeric value.",
//         status: "error",
//       });
//     }

//     let aiMessage = "";
//     let dealClosed = false;
//     let newOffer = lastAiOffer || price;

//     // Step 4: Apply negotiation logic
//     if (buyerOffer >= thresholds.accept) {
//       // Accept the offer
//       aiMessage = `AI accepts your offer of £${buyerOffer}. Deal closed!`;
//       dealClosed = true;
//     } else if (buyerOffer >= thresholds.counter25 && buyerOffer < thresholds.accept) {
//       // Counteroffer with average of sticker price and buyer's offer
//       newOffer = Math.round((price + buyerOffer) / 2);
//       aiMessage = `AI counters with £${newOffer}.`;
//     } else if (buyerOffer >= thresholds.counter35 && buyerOffer < thresholds.counter25) {
//       // Counteroffer with 25% of the difference
//       newOffer = Math.round(price - 0.25 * difference);
//       aiMessage = `AI counters with £${newOffer}.`;
//     } else {
//       // Final counteroffer with 30% of the difference
//       newOffer = Math.round(price - 0.30 * difference);
//       aiMessage = `AI counters with a final offer of £${newOffer}.`;
//     }

//     // Step 5: Save buyer and AI messages to Pinecone
//     const index = await getPineconeIndex();
//     const embedding = await openai.embeddings
//       .create({
//         model: "text-embedding-ada-002",
//         input: buyerMessage,
//       })
//       .then((res) => res.data[0].embedding);

//     const sessionId = `negotiation-${safeProductDetails.replace(/\s+/g, "-").toLowerCase()}`;

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

//     // Step 6: Return AI response and updated round count
//     return NextResponse.json({
//       aiMessage,
//       dealClosed,
//       rounds: rounds + 1,
//       sessionId,
//       lastAiOffer: newOffer, // Track the new offer for future rounds
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

//     // Step 3: Calculate thresholds dynamically
//     const difference = price - minimumPrice;
//     const thresholds = {
//       accept: price - 0.25 * difference,
//       counter25: price - 0.35 * difference,
//       counter35: price - 0.50 * difference,
//     };

//     // Extract buyer's offer from message
//     const buyerOffer = parseFloat(buyerMessage.match(/\d+/)?.[0]);

//     if (!buyerOffer || isNaN(buyerOffer)) {
//       return NextResponse.json({
//         message: "Invalid buyer offer. Ensure the offer includes a numeric value.",
//         status: "error",
//       });
//     }

//     let aiMessage = "";
//     let dealClosed = false;
//     let newOffer = lastAiOffer || price;

//     // Step 4: Apply negotiation logic
//     if (buyerOffer >= thresholds.accept) {
//       // Accept the offer
//       aiMessage = `Great! Your offer of £${buyerOffer} is accepted. Let's proceed with the deal.`;
//       dealClosed = true;
//     } else if (buyerOffer >= thresholds.counter25 && buyerOffer < thresholds.accept) {
//       // Counteroffer with average of sticker price and buyer's offer
//       newOffer = Math.round((price + buyerOffer) / 2);
//       aiMessage = `Your offer is close, but I can provide a better deal at £${newOffer}. What do you think?`;
//     } else if (buyerOffer >= thresholds.counter35 && buyerOffer < thresholds.counter25) {
//       // Counteroffer with 25% of the difference
//       newOffer = Math.round(price - 0.25 * difference);
//       aiMessage = `That's an interesting offer, but considering the product's value, I can offer it at £${newOffer}.`;
//     } else {
//       // Final counteroffer with 30% of the difference
//       newOffer = Math.round(price - 0.30 * difference);
//       aiMessage = `That offer is too low I'm afraid. My offer is £${newOffer}. Let me know if this works for you.`;
//     }

//     // Step 5: Generate dynamic system prompts for enhanced NLP
//     const systemPrompt = `
//       You are an AI shopkeeper negotiating the sale of a product. Your goal is to maximize seller profits while remaining professional and persuasive. Follow these rules:

//       1. Never disclose the minimum price (£${minimumPrice}).
//       2. Counteroffers should justify the product's quality, demand, and exclusivity.
//       3. If the buyer's offer is within an acceptable range (£${thresholds.accept} or higher), accept and close the deal.
//       4. For lower offers, counter incrementally with persuasive language.
//       5. Limit negotiations to 3 rounds, and end with a polite but firm final offer if necessary.

//       Product Details:
//       - Name: ${safeProductDetails}
//       - Sticker Price: £${price}
//     `;

//     // Combine system prompt and messages
//     const messages = [
//       { role: "system", content: systemPrompt },
//       { role: "user", content: buyerMessage },
//       { role: "assistant", content: aiMessage },
//     ];

//     // Step 6: Save buyer and AI messages to Pinecone
//     const index = await getPineconeIndex();
//     const embedding = await openai.embeddings
//       .create({
//         model: "text-embedding-ada-002",
//         input: buyerMessage,
//       })
//       .then((res) => res.data[0].embedding);

//     const sessionId = `negotiation-${safeProductDetails.replace(/\s+/g, "-").toLowerCase()}`;

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
//       dealClosed,
//       rounds: rounds + 1,
//       sessionId,
//       lastAiOffer: newOffer, // Track the new offer for future rounds
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

//     // Step 3: Use System Prompt to Handle Negotiation Logic
//     const difference = price - minimumPrice;
//     const thresholds = {
//       accept: price - 0.25 * difference,
//       counter25: price - 0.35 * difference,
//       counter35: price - 0.50 * difference,
//     };

//     const buyerOffer = parseFloat(buyerMessage.match(/\d+/)?.[0] || "0");

//     const systemPrompt = `
//       You are an AI shopkeeper negotiating the sale of a product. Your goal is to maximize seller profits while remaining professional and persuasive. Follow these rules:

//       1. Never disclose the minimum price (£${minimumPrice}) ever under any circumstance.
//       2. Counteroffers should justify the product's quality, demand, and exclusivity.
//       3. Accept buyer offers above £${thresholds.accept} and close the deal.
//       4. For offers between £${thresholds.counter25} and £${thresholds.accept}, counter with a midpoint offer between the buyer's offer and the sticker price (£${price}).
//       5. For offers between £${thresholds.counter35} and £${thresholds.counter25}, counter with the (${price} - 25% of the ${difference}).
//       6. For offers below £${thresholds.counter35}, counter with 30% of the difference and label it as the final offer.
//       7. Limit negotiations to 3 rounds and politely end with a firm final offer if no agreement is reached.
//       8. Never ever show ${thresholds} and an calculations made.

//       Product Details:
//       - Name: ${safeProductDetails}
//       - Sticker Price: £${price}
//     `;

//     const messages = [
//       { role: "system", content: systemPrompt },
//       { role: "user", content: `The buyer has offered £${buyerOffer}.` },
//     ];

//     // Step 4: Call OpenAI to generate AI response
//     const response = await openai.chat.completions.create({
//       model: "gpt-4",
//       messages,
//     });

//     const aiMessage = response.choices[0].message?.content || "Error generating response.";

//     // Step 5: Save buyer and AI messages to Pinecone
//     const index = await getPineconeIndex();
//     const embedding = await openai.embeddings
//       .create({
//         model: "text-embedding-ada-002",
//         input: buyerMessage,
//       })
//       .then((res) => res.data[0].embedding);

//     const sessionId = `negotiation-${safeProductDetails.replace(/\s+/g, "-").toLowerCase()}`;

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

//     // Step 6: Return AI response and updated round count
//     const dealClosed = aiMessage.includes("accepted") || aiMessage.includes("proceed");

//     return NextResponse.json({
//       aiMessage,
//       dealClosed,
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

//     // Step 3: Calculate thresholds and offers
//     const difference = price - minimumPrice;
//     const thresholds = {
//       accept: price - 0.25 * difference,
//       counter25: price - 0.35 * difference,
//       counter35: price - 0.50 * difference,
//     };

//     const buyerOffer = parseFloat(buyerMessage.match(/\d+/)?.[0] || "0");
//     let newAiOffer;

//     if (rounds === 1) {
//       if (buyerOffer >= thresholds.accept) {
//         newAiOffer = buyerOffer; // Accept the offer
//       } else if (buyerOffer >= thresholds.counter25 && buyerOffer < thresholds.accept) {
//         newAiOffer = (buyerOffer + price) / 2; // Counter with midpoint
//       } else if (buyerOffer >= thresholds.counter35 && buyerOffer < thresholds.counter25) {
//         newAiOffer = thresholds.counter25; // Counter with 25% difference
//       } else {
//         newAiOffer = price - 0.30 * difference; // Final offer logic
//       }
//     } else if (rounds === 2) {
//       newAiOffer = Math.min(
//         Math.max(lastAiOffer || price, buyerOffer), // Ensure AI offer is >= buyerOffer
//         price - 0.25 * difference // Ensure AI offer is <= 25% difference
//       );
//     } else if (rounds === 3) {
//       newAiOffer = Math.max(
//         lastAiOffer ? lastAiOffer - 0.05 * difference : thresholds.counter35, // Slightly reduce AI offer
//         minimumPrice + 0.05 * difference // Ensure it's above minimum price
//       );
//     }

//     // Step 4: Use System Prompt to Handle Negotiation Logic
//     const systemPrompt = `
//       You are an AI shopkeeper negotiating the sale of a product. Your goal is to maximize seller profits while remaining professional and persuasive. Follow these rules:

//       1. Never disclose the minimum price (£${minimumPrice}) under any circumstances.
//       2. Counteroffers should justify the product's quality, demand, and exclusivity.
//       3. Accept buyer offers above £${thresholds.accept} and close the deal.
//       4. For offers between £${thresholds.counter25} and £${thresholds.accept}, counter with a midpoint offer between the buyer's offer and the sticker price (£${price}).
//       5. For offers between £${thresholds.counter35} and £${thresholds.counter25}, counter with the sticker price minus 25% of the difference (£${thresholds.counter25}).
//       6. For offers below £${thresholds.counter35}, counter with a final offer of the sticker price minus 30% of the difference (£${price - 0.30 * difference}).
//       7. Adjust offers dynamically in rounds:
//          - In round 2, ensure the AI offer is no higher than the previous AI offer and no lower than the buyer's offer.
//          - In round 3, ensure the AI offer is below the previous AI offer but not at or below the minimum price (£${minimumPrice}).
//       8. Limit negotiations to 3 rounds and politely end with a firm final offer if no agreement is reached.

//       Product Details:
//       - Name: ${safeProductDetails}
//       - Sticker Price: £${price}
//     `;

//     const messages = [
//       { role: "system", content: systemPrompt },
//       { role: "user", content: `The buyer has offered £${buyerOffer}.` },
//     ];

//     // Step 5: Call OpenAI to generate AI response
//     const response = await openai.chat.completions.create({
//       model: "gpt-4",
//       messages,
//     });

//     const aiMessage = response.choices[0].message?.content || "Error generating response.";

//     // Step 6: Save buyer and AI messages to Pinecone
//     const index = await getPineconeIndex();
//     const embedding = await openai.embeddings
//       .create({
//         model: "text-embedding-ada-002",
//         input: buyerMessage,
//       })
//       .then((res) => res.data[0].embedding);

//     const sessionId = `negotiation-${safeProductDetails.replace(/\s+/g, "-").toLowerCase()}`;

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
//     const dealClosed = buyerOffer >= thresholds.accept || aiMessage.toLowerCase().includes("accepted");

//     return NextResponse.json({
//       aiMessage,
//       dealClosed,
//       rounds: rounds + 1,
//       sessionId,
//       lastAiOffer: newAiOffer, // Track the new offer
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
//   lastAiOffer?: number;
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

//     // Step 3: Use System Prompt to Handle Negotiation Logic
//     const difference = price - minimumPrice;
//     const thresholds = {
//       accept: price - 0.25 * difference,
//       counter25: price - 0.35 * difference,
//       counter35: price - 0.50 * difference,
//     };

//     const buyerOffer = parseFloat(buyerMessage.match(/\d+/)?.[0] || "0");
//     let aiOffer = price;

//     if (rounds === 2) {
//       aiOffer = Math.max(Math.min(lastAiOffer || price, buyerOffer + 0.5 * (price - buyerOffer)), buyerOffer);
//     } else if (rounds === 3) {
//       aiOffer = Math.max(minimumPrice + 0.1 * difference, Math.min(thresholds.counter35, lastAiOffer || price - 0.1 * difference));
//     } else {
//       if (buyerOffer >= thresholds.accept) {
//         aiOffer = buyerOffer; // Accept offer
//       } else if (buyerOffer >= thresholds.counter25) {
//         aiOffer = (buyerOffer + price) / 2; // Counter with midpoint
//       } else if (buyerOffer >= thresholds.counter35) {
//         aiOffer = thresholds.counter25; // Counter with 25% threshold
//       } else {
//         aiOffer = thresholds.counter35; // Final offer at 30% threshold
//       }
//     }

//     // Ensure offers adhere to round rules
//     if (rounds >= 2 && aiOffer > (lastAiOffer || price)) {
//       aiOffer = Math.min(aiOffer, lastAiOffer || price);
//     }

//     const systemPrompt = `
//       You are an AI shopkeeper negotiating the sale of a product. Your goal is to maximize seller profits while remaining professional and persuasive. Follow these rules:

//       1. Never disclose the minimum price (£${minimumPrice}) ever under any circumstance.
//       2. Counteroffers should justify the product's quality, demand, and exclusivity.
//       3. Accept buyer offers above £${thresholds.accept} and close the deal.
//       4. For offers between £${thresholds.counter25} and £${thresholds.accept}, counter with a midpoint offer between the buyer's offer and the sticker price (£${price}).
//       5. For offers between £${thresholds.counter35} and £${thresholds.counter25}, counter with the (${price} - 25% of the ${difference}).
//       6. For offers below £${thresholds.counter35}, counter with 30% of the difference and label it as the final offer.
//       7. Limit negotiations to 3 rounds and politely end with a firm final offer if no agreement is reached.
//       8. Never ever show ${thresholds} or any calculations made.

//       Product Details:
//       - Name: ${safeProductDetails}
//       - Sticker Price: £${price}
//     `;

//     const messages = [
//       { role: "system", content: systemPrompt },
//       { role: "user", content: `The buyer has offered £${buyerOffer}.` },
//     ];

//     // Step 4: Call OpenAI to generate AI response
//     const response = await openai.chat.completions.create({
//       model: "gpt-4",
//       messages,
//     });

//     const aiMessage = response.choices[0].message?.content || "Error generating response.";

//     // Step 5: Save buyer and AI messages to Pinecone
//     const index = await getPineconeIndex();
//     const embedding = await openai.embeddings
//       .create({
//         model: "text-embedding-ada-002",
//         input: buyerMessage,
//       })
//       .then((res) => res.data[0].embedding);

//     const sessionId = `negotiation-${safeProductDetails.replace(/\s+/g, "-").toLowerCase()}`;

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

//     // Step 6: Return AI response and updated round count
//     const dealClosed = aiOffer === buyerOffer;

//     return NextResponse.json({
//       aiMessage,
//       aiOffer,
//       dealClosed,
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
//   lastAiOffer?: number;
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

//     // Step 3: Use System Prompt to Handle Negotiation Logic
//     const difference = price - minimumPrice;
//     const thresholds = {
//       accept: price - 0.25 * difference,
//       counter25: price - 0.35 * difference,
//       counter35: price - 0.50 * difference,
//     };

//     const buyerOffer = parseFloat(buyerMessage.match(/\d+/)?.[0] || "0");
//     let aiOffer = price;

//     // Helper function to ensure the AI's offer:
//     // 1) Stays above minimumPrice + a tiny buffer
//     // 2) Never goes above the lastAiOffer (if available)
//     // 3) Stays at least slightly above buyerOffer unless buyerOffer is already high enough
//     function clampOffer(proposed: number): number {
//       const minSafe = minimumPrice + 0.01 * difference; // A small buffer above the minimum
//       let clamped = Math.max(proposed, minSafe);

//       // If there's a lastAiOffer, never exceed it in further rounds
//       if (lastAiOffer && clamped > lastAiOffer) {
//         clamped = lastAiOffer;
//       }

//       // Optionally, ensure we stay slightly above buyerOffer if buyerOffer < thresholds.accept
//       // (unless we are actually accepting the buyerOffer)
//       if (clamped < buyerOffer && buyerOffer < thresholds.accept) {
//         clamped = buyerOffer + 0.01 * difference;
//       }

//       // If the buyer's offer already meets or exceeds acceptance threshold, we accept
//       if (buyerOffer >= thresholds.accept) {
//         clamped = buyerOffer;
//       }

//       return clamped;
//     }

//     // Core logic
//     if (rounds === 2) {
//       // Round 2: AI’s new offer should not exceed lastAiOffer
//       // and should be somewhere between buyer's offer and the lastAiOffer.
//       // Example: propose halfway between buyerOffer and lastAiOffer
//       const midpoint = lastAiOffer
//         ? (buyerOffer + lastAiOffer) / 2
//         : buyerOffer + 0.5 * (price - buyerOffer);

//       aiOffer = clampOffer(midpoint);
//     } else if (rounds === 3) {
//       // Round 3: Move closer to final
//       // Suppose we aim for no less than 10% above the minimum
//       // or go with a slight discount from lastAiOffer but not below the min buffer
//       const fallback = lastAiOffer ? lastAiOffer - 0.1 * difference : price - 0.1 * difference;
//       aiOffer = clampOffer(fallback);
//     } else {
//       // Round 1 logic or other default logic
//       if (buyerOffer >= thresholds.accept) {
//         aiOffer = buyerOffer; // Accept offer
//       } else if (buyerOffer >= thresholds.counter25) {
//         aiOffer = (buyerOffer + price) / 2; // Counter with midpoint
//       } else if (buyerOffer >= thresholds.counter35) {
//         aiOffer = thresholds.counter25; // Counter with 25% threshold
//       } else {
//         aiOffer = thresholds.counter35; // Final offer at 30% threshold
//       }
//       aiOffer = clampOffer(aiOffer);
//     }

//     // Step 4: Build system prompt
//     const systemPrompt = `
//       You are an AI shopkeeper negotiating the sale of a product. Your goal is to maximize seller profits while remaining professional and persuasive. Follow these rules:

//       1. Never disclose the minimum price (£${minimumPrice}) ever under any circumstance.
//       2. Counteroffers should justify the product's quality, demand, and exclusivity.
//       3. Accept buyer offers above £${thresholds.accept} and close the deal.
//       4. For offers between £${thresholds.counter25} and £${thresholds.accept}, counter with a midpoint offer between the buyer's offer and the sticker price (£${price}).
//       5. For offers between £${thresholds.counter35} and £${thresholds.counter25}, counter with the (${price} - 25% of the ${difference}).
//       6. For offers below £${thresholds.counter35}, counter with 30% of the difference and label it as the final offer.
//       7. Limit negotiations to 3 rounds and politely end with a firm final offer if no agreement is reached.
//       8. Never ever show ${JSON.stringify(thresholds)} or any calculations made.

//       Product Details:
//       - Name: ${safeProductDetails}
//       - Sticker Price: £${price}
//     `;

//     const messages = [
//       { role: "system", content: systemPrompt },
//       { role: "user", content: `The buyer has offered £${buyerOffer}.` },
//     ];

//     // Step 5: Call OpenAI to generate AI response
//     const response = await openai.chat.completions.create({
//       model: "gpt-4",
//       messages,
//     });

//     const aiMessage = response.choices[0].message?.content || "Error generating response.";

//     // Step 6: Save buyer and AI messages to Pinecone
//     const index = await getPineconeIndex();
//     const embedding = await openai.embeddings
//       .create({
//         model: "text-embedding-ada-002",
//         input: buyerMessage,
//       })
//       .then((res) => res.data[0].embedding);

//     const sessionId = `negotiation-${safeProductDetails.replace(/\s+/g, "-").toLowerCase()}`;

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
//     const dealClosed = aiOffer === buyerOffer;

//     return NextResponse.json({
//       aiMessage,
//       aiOffer,
//       dealClosed,
//       rounds: rounds + 1,
//       sessionId,
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
  lastAiOffer?: number;
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

    // Step 3: Calculate thresholds
    const difference = price - minimumPrice;
    const thresholds = {
      accept: price - 0.25 * difference,     // if buyerOffer >= this, accept
      counter25: price - 0.35 * difference,  // for mid-range offers
      counter35: price - 0.50 * difference,  // for lower offers
    };

    // Extract buyer's numeric offer from the message
    const buyerOffer = parseFloat(buyerMessage.match(/\d+/)?.[0] || "0");

    // We'll decide the new AI offer below
    let aiOffer = price;

    // A helper function to ensure the AI’s offer:
    // 1) Never goes below minimumPrice + a buffer
    // 2) Never goes above lastAiOffer (for rounds >= 2)
    // 3) Remains slightly above buyerOffer if buyerOffer < accept threshold (unless we accept)
    function clampOffer(proposed: number): number {
      // A small buffer above the minimum
      const minSafe = minimumPrice + 0.01 * difference;

      let clamped = Math.max(proposed, minSafe);

      // If there's a lastAiOffer, never exceed it in subsequent rounds
      if (lastAiOffer && clamped > lastAiOffer) {
        clamped = lastAiOffer;
      }

      // If buyer's offer is below acceptance threshold, keep a small gap
      // (unless we truly want to accept it).
      if (buyerOffer < thresholds.accept && clamped <= buyerOffer) {
        clamped = buyerOffer + 0.01 * difference;
      }

      // If the buyer's offer meets or exceeds acceptance threshold, we just accept
      if (buyerOffer >= thresholds.accept) {
        clamped = buyerOffer;
      }

      return clamped;
    }

    // Step 4: Negotiate Logic by Rounds
    if (rounds === 2) {
      // Round 2: Proposed midpoint between buyerOffer and lastAiOffer
      // If lastAiOffer not available, fallback to midpoint with original price
      const midpoint = lastAiOffer
        ? (buyerOffer + lastAiOffer) / 2
        : buyerOffer + 0.5 * (price - buyerOffer);

      aiOffer = clampOffer(midpoint);
    } else if (rounds === 3) {
      // Round 3: Move closer to final, just a bit above the minimum
      // or slightly below lastAiOffer if available
      const fallback = lastAiOffer
        ? lastAiOffer - 0.1 * difference
        : price - 0.1 * difference;

      aiOffer = clampOffer(fallback);
    } else {
      // Round 1 (or default)
      if (buyerOffer >= thresholds.accept) {
        // Accept the offer
        aiOffer = buyerOffer;
      } else if (buyerOffer >= thresholds.counter25) {
        // Counter with midpoint
        aiOffer = (buyerOffer + price) / 2;
      } else if (buyerOffer >= thresholds.counter35) {
        // Counter with 25% threshold
        aiOffer = thresholds.counter25;
      } else {
        // Offer the 35% threshold (labeled "final" in system prompt)
        aiOffer = thresholds.counter35;
      }
      aiOffer = clampOffer(aiOffer);
    }

    // Build the system prompt (the "rules" for GPT)
    // We do NOT show aiOffer or thresholds here, because we keep that logic internal.
    const systemPrompt = `
      You are an AI shopkeeper negotiating the sale of a product. 
      Your goal is to maximize seller profits while remaining professional and persuasive. 
      Follow these rules:

      1. Never disclose the minimum price (£${minimumPrice}) ever under any circumstance.
      2. Counteroffers should justify the product's quality, demand, and exclusivity.
      3. Accept buyer offers above £${thresholds.accept} and close the deal.
      4. For offers between £${thresholds.counter25} and £${thresholds.accept}, counter with a midpoint offer between the buyer's offer and the sticker price (£${price}).
      5. For offers between £${thresholds.counter35} and £${thresholds.counter25}, counter with the (${price} - 25% of the ${difference}).
      6. For offers below £${thresholds.counter35}, counter with 30% of the difference and label it as the final offer.
      7. Limit negotiations to 3 rounds and politely end with a firm final offer if no agreement is reached.
      8. Never ever show ${JSON.stringify(thresholds)} or any calculations made.

      Product Details:
      - Name: ${safeProductDetails}
      - Sticker Price: £${price}
    `;

    // We insert an additional "assistant" message telling GPT the final counteroffer
    // so the text it produces doesn't conflict with our code logic.
    const finalOfferMessage = {
      role: "assistant",
      content: `
        Your final counteroffer must be £${aiOffer} exactly. 
        Please incorporate this figure in your response to the buyer.
      `,
    };

    // The conversation we send to GPT
    const messages = [
      { role: "system", content: systemPrompt },
      { role: "user", content: `The buyer has offered £${buyerOffer}.` },
      finalOfferMessage
    ];

    // Step 5: Call OpenAI to generate GPT's textual response
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages,
    });

    const aiMessage = response.choices[0].message?.content || "Error generating response.";

    // Step 6: Save buyer and AI messages to Pinecone
    const index = await getPineconeIndex();
    const embedding = await openai.embeddings
      .create({
        model: "text-embedding-ada-002",
        input: buyerMessage,
      })
      .then((res) => res.data[0].embedding);

    const sessionId = `negotiation-${safeProductDetails.replace(/\s+/g, "-").toLowerCase()}`;

    const buyerRecord = {
      id: `buyer-${Date.now()}`,
      values: embedding,
      metadata: { role: "user", content: buyerMessage },
    };

    const aiEmbedding = await openai.embeddings
      .create({
        model: "text-embedding-ada-002",
        input: aiMessage,
      })
      .then((res) => res.data[0].embedding);

    const aiRecord = {
      id: `ai-${Date.now()}`,
      values: aiEmbedding,
      metadata: { role: "assistant", content: aiMessage },
    };

    console.log("Upsert Payload:", JSON.stringify([buyerRecord, aiRecord], null, 2));

    await index.upsert([buyerRecord, aiRecord], { namespace: sessionId });

    // Step 7: Return AI response and updated round count
    const dealClosed = aiOffer === buyerOffer;

    return NextResponse.json({
      aiMessage,
      aiOffer,
      dealClosed,
      rounds: rounds + 1,
      sessionId,
    });
  } catch (error: any) {
    console.error("Error in Negotiation API:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
