// Require MongoDB language driver
const { MongoClient } = require("mongodb")
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

const sampleAccounts = [
  {
    account_id: "MDB011235813",
    account_holder: "Ada Lovelace",
    account_type: "checking",
    balance: 60218,
  },
  {
    account_id: "MDB829000001",
    account_holder: "Muhammad ibn Musa al-Khwarizmi",
    account_type: "savings",
    balance: 267914296,
  },
]

const main = async () => {
  try {
    await connectToDatabase();
    // TODO: Run the insertOne method on the accounts collection and assign it to a variable,`result` 💡
    // let result =
    console.log(`Inserted ${result.insertedCount} documents`);
    console.log(result);
  } catch (err) {
    console.error(`Error inserting documents: ${err}`)
  } finally {
    await client.close()
  }
}

main()
