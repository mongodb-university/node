// Require MongoDB language driver
const { MongoClient } = require("mongodb")
const { ObjectId } = require("mongodb")
require("dotenv").config()

const uri = process.env.MONGODB_URI
const safeURI = `${uri.slice(0, 14)}****${uri.slice(30, 31)}****${uri.slice(47)}`

const client = new MongoClient(uri)

const dbname = "bank"
const collection_name = "accounts"

const accountsCollection = client.db(dbname).collection(collection_name)

// Connect to the database
const connectToDatabase = async () => {
  try {
    await client.connect()
    console.log(`Connected to the ${dbname} database 🌍 \nFull connection string: ${safeURI}`)
  } catch (err) {
    console.error(`Error connecting to the database: ${err}`)
  }
}

const documentToFind = { _id: ObjectId("62d6e04ecab6d8e130497491") };

const main = async () => {
  try {
    await connectToDatabase();
    // TODO: Find the document included in `documentToFind` and assign the result to a variable, `result` 💡
    // let result =
    console.log(`Found one document`);
    console.log(result);
  } catch (err) {
    console.error(`Error finding document: ${err}`)
  } finally {
    await client.close()
  }
}

main()

