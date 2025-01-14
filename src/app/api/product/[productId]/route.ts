import { NextRequest, NextResponse } from "next/server";
import { getPineconeIndex } from "../../../../utils/pinecone";

export async function GET(req: NextRequest, context: { params: { productId?: string } }) {
  try {
    const { productId } = context.params;

    if (!productId) {
      console.error("Product ID is missing.");
      return NextResponse.json({ error: "Product ID is required." }, { status: 400 });
    }

    const sanitizedProductId = productId.trim().replace(/\s+/g, ""); // Sanitize ID
    console.log("Sanitized Product ID:", sanitizedProductId);

    const index = await getPineconeIndex();

    // Fetch product details with namespace
    const queryResponse = await index.fetch([sanitizedProductId], { namespace: "" }); // Default namespace
    console.log("Full Pinecone Query Response:", JSON.stringify(queryResponse, null, 2));

    if (!queryResponse || !queryResponse.vectors || !queryResponse.vectors[sanitizedProductId]) {
      console.error("Product not found in Pinecone:", sanitizedProductId);
      return NextResponse.json({ error: "Product not found." }, { status: 404 });
    }

    const product = queryResponse.vectors[sanitizedProductId];

    return NextResponse.json({
      id: sanitizedProductId,
      metadata: product.metadata,
    });
  } catch (error: any) {
    console.error("Error fetching product details:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
