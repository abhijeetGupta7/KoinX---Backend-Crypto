const { StatusCodes } = require('http-status-codes');
const StatsService = require('../services/stats.service');
const successResponse = require('../utils/common/success-response');
const errorResponse = require('../utils/common/error-response');

const statsService = new StatsService();

// Get latest crypto stats for a coin from query param `coin`
async function getLatestCryptoStats(req, res) {
  try {

    console.log('Get Latest Crypto Stats:', req.query);
    const { coin } = req.query

    if (!coin) {
      errorResponse.message = 'coin query parameter is required';
      return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }

    const latestStats = await statsService.getLatestStat(coin);

    if (!latestStats) {
      successResponse.message = `No data found for coin: ${coin}`;
      successResponse.data = null;
      return res.status(StatusCodes.NOT_FOUND).json(successResponse);
    }

    successResponse.message = 'Latest crypto stats fetched successfully';
    successResponse.data = {
      price: latestStats.price,
      marketCap: latestStats.marketCap,
      "24hChange": latestStats.change24h,
    };

    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    console.error('Get Stats Error:', error);
    errorResponse.message = 'Failed to fetch latest crypto stats';
    errorResponse.error = error.message || error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}

module.exports = {
  getLatestCryptoStats,
};
