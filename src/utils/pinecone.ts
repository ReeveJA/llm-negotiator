import { Pinecone } from "@pinecone-database/pinecone";

// Initialize Pinecone client (singleton pattern)
let pinecone: Pinecone | null = null;

/**
 * Initializes the Pinecone client and ensures it's only created once.
 */
export async function initPinecone(): Promise<Pinecone> {
  if (!pinecone) {
    pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY || "your-pinecone-api-key", // Use API key directly if not in .env
    });
  }
  return pinecone;
}

/**
 * Connects to a specific index in Pinecone.
 * @returns Pinecone index instance.
 */
export async function getPineconeIndex(): Promise<any> {
  const pinecone = await initPinecone();
  const indexName = process.env.PINECONE_INDEX || "default-index";
  return pinecone.index(indexName); // Connect to the specified index
}
