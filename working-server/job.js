// This script is a worker server that publishes messages (trigger:update) to a Redis channel every 15 minutes.

const cron = require('node-cron');
const { createClient } = require('redis');

const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

async function start() {
  await redisClient.connect();

  console.log('Worker server started. Publishing every 15 minutes...');

  // Publish every 15 minutes
  cron.schedule('*/15 * * * *', async () => {
    try {
      const message = JSON.stringify({ trigger: 'update' });
      await redisClient.publish('crypto-update', message);
      console.log(`[${new Date().toISOString()}] Published message:`, message);
    } catch (err) {
      console.error('Error publishing message:', err);
    }
  });

}

process.on('SIGINT', async () => {
  console.log('Shutting down worker...');
  await redisClient.quit();
  process.exit(0);
});

start().catch(console.error);
