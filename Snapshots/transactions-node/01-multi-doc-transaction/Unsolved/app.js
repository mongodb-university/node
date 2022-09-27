const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

// Collections
const accounts = client.db("bank").collection("accounts");
const transfers = client.db("bank").collection("transfers");

// Account information
let account_id_sender = "MDB574189300";
let account_id_receiver = "MDB343652528";
let transaction_amount = 100;

// Start the client session
const session = client.startSession();

// Use withTransaction to start a transaction, execute the callback, and commit the transaction
// The callback for withTransaction must be async/await
// Note: Each individual operation must be awaited and have the session passed in as an argument
const main = async () => {
  try {
    await session.withTransaction(async () => {
      // TODO: Update the sender balance and pass along the `session` object

      // TODO: Update the receiver balance and pass along the `session` object

      // Transaction object to be inserted into the `transfers` collection
      const transfer = {
        transfer_id: "TR21872187",
        amount: 100,
        from_account: account_id_sender,
        to_account: account_id_receiver,
      };

      // TODO: Insert `transfer` into the `transfers` collection and pass along the `session` object

      // TODO: Push the `transfer_id` into the `transfers_complete` array for `account_id_sender` and pass along the `session` object

      // TODO: Push the `transfer_id` into the `transfers_complete` array for `account_id_receiver` and pass along the `session` object
    });

    console.log("Committing transaction ...");
    // If the callback for withTransaction returns successfully without throwing an error, the transaction will be committed
    if (transactionResults) {
      console.log("The reservation was successfully created.");
    } else {
      console.log("The transaction was intentionally aborted.");
    }
  } catch (err) {
    console.error(`Transaction aborted: ${err}`);
    process.exit(1);
  } finally {
    await session.endSession();
    await client.close();
  }
};

main();
