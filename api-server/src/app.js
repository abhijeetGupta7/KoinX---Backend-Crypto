// This is the main application file for the Express server.

const express = require('express');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.text());

app.get('/', (req, res) => {
  res.send('Hello World!');
});


module.exports = app;