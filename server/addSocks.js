import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const uri = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const collectionName = process.env.MONGO_DB_COLLECTION;


// Function to generate random sock details
// Function to generate random sock details
function generateSock() {
  const sizes = ["Small", "Medium", "Large"];
  const colors = ["Red", "Blue", "Green", "Yellow"];
  const patterns = ["Striped", "Plain", "Polka Dot"];
  const materials = ["Cotton", "Silk", "Bamboo"];
  const conditions = ["New", "Used"];
  const forFootOptions = ["Left", "Right", "Both"];

  return {
    _id: new ObjectId(), // Generate a valid ObjectId
    sockDetails: {
      size: sizes[Math.floor(Math.random() * sizes.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      pattern: patterns[Math.floor(Math.random() * patterns.length)],
      material: materials[Math.floor(Math.random() * materials.length)],
      condition: conditions[Math.floor(Math.random() * conditions.length)],
      forFoot: forFootOptions[Math.floor(Math.random() * forFootOptions.length)]
    },
    additionalFeatures: {
      waterResistant: Math.random() < 0.5,
      padded: Math.random() < 0.5,
      antiBacterial: Math.random() < 0.5
    },
    addedTimestamp: new Date()
  };
}

// Main function to connect to the database, delete old data, and insert new socks
async function main() {
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Access the database and collection
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    // Delete all existing documents in the collection
    await collection.deleteMany({});
    console.log("Deleted all existing sock documents.");

    // Generate and insert multiple sock documents
    const numberOfSocks = 10; // Specify how many socks you want to generate
    const socks = [];
    for (let i = 0; i < numberOfSocks; i++) {
      socks.push(generateSock());
    }

    // Insert socks into the collection
    const result = await collection.insertMany(socks);
    console.log(`Inserted ${result.insertedCount} sock documents into the collection.`);
  } finally {
    // Close the connection
    await client.close();
  }
}

// Run the main function
main().catch(console.error);