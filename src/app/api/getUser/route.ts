import { connectDb } from "@/lib/connectDb";

export const GET = async (request) => {
  try {
    const db = await connectDb();
    const userCollection = db.collection("user");

    const url = new URL(request.url);
    const email = url.searchParams.get("email");

    if (!email) {
      return new Response(
        JSON.stringify({ message: "Email is required to fetch user data" }),
        { status: 400 }
      );
    }

    const accountHead = await userCollection.findOne({ email });

    if (!accountHead) {
      return new Response(
        JSON.stringify({ message: "User not found" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(accountHead), { status: 200 });
  } catch (error) {
    console.error("Error in GET handler:", error);
    return new Response(
      JSON.stringify({ message: "Something went wrong", error: error.message }),
      { status: 500 }
    );
  }
};
