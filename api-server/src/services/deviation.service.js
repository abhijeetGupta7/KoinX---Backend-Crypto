const CryptoStatsRepository = require("../repositories/cryptoStats.repository");

class DeviationService {
  #cryptoStatsRepository;

  constructor() {
    this.#cryptoStatsRepository = new CryptoStatsRepository();
  }

  async getStandardDeviationForCoin(coin) {
    try {
      const records = await this.#cryptoStatsRepository.getLatestRecordsByCoin(coin, 100);
      if (!records || records.length === 0) return null;

      const prices = records.map(r => r.price);
      const mean = prices.reduce((acc, val) => acc + val, 0) / prices.length;
      const variance = prices.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / prices.length;
      const stdDeviation = Math.sqrt(variance);

      return stdDeviation.toFixed(2); 
    } catch (error) {
      console.error("Error in getStandardDeviationForCoin:", error.message);
      throw error;
    }
  }
}

module.exports = DeviationService;
