const { MongoClient } = require("mongodb");
const uri =
    `mongodb+srv://${process.env.MONGO_CREDS}.mtgal.mongodb.net/myFirstDatabase?retryWrites=true&writeConcern=majority`;
const client = new MongoClient(uri);


const getMessagesCollectionObject = async () => {
    await client.connect();
    const database = client.db('mysms');
    const messagesCollectionObj = database.collection('messages');
    return { messagesCollectionObj, client };
}


const pullMessagesDB = async () => {
    const { messagesCollectionObj, client } = await getMessagesCollectionObject();
    try {
        const parsedMessagesArray = await messagesCollectionObj.find().toArray();
        console.log(parsedMessagesArray);
        return parsedMessagesArray;
    } finally {
        await client.close();
    }
}

const insertMessageDB = async (messagePayloadObj) => {
    const { messagesCollectionObj, client } = await getMessagesCollectionObject();
    try {
        const messageInsertionRes = await messagesCollectionObj.insertOne(messagePayloadObj);
        console.log(messageInsertionRes);
        return messageInsertionRes;
    } finally {
        await client.close();
    }
}

module.exports = {
    pullMessagesDB,
    insertMessageDB
  };