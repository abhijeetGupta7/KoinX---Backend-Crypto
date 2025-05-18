// This script is a worker server that publishes messages (trigger:update) to a Redis channel every 15 minutes.
require('dotenv').config({ path: '../.env' });
const cron = require('node-cron');
const { createClient } = require('redis');
const http = require('http');

const PORT = process.env.PORT // Dummy HTTP server port

const redisClient = createClient({
  url: process.env.REDIS_URL
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

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down worker...');
  await redisClient.quit();
  process.exit(0);
});

// Dummy HTTP server to keep Render Web Service alive
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Worker server running.\n');
}).listen(PORT, () => {
  console.log(`Dummy HTTP server listening on port ${PORT}`);
});

start().catch(console.error);
