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
    const transactionResults = await session.withTransaction(async () => {
      // TODO Step 1: Update the sender balance and pass along the `session` object

      // Step 2: Update the account receiver balance
      const updateReceiverResults = await accounts.updateOne(
        { account_id: account_id_receiver },
        { $inc: { balance: transaction_amount } },
        { session }
      );
      console.log(
        `${updateReceiverResults.matchedCount} document(s) matched the filter, updated ${updateReceiverResults.modifiedCount} document(s) for the receiver account.`
      );

      // Step 3: Insert the transfer document
      const transfer = {
        transfer_id: "TR21872187",
        amount: 100,
        from_account: account_id_sender,
        to_account: account_id_receiver,
      };

      const insertTransferResults = await transfers.insertOne(transfer, {
        session,
      });
      console.log(
        `Successfully inserted ${insertTransferResults.insertedId} into the transfers collection`
      );

      // Step 4: Update the transfers_complete field for the sender account
      const updateSenderTransferResults = await accounts.updateOne(
        { account_id: account_id_sender },
        { $push: { transfers_complete: transfer.transfer_id } },
        { session }
      );
      console.log(
        `${updateSenderTransferResults.matchedCount} document(s) matched in the transfers collection, updated ${updateSenderTransferResults.modifiedCount} document(s) for the sender account.`
      );
      // Step 5: Update the transfers_complete field for the receiver account
      const updateReceiverTransferResults = await accounts.updateOne(
        { account_id: account_id_receiver },
        { $push: { transfers_complete: transfer.transfer_id } },
        { session }
      );
      console.log(
        `${updateReceiverTransferResults.matchedCount} document(s) matched in the transfers collection, updated ${updateReceiverTransferResults.modifiedCount} document(s) for the receiver account.`
      );
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
