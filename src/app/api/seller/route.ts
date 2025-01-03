import { NextRequest, NextResponse } from "next/server";
import { OpenAIEmbeddings } from "@langchain/openai";
import { getPineconeIndex } from "../../../utils/pinecone";

interface SellerRequestBody {
  productDetails: string;
  metadata?: Record<string, any>;
}

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body: SellerRequestBody = await req.json();
    const { productDetails, metadata } = body;

    if (!productDetails) {
      return NextResponse.json({ message: "Product details are required." }, { status: 400 });
    }

    // Step 1: Generate embedding using LangChain
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY as string,
    });
    const embedding = await embeddings.embedQuery(productDetails);

    if (!Array.isArray(embedding)) {
      throw new Error("Embedding generation failed. Expected an array but got: " + typeof embedding);
    }

    // Step 2: Prepare the vector for upsert
    const record = {
      id: `product-${Date.now()}`, // Unique ID for the product
      values: embedding, // Embedding array
      metadata: metadata || {}, // Optional metadata
    };

    // Step 3: Target the index and upsert the vector
    const index = await getPineconeIndex();
    console.log("Upserting the following record:", JSON.stringify(record, null, 2));

    await index.upsert([record]); // Upsert expects an array of records

    // Step 4: Respond with success
    return NextResponse.json({
      message: "Product saved successfully.",
      productId: record.id,
    });
  } catch (error: any) {
    console.error("Error in Seller API:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
