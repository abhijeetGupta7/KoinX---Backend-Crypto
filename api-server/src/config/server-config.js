// This scrript is for returning environment variables for the api-server application.

module.exports={
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    COINGECKO_API_KEY: process.env.COINGECKO_API_KEY,
    REDIS_URL:process.env.REDIS_URL,
}