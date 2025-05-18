const express = require('express');
const statsRouter = require('./statsRouter');
const deviationRouter = require('./deviationRouter');

const v1Router = express.Router();

v1Router.use('/stats', statsRouter);
v1Router.use('/deviation', deviationRouter);

module.exports = v1Router;
