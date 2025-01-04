// import { NextRequest, NextResponse } from "next/server";
// import { OpenAIEmbeddings } from "@langchain/openai";
// import { getPineconeIndex } from "../../../utils/pinecone";

// interface QueryRequestBody {
//   requirements: string;
//   topK?: number; // Number of results to return
// }

// export async function POST(req: NextRequest) {
//   try {
//     // Parse the request body
//     const body: QueryRequestBody = await req.json();
//     const { requirements, topK = 3 } = body; // Default to top 3 results

//     if (!requirements) {
//       return NextResponse.json({ message: "Requirements are required." }, { status: 400 });
//     }

//     // Step 1: Generate embedding using LangChain
//     const embeddings = new OpenAIEmbeddings({
//       openAIApiKey: process.env.OPENAI_API_KEY as string,
//     });
//     const queryEmbedding = await embeddings.embedQuery(requirements);

//     if (!Array.isArray(queryEmbedding)) {
//       throw new Error("Embedding generation failed. Expected an array but got: " + typeof queryEmbedding);
//     }

//     // Step 2: Query Pinecone for the top matches
//     const index = await getPineconeIndex();
//     console.log("Querying Pinecone with embedding:", queryEmbedding);

//     const queryResponse = await index.query({
//       vector: queryEmbedding, // Buyer requirements embedding
//       topK, // Number of closest matches to return
//       includeMetadata: true, // Include product metadata in the response
//     });

//     // Step 3: Respond with the matched results
//     return NextResponse.json({
//       message: "Query successful.",
//       matches: queryResponse.matches,
//     });
//   } catch (error: any) {
//     console.error("Error in Buyer Query API:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }


// import { NextRequest, NextResponse } from "next/server";
// import { OpenAIEmbeddings } from "@langchain/openai";
// import { getPineconeIndex } from "../../../utils/pinecone";

// interface QueryRequestBody {
//   requirements: string; // Buyer's semantic query
//   topK?: number; // Number of results to return
//   filters?: {
//     category?: string; // Optional category filter
//     price?: { min?: number; max?: number }; // Price range
//     [key: string]: any; // Flexible filters
//   };
// }

// export async function POST(req: NextRequest) {
//   try {
//     // Parse request body
//     const body: QueryRequestBody = await req.json();
//     const { requirements, topK, filters } = body;

//     if (!requirements) {
//       return NextResponse.json({ message: "Requirements are required." }, { status: 400 });
//     }

//     // Step 1: Generate embedding for the query
//     const embeddings = new OpenAIEmbeddings({
//       openAIApiKey: process.env.OPENAI_API_KEY as string,
//     });
//     const queryEmbedding = await embeddings.embedQuery(requirements);

//     if (!Array.isArray(queryEmbedding)) {
//       throw new Error("Embedding generation failed.");
//     }

//     // Step 2: Query Pinecone with optional filters
//     const index = await getPineconeIndex();
//     const queryResponse = await index.query({
//       vector: queryEmbedding,
//       topK: topK || 10,
//       includeMetadata: true,
//       filter: {
//         category: filters?.category || undefined,
//         price: filters?.price
//           ? { $lte: filters.price.max, $gte: filters.price.min || 0 }
//           : undefined,
//         ...filters, // Include other dynamic filters
//       },
//     });
    

//     // Step 3: Respond with matches
//     return NextResponse.json({
//       message: "Query successful.",
//       matches: queryResponse.matches,
//     });
//   } catch (error: any) {
//     console.error("Error in Buyer Query API:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }


import { NextRequest, NextResponse } from "next/server";
import { OpenAIEmbeddings } from "@langchain/openai";
import { getPineconeIndex } from "../../../utils/pinecone";

interface QueryRequestBody {
  requirements: string;
  topK?: number;
  filters?: {
    category?: string;
    price?: { min?: number; max?: number };
  };
}

export async function POST(req: NextRequest) {
  try {
    const body: QueryRequestBody = await req.json();
    const { requirements, topK, filters } = body;

    if (!requirements) {
      return NextResponse.json({ message: "Requirements are required." }, { status: 400 });
    }

    // Step 1: Generate embedding
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY as string,
    });
    const queryEmbedding = await embeddings.embedQuery(requirements);

    if (!Array.isArray(queryEmbedding)) {
      throw new Error("Embedding generation failed.");
    }

    // Step 2: Construct filter
    const filter = {
      category: filters?.category || undefined,
      price: filters?.price
        ? { $lte: filters.price.max, $gte: filters.price.min || 0 }
        : undefined,
    };

    console.log("Filter object:", filter);

    // Step 3: Query Pinecone
    const index = await getPineconeIndex();
    const queryResponse = await index.query({
      vector: queryEmbedding,
      topK: topK || 10,
      includeMetadata: true,
      filter,
    });

    // Step 4: Return results
    return NextResponse.json({
      message: "Query successful.",
      matches: queryResponse.matches,
    });
  } catch (error: any) {
    console.error("Error in Buyer Query API:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
