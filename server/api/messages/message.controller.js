const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const from = process.env.TWILIO_FROM_PHONE_NUMBER;
const moment = require('moment');
const { insertMessageDB, pullMessagesDB } = require('../../services/dbServices');
const client = require('twilio')(accountSid, authToken);

const getMessages = async (req, res) => {
    const messages = await pullMessagesDB();
    res.json(messages);
}

const insertMessage = async (req, res) => {
    console.log(accountSid);
    console.log(authToken);
    const { body, to } = req.body;
    try {
        const messageSendRes = await client.messages.create({ body, from, to })
        console.log(messageSendRes);
        const newMessage = {
            body,
            to,
            date_sent: moment().format("llll")
        }
        const newMessagesArray = await insertMessageDB(newMessage);
        console.log(newMessagesArray);
        res.json(newMessagesArray);
    } catch (error) {
        console.log(error)
         res.status(500).send(error);
    }
}


module.exports = {
    getMessages,
    insertMessage
};