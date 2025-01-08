import { connectDb } from "@/lib/connectDb";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return new Response(
      JSON.stringify({ message: "Email is required." }),
      { status: 400 }
    );
  }

  try {
    const db = await connectDb();
    const accountingCollection = db.collection("accounting");

    // Fetching the data for the specific email
    const accountingEntries = await accountingCollection
      .find({ email })
      .toArray();

    return new Response(
      JSON.stringify({ accountingEntries }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching accounting data:", error);
    return new Response(
      JSON.stringify({ message: "An error occurred while fetching the data." }),
      { status: 500 }
    );
  }
};
