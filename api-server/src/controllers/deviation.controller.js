const { StatusCodes } = require('http-status-codes');
const successResponse = require('../utils/common/success-response');
const errorResponse = require('../utils/common/error-response');
const DeviationService = require('../services/deviation.service');

const deviationService = new DeviationService();

// Get standard deviation of price from last 100 records for a coin
async function getStandardDeviation(req, res) {
  try {
    console.log('Get Deviation Stats:', req.query);
    const { coin } = req.query;

    if (!coin) {
      errorResponse.message = 'coin query parameter is required';
      return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }

    const deviation = await deviationService.getStandardDeviationForCoin(coin);

    if (deviation === null) {
      successResponse.message = `Not enough data to calculate deviation for coin: ${coin}`;
      successResponse.data = { deviation: null };
      return res.status(StatusCodes.NOT_FOUND).json(successResponse);
    }

    successResponse.message = 'Standard deviation calculated successfully';
    successResponse.data = { deviation };
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    console.error('Deviation Error:', error);
    errorResponse.message = 'Failed to calculate standard deviation';
    errorResponse.error = error.message || error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}

module.exports = {
  getStandardDeviation,
};
