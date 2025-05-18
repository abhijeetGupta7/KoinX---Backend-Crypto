const CryptoStats = require('../models/cryptoStats.model');

class CryptoStatsRepository {
 
    async create(data) {
        try {
            const cryptoStat = new CryptoStats(data);
            return await cryptoStat.save();
        } catch (error) {
            console.error('Error creating crypto stat:', error);
            throw error;
        }
    }

    async getLatestByCoin(coinId) {
        try {
            return await CryptoStats.findOne({ coinId })
                .sort({ timestamp: -1 })
                .lean()
                .exec();
            } catch (error) {
                console.error('Error fetching latest crypto stat:', error);
                throw error;
            }
        }
    }

module.exports = CryptoStatsRepository;
