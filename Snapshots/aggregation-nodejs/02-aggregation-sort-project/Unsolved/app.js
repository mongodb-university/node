const { MongoClient } = require("mongodb")
require("dotenv").config()
const uri = process.env.MONGODB_URI
const client = new MongoClient(uri)

const pipeline = [
  // Stage 1: $match - filter the documents (checking, balance >= 1500)

  // Stage 2: $sort - sorts the documents in descending order (balance)

  // Stage 3: $project - project only the requested fields and one computed field (account_type, balance, gbp_balance)
]

const main = async () => {
  try {
    await client.connect()
    console.log(`Connected to the database 🌍\n ${uri}`)
    let accounts = client.db("bank").collection("accounts")
    let result = await accounts.aggregate(pipeline)
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

