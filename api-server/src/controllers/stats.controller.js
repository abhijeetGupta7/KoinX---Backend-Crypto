// Get latest crypto stats
async function getLatestCryptoStats(req, res) {
  res.status(501).json({
    error: 'Not Implemented',
    message: 'This endpoint is planned but not yet implemented'
  });
}

module.exports = {
  getLatestCryptoStats,
};
