const { MongoClient, ObjectId } = require("mongodb")
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

const documentToDelete = { _id: ObjectId("62a3638521a9ad028fdf77a1") }

const main = async () => {
  try {
    await connectToDatabase()
    let result = await accountsCollection.deleteOne(documentToDelete)
    result.deletedCount === 1
      ? console.log("Deleted one document")
      : console.log("No documents deleted")
  } catch (err) {
    console.error(`Error deleting documents: ${err}`)
  } finally {
    await client.close()
  }
}

main()
