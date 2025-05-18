// This code defines an Express router for handling requests related to cryptocurrency price deviations.
const express = require('express');
const { query } = require('express-validator');
const deviationController = require('../../controllers/deviation.controller');
const validate = require('../../middlewares/validate');

const router = express.Router();

/**
 * @route   GET /api/v1/deviation
 * @desc    Get standard deviation of price for the last 100 records of a coin
 * @query   coinId (required): bitcoin | ethereum | matic-network
 * @returns { deviation: Number }
 */
router.get(
  '/',
  [
    query('coin')
      .notEmpty()
      .withMessage('coin (id) is required')
      .isIn(['bitcoin', 'ethereum', 'matic-network'])
      .withMessage('Invalid coin (id)'),
    validate,
  ],
  deviationController.getStandardDeviation
);

module.exports = router;