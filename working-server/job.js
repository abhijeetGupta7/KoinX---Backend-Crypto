const cron = require('node-cron');
const { createClient } = require('redis');

const redisClient = createClient();

redisClient.on('error', (err) => console.error('Redis Client Error', err));

async function start() {
  await redisClient.connect();

  console.log('Worker server started. Publishing every 15 minutes...');

  // Schedule task to run every 15 minutes
  cron.schedule('*/15 * * * *', async () => {
    try {
      const message = JSON.stringify({ trigger: 'update' });
      await redisClient.publish('crypto-update', message);
      console.log('Published message:', message);
    } catch (err) {
      console.error('Error publishing message:', err);
    }
  });
}

start().catch(console.error);
