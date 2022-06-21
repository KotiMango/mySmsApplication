require('dotenv').config()
const messageRoutes = require('./api/messages/message.routes')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const http = require('http').Server(app);


app.use('/api/mysms', messageRoutes);
app.use(express.static('public'));
app.use(express.json());

app.get('/*', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

http.listen(process.env.PORT || 2556, () => {
  console.log('connected');
});

