import { connectDb } from "@/lib/connectDb";

// GET handler to fetch account heads
export const GET = async (request: Request) => {
  try {
    const db = await connectDb();
    const headCollection = db.collection("head");

    // Get the email from query or headers (pass the email from the client)
    const url = new URL(request.url);
    const email = url.searchParams.get("email");

    if (!email) {
      return new Response(
        JSON.stringify({ message: "Email is required to fetch account heads" }),
        { status: 400 }
      );
    }

    // Fetch account heads based on email
    const accountHeads = await headCollection
      .find({ email })  // Filter by email
      .toArray();

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
