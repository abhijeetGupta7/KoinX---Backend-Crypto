const redis = require('redis');
const StatsService = require('../services/stats.service'); 
async function startSubscriber() {
  const subscriber = redis.createClient();
  await subscriber.connect();

  const statsService = new StatsService();

  subscriber.on('error', (err) => {
    console.error('Redis Subscriber Error', err);
  });

  await subscriber.subscribe('crypto-update', async (message) => {
    try {
      const event = JSON.parse(message);
      console.log('Received message:', event);
      if (event.trigger === 'update') {
        console.log('Received update event from Redis, triggering storeCryptoStats...');
        await statsService.storeCryptoStats();
        console.log('storeCryptoStats completed successfully');
      }
    } catch (error) {
      console.error('Error processing update event:', error);
    }
  });

  console.log('API Server subscribed to crypto:update channel');
}

module.exports = { startSubscriber };
