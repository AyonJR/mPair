import { connectDb } from "@/lib/connectDb";

export const POST = async (request: Request) => {
  try {
    const { date, accountType, head, amount, email } = await request.json();

    if (!date || !accountType || !head || !amount || !email) {
      return new Response(
        JSON.stringify({ message: "All fields are required." }),
        { status: 400 }
      );
    }

    const db = await connectDb();
    const accountingCollection = db.collection("accounting");

    const newEntry = {
      date,
      accountType,
      head,
      amount: parseFloat(amount), 
      email,
    };

    const result = await accountingCollection.insertOne(newEntry);

    return new Response(
      JSON.stringify({ message: "Accounting entry added successfully", id: result.insertedId }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST handler:", error);
    return new Response(
      JSON.stringify({ message: "An unexpected error occurred", error: error.message }),
      { status: 500 }
    );
  }
};
