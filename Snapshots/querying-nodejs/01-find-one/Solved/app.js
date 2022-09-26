// Require MongoDB language driver
const { MongoClient } = require("mongodb")
const { ObjectId } = require("mongodb")
require("dotenv").config()

const uri = process.env.MONGODB_URI
const client = new MongoClient(uri)

const dbname = "bank"
const collection_name = "accounts"

const accountsCollection = client.db(dbname).collection(collection_name)

// Connect to the database
const connectToDatabase = async () => {
  try {
    await client.connect()
    console.log(`Connected to the ${dbname} database 🌍 \nFull connection string: ${uri}`)
  } catch (err) {
    console.error(`Error connecting to the database: ${err}`)
  }
}

const documentToFind = { _id: ObjectId("62d6e04ecab6d8e130497491") };

const main = async () => {
  try {
    await connectToDatabase()
    let result = await accountsCollection.findOne(documentToFind)
    console.log(`Found one document`)
    console.log(result)
  } catch (err) {
    console.error(`Error finding document: ${err}`)
  } finally {
    await client.close()
  }
}

main()

