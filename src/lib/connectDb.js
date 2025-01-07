const { MongoClient, ServerApiVersion } = require("mongodb");

let db;

export const connectDb = async () => {
  if (db) return db; // Return existing connection

  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4dm99p5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    // Connect the client to the server
    await client.connect();
    console.log("Connected to MongoDB!");
    db = client.db("mPair"); // Assign the connected database
    return db;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error; // Re-throw the error for higher-level handling
  }
};
