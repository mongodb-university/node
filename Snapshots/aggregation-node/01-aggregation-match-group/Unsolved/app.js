const { MongoClient } = require("mongodb")
require("dotenv").config()
const uri = process.env.MONGODB_URI
const client = new MongoClient(uri)
const dbname = "bank";
const collection_name = "accounts";
const accountsCollection = client.db(dbname).collection(collection_name);

const pipeline = [
  // Stage 1: match the accounts with a balance greater than $1,000

  // Stage 2: Calculate average balance and total balance
]

const main = async () => {
  try {
    await client.connect()
    console.log(`Connected to the database 🌍. \nFull connection string: ${uri}`)
    let result = await accountsCollection.aggregate(pipeline)
    for await (const doc of result) {
      console.log(doc)
    }
  } catch (err) {
    console.error(`Error connecting to the database: ${err}`)
  } finally {
    await client.close()
  }
}

main()
