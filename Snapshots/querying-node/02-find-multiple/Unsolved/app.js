const { MongoClient } = require("mongodb")
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
    console.log(
      `Connected to the ${dbname} database 🌍 \nFull connection string: ${safeURI}`
    )
  } catch (err) {
    console.error(`Error connecting to the database: ${err}`)
  }
}

const documentsToFind = { balance: { $gt: 4700 } }

const main = async () => {
  try {
    await connectToDatabase();
    // TODO: Run a method on the accounts collection and assign it to a variable, `result`
    // let result =
    let docCount = accountsCollection.countDocuments(documentsToFind)
    await result.forEach((doc) => console.log(doc));
    console.log(`Found ${await docCount} documents`);
  } catch (err) {
    console.error(`Error finding documents: ${err}`)
  } finally {
    await client.close()
  }
}

main()
