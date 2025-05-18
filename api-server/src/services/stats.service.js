const CryptoStatsRepository = require("../repositories/stats.repository");
const axios = require("axios");

class CryptoStatsService {
    #cryptoStatsRepository;

    constructor() {
        this.#cryptoStatsRepository = new CryptoStatsRepository();
    }

    async storeCryptoStats() {
        try {
            const url = "https://api.coingecko.com/api/v3/simple/price";

            const response = await axios.get(url, {
                headers: {
                    accept: "application/json",
                    "x-cg-demo-api-key": process.env.COINGECKO_API_KEY,  
                },
                params: {
                    ids: "bitcoin,ethereum,matic-network",
                    vs_currencies: "usd",
                    include_market_cap: true,
                    include_24hr_change: true,
                },
            });

            const data = response.data;

            // Format data into DB model shape
            const formattedStats = Object.entries(data).map(([coin, values]) => ({
                coinId: coin,                   // Use `coinId` to match schema field
                price: values.usd,
                marketCap: values.usd_market_cap,
                change24h: values.usd_24h_change,
                timestamp: new Date(),
            }));

            // Store each stat in DB
            for (const stat of formattedStats) {
                await this.#cryptoStatsRepository.create(stat);
            }

            console.log("Formatted Stats:", formattedStats);

            return { message: "Stats stored successfully." };
        } catch (error) {
            console.error("Error in storeCryptoStats:", error.message);
            throw error;
        }
    }

    async getLatestStat(coin) {
        try {
            return await this.#cryptoStatsRepository.getLatestByCoin(coin);
        } catch (error) {
            console.error("Error in getLatestStat:", error.message);
            throw error;
        }
    }
}



module.exports = CryptoStatsService;
