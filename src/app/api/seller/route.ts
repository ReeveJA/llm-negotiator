// import { NextRequest, NextResponse } from "next/server";
// import { OpenAIEmbeddings } from "@langchain/openai";
// import { getPineconeIndex } from "../../../utils/pinecone";

// interface SellerRequestBody {
//   productDetails: string;
//   metadata?: Record<string, any>;
// }

// export async function POST(req: NextRequest) {
//   try {
//     // Parse the request body
//     const body: SellerRequestBody = await req.json();
//     const { productDetails, metadata } = body;

//     if (!productDetails) {
//       return NextResponse.json({ message: "Product details are required." }, { status: 400 });
//     }

//     // Step 1: Generate embedding using LangChain
//     const embeddings = new OpenAIEmbeddings({
//       openAIApiKey: process.env.OPENAI_API_KEY as string,
//     });
//     const embedding = await embeddings.embedQuery(productDetails);

//     if (!Array.isArray(embedding)) {
//       throw new Error("Embedding generation failed. Expected an array but got: " + typeof embedding);
//     }

//     // Step 2: Prepare the vector for upsert
//     const record = {
//       id: `product-${Date.now()}`, // Unique ID for the product
//       values: embedding, // Embedding array
//       metadata: metadata || {}, // Optional metadata
//     };

//     // Step 3: Target the index and upsert the vector
//     const index = await getPineconeIndex();
//     console.log("Upserting the following record:", JSON.stringify(record, null, 2));

//     await index.upsert([record]); // Upsert expects an array of records

//     // Step 4: Respond with success
//     return NextResponse.json({
//       message: "Product saved successfully.",
//       productId: record.id,
//     });
//   } catch (error: any) {
//     console.error("Error in Seller API:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// import { NextRequest, NextResponse } from "next/server";
// import { OpenAIEmbeddings } from "@langchain/openai";
// import { getPineconeIndex } from "../../../utils/pinecone";

// interface SellerRequestBody {
//   productDetails: string;
//   metadata?: {
//     price?: number; // Optional listed price
//     minimumPrice?: number; // Seller's minimum acceptable price
//     [key: string]: any; // Flexible for additional fields
//   };
// }

// export async function POST(req: NextRequest) {
//   try {
//     // Parse the request body
//     const body: SellerRequestBody = await req.json();
//     const { productDetails, metadata } = body;

//     if (!productDetails) {
//       return NextResponse.json({ message: "Product details are required." }, { status: 400 });
//     }

//     if (!metadata?.minimumPrice) {
//       return NextResponse.json(
//         { message: "Minimum price is required in metadata." },
//         { status: 400 }
//       );
//     }

//     // Validate that minimumPrice is logical
//     if (
//       metadata.price &&
//       metadata.minimumPrice > metadata.price
//     ) {
//       return NextResponse.json(
//         { message: "Minimum price cannot be greater than the listed price." },
//         { status: 400 }
//       );
//     }

//     // Step 1: Generate embedding using LangChain
//     const embeddings = new OpenAIEmbeddings({
//       openAIApiKey: process.env.OPENAI_API_KEY as string,
//     });
//     const embedding = await embeddings.embedQuery(productDetails);

//     if (!Array.isArray(embedding)) {
//       throw new Error("Embedding generation failed. Expected an array but got: " + typeof embedding);
//     }

//     // Step 2: Prepare the vector for upsert
//     // const record = {
//     //   id: `product-${Date.now()}`, // Unique ID for the product
//     //   values: embedding, // Embedding array
//     //   metadata: metadata || {}, // Optional metadata
//     // };

//     const record = {
//       id: `product-${Date.now()}`,
//       values: embedding,
//       metadata: {
//         ...metadata,
//         price: Number(metadata.price), // Ensure price is a number
//         minimumPrice: Number(metadata.minimumPrice), // Ensure minimumPrice is a number
//       },
//     };
    

//     // Step 3: Target the index and upsert the vector
//     const index = await getPineconeIndex();
//     console.log("Upserting the following record:", JSON.stringify(record, null, 2));

//     await index.upsert([record], { namespace: "" }); // or "default" if you want to explicitly set it

//     // Step 4: Respond with success
//     return NextResponse.json({
//       message: "Product saved successfully.",
//       productId: record.id,
//     });
//   } catch (error: any) {
//     console.error("Error in Seller API:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }


import { NextRequest, NextResponse } from "next/server";
import { OpenAIEmbeddings } from "@langchain/openai";
import { getPineconeIndex } from "../../../utils/pinecone";

interface SellerRequestBody {
  title: string; // Added title field
  productDetails: string;
  metadata?: {
    price?: number; // Optional listed price
    minimumPrice?: number; // Seller's minimum acceptable price
    category?: string;
    used?: boolean;
    condition?: string;
    [key: string]: any; // Flexible for additional fields
  };
}

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body: SellerRequestBody = await req.json();
    const { title, productDetails, metadata } = body;

    if (!title || !productDetails) {
      return NextResponse.json({ message: "Title and product details are required." }, { status: 400 });
    }

    if (!metadata?.minimumPrice) {
      return NextResponse.json(
        { message: "Minimum price is required in metadata." },
        { status: 400 }
      );
    }

    // Validate that minimumPrice is logical
    if (metadata.price && metadata.minimumPrice > metadata.price) {
      return NextResponse.json(
        { message: "Minimum price cannot be greater than the listed price." },
        { status: 400 }
      );
    }

    // Step 1: Generate embedding using LangChain
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY as string,
    });
    const embedding = await embeddings.embedQuery(`${title} ${productDetails}`);

    if (!Array.isArray(embedding)) {
      throw new Error("Embedding generation failed. Expected an array but got: " + typeof embedding);
    }

    // Step 2: Prepare the vector for upsert
    const record = {
      id: `product-${Date.now()}`, // Unique ID for the product
      values: embedding, // Embedding array
      metadata: {
        title,
        productDetails,
        ...metadata,
        price: Number(metadata.price), // Ensure price is a number
        minimumPrice: Number(metadata.minimumPrice), // Ensure minimumPrice is a number
      },
    };

    // Step 3: Target the index and upsert the vector
    const index = await getPineconeIndex();
    console.log("Upserting the following record:", JSON.stringify(record, null, 2));

    await index.upsert([record], { namespace: "default" });

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
