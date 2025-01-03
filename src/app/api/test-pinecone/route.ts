import { NextRequest, NextResponse } from "next/server";
import { getPineconeIndex } from "../../../utils/pinecone";

export async function GET() {
  try {
    const index = await getPineconeIndex();

    // Test a basic operation: Describe the index
    const description = await index.describeIndexStats();
    console.log("Pinecone Index Description:", description);

    return NextResponse.json({
      message: "Pinecone is initialized successfully!",
      description,
    });
  } catch (error: any) {
    console.error("Error initializing Pinecone:", error);
    return NextResponse.json({ message: "Failed to initialize Pinecone", error: error.message }, { status: 500 });
  }
}
