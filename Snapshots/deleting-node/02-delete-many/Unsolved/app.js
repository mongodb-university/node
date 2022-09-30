// Require MongoDB language driver
const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGODB_URI;
const safeURI = `${uri.slice(0, 14)}****${uri.slice(30, 31)}****${uri.slice(47)}`

const client = new MongoClient(uri);

const dbname = "bank";
const collection_name = "accounts";

const accountsCollection = client.db(dbname).collection(collection_name);

// Connect to the database
const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log(
      `Connected to the ${dbname} database 🌍 \nFull connection string: ${safeURI}`
    );
  } catch (err) {
    console.error(`Error connecting to the database: ${err}`);
  }
};

const documentsToDelete = { balance: { $lt: 500 } };

const main = async () => {
  try {
    await connectToDatabase();
    // TODO: Run the deleteMany() method on the accounts collection and assign it to a variable, `result`
    // let result =
    result.deletedCount > 0
      ? console.log(`Deleted ${result.deletedCount} documents`)
      : console.log("No documents deleted");
  } catch (err) {
    console.error(`Error deleting documents: ${err}`);
  } finally {
    await client.close();
  }
};

main();
