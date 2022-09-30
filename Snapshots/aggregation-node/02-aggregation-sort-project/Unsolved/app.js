const { MongoClient } = require("mongodb")
require("dotenv").config()
const uri = process.env.MONGODB_URI
const client = new MongoClient(uri)
const safeURI = `${uri.slice(0, 14)}****${uri.slice(30, 31)}****${uri.slice(47)}`

const dbname = "bank";
const collection_name = "accounts";
const accountsCollection = client.db(dbname).collection(collection_name);

const pipeline = [
  // Stage 1: $match - filter the documents (checking, balance >= 1500)

  // Stage 2: $sort - sorts the documents in descending order (balance)

  // Stage 3: $project - project only the requested fields and one computed field (account_type, balance, gbp_balance)
]

const main = async () => {
  try {
    await client.connect()
    console.log(`Connected to the database 🌍\n ${safeURI}`)
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

