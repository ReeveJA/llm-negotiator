import { NextRequest, NextResponse } from "next/server";
import { OpenAIEmbeddings } from "@langchain/openai";
import { getPineconeIndex } from "../../../utils/pinecone";

interface QueryRequestBody {
  requirements: string;
  topK?: number; // Number of results to return
}

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body: QueryRequestBody = await req.json();
    const { requirements, topK = 3 } = body; // Default to top 3 results

    if (!requirements) {
      return NextResponse.json({ message: "Requirements are required." }, { status: 400 });
    }

    // Step 1: Generate embedding using LangChain
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY as string,
    });
    const queryEmbedding = await embeddings.embedQuery(requirements);

    if (!Array.isArray(queryEmbedding)) {
      throw new Error("Embedding generation failed. Expected an array but got: " + typeof queryEmbedding);
    }

    // Step 2: Query Pinecone for the top matches
    const index = await getPineconeIndex();
    console.log("Querying Pinecone with embedding:", queryEmbedding);

    const queryResponse = await index.query({
      vector: queryEmbedding, // Buyer requirements embedding
      topK, // Number of closest matches to return
      includeMetadata: true, // Include product metadata in the response
    });

    // Step 3: Respond with the matched results
    return NextResponse.json({
      message: "Query successful.",
      matches: queryResponse.matches,
    });
  } catch (error: any) {
    console.error("Error in Buyer Query API:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
