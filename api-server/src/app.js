// This is the main application file for the Express server.

const express = require('express');
const apiRouter = require('./routes/apiRouter.routes');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.text());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/', apiRouter);

module.exports = app;