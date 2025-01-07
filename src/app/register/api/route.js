import { connectDb } from "../../../lib/connectDb";

export const POST = async (request) => {
  const newUser = await request.json();

  try {
    const db = await connectDb(); // Connect to DB
    const userCollection = db.collection("user"); // Access collection

    // Check if the user already exists
    const exist = await userCollection.findOne({ email: newUser.email });
    if (exist) {
      return Response.json({ message: "User already exists" }, { status: 400 });
    }

    // Insert new user
    const res = await userCollection.insertOne(newUser);
    return Response.json(
      { message: "User created", userId: res.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST handler:", error);
    return Response.json(
      { message: "Something went wrong", error: error.message },
      { status: 500 }
    );
  }
};
