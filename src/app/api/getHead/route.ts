import { connectDb } from "@/lib/connectDb";

// GET handler to fetch account heads
export const GET = async (request: Request) => {
  try {
    const db = await connectDb();
    const headCollection = db.collection("head");

    // Fetch all account heads
    const accountHeads = await headCollection.find().toArray();

    return new Response(
      JSON.stringify({ accountHeads }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in GET handler:", error);
    return new Response(
      JSON.stringify({ message: "Something went wrong", error: error.message }),
      { status: 500 }
    );
  }
};
