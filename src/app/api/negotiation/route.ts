import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { getPineconeIndex } from "../../../utils/pinecone";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface NegotiationRequestBody {
  sessionId: string; // Unique negotiation session ID
  productDetails: string; // Details of the product being negotiated
  buyerMessage: string; // Buyer's current message
  sellerMinimumPrice: number; // Seller's minimum acceptable price
  rounds: number; // Current round count
}

interface PineconeMatch {
  metadata: {
    role: string;
    content: string;
  };
  score?: number; // Optional similarity score
}

export async function POST(req: NextRequest) {
  try {
    const body: NegotiationRequestBody = await req.json();
    const { sessionId, productDetails, buyerMessage, sellerMinimumPrice, rounds } = body;

    // Step 1: Validate input
    if (!sessionId || !productDetails || !buyerMessage || rounds === undefined) {
      return NextResponse.json({ message: "Missing required fields." }, { status: 400 });
    }

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

    const chatHistory = await index.query(
      {
        vector: embedding, // Query using the buyer's message embedding
        topK: 10,
        includeMetadata: true,
      },
      {
        namespace: sessionId,
      }
    );

    // Step 4: Construct developer and user messages
    const developerMessage = {
      role: "developer",
      content: `
        You are an AI shopkeeper negotiating a product sale.
        Product details: ${productDetails}.
        Rules:
        - Never agree to a price below £${sellerMinimumPrice}.
        - Provide counteroffers within reason.
        - End negotiation after 3 rounds if no agreement is reached.
      `,
    };

    const messages = [
        {
          role: "developer",
          content: `
            You are an AI shopkeeper negotiating a product sale.
            Product details: ${productDetails}.
            Rules:
            - Never agree to a price below £${sellerMinimumPrice}.
            - Provide counteroffers within reason.
            - End negotiation after 3 rounds if no agreement is reached.
          `,
        },
        ...(chatHistory.matches || [])
          .filter((match: PineconeMatch) => match.metadata?.role && match.metadata?.content) // Ensure both role and content exist
          .map((match: PineconeMatch) => ({
            role: match.metadata.role,
            content: match.metadata.content,
          })),
        {
          role: "user",
          content: buyerMessage,
        },
      ];
      

    console.log("Messages sent to OpenAI:", JSON.stringify(messages, null, 2));

    // Step 5: Call OpenAI to generate AI response
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages,
    });

    const aiMessage = response.choices[0].message?.content;

    if (!aiMessage) {
      throw new Error("AI response is empty or invalid.");
    }

    // Step 6: Save buyer and AI messages to Pinecone
    // Save buyer and AI messages to Pinecone
const buyerRecord = {
    id: `buyer-${Date.now()}`,
    values: await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: buyerMessage,
    }).then((res) => res.data[0].embedding),
    metadata: { role: "user", content: buyerMessage },
  };
  
  const aiRecord = {
    id: `ai-${Date.now()}`,
    values: await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: aiMessage || "",
    }).then((res) => res.data[0].embedding),
    metadata: { role: "assistant", content: aiMessage },
  };
  
  // Log the upsert payload for debugging
  console.log("Upsert Payload:", JSON.stringify([buyerRecord, aiRecord], null, 2));
  
  // Perform upsert
  await index.upsert(
    [buyerRecord, aiRecord], // Pass the array directly
    { namespace: sessionId } // Specify the namespace separately
  );
  
  
    // Step 7: Return AI response and updated round count
    return NextResponse.json({
      aiMessage,
      rounds: rounds + 1,
      sessionId,
    });
  } catch (error: any) {
    console.error("Error in Negotiation API:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
