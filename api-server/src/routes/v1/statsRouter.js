// This code defines an Express router for handling requests related to cryptocurrency statistics.

const express = require('express');
const { query } = require('express-validator');
const validate = require('../../middlewares/validate');
const statsController = require('../../controllers/stats.controller');

const router = express.Router();

/**
 * @route   GET /api/v1/stats
 * @desc    Get the latest stats for a specific cryptocurrency
 * @query   coinId (required): bitcoin | ethereum | matic-network
 * @returns { price, marketCap, change24h }
 */
router.get(
  '/',
  [
    query('coinId')
      .notEmpty()
      .withMessage('coinId is required')
      .isIn(['bitcoin', 'ethereum', 'matic-network'])
      .withMessage('Invalid coinId'),
    validate,
  ],
  statsController.getLatestCryptoStats
);

module.exports = router;