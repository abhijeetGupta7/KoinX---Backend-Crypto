// This is the main application file for the Express server.

const express = require('express');
const apiRouter = require('./routes/apiRouter.routes');
const CryptoStatsService = require('./services/stats.service');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.text());

const a=new CryptoStatsService();
// a.storeCryptoStats();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/', apiRouter);

module.exports = app;