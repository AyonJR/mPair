import { connectDb } from "@/lib/connectDb";

export const POST = async (request: Request) => {
  try {
    const { accountType, name , email } = await request.json();

    if (!accountType || !name || !email) {
      return new Response(
        JSON.stringify({ message: "Both account type and name are required." }),
        { status: 400 }
      );
    }

    const db = await connectDb();
    const headCollection = db.collection("head");

    const res = await headCollection.insertOne({ accountType, name , email });

    return new Response(
      JSON.stringify({ message: "Account head created", head: res.insertedId }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST handler:", error);
    return new Response(
      JSON.stringify({ message: "Something went wrong", error: error.message }),
      { status: 500 }
    );
  }
};
