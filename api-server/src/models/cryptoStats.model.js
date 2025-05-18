const mongoose = require('mongoose');

const cryptoStatsSchema = new mongoose.Schema({
  coinId: {
    type: String,
    required: true,
    enum: ['bitcoin', 'ethereum', 'matic-network'], // restrict to supported coins
    index: true,
  },
  price: {
    type: Number,
    required: true,
  },
  marketCap: {
    type: Number,
    required: true,
  },
  change24h: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true,
  }
}, {
  versionKey: false,
  collection: 'crypto_stats',
});

// Compound index to optimize fetching latest stats by coin
cryptoStatsSchema.index({ coinId: 1, timestamp: -1 });

const CryptoStats = mongoose.model('CryptoStats', cryptoStatsSchema);

module.exports = CryptoStats;
