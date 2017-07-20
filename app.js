const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http').createServer(app);
const index = require('./routes/index');
const db = require('./db/mongoDB');
const socket = require('./socket/socketServer')(http);

const CORS = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
};


app.use(CORS);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}) );


app.use('/api', index);


http.listen(8083, (err) => console.log("Connected at 8083"));

module.exports = http;