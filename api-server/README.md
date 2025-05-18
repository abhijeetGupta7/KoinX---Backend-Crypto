# Crypto Stats API Server

A **production-grade Node.js API server** for real-time cryptocurrency statistics and analytics. It fetches, processes, and serves up-to-date price, market cap, and volatility data for major cryptocurrencies like **Bitcoin**, **Ethereum**, and **Matic**.

---

## Table of Contents

* [Project Overview](#project-overview)
* [Features](#features)
* [Architecture](#architecture)
* [Tech Stack](#tech-stack)
* [Folder Structure](#folder-structure)
* [Setup Instructions](#setup-instructions)
* [Environment Variables](#environment-variables)
* [Running the Server](#running-the-server)
* [API Documentation](#api-documentation)
* [Background Jobs & Pub/Sub](#background-jobs--pubsub)
* [Error Handling](#error-handling)
* [Testing](#testing)
* [Best Practices & Code Quality](#best-practices--code-quality)

---

## Project Overview

This backend service is designed to provide real-time crypto data analytics through REST APIs. It periodically pulls data from **CoinGecko**, computes useful statistics (like standard deviation), and serves the information through a modular, scalable, and production-ready architecture.

---

## Features

* ✅ RESTful API to fetch latest crypto stats
* 🕒 Background job running every 15 minutes to update data
* 🧠 Standard deviation analytics
* 💾 MongoDB for historical time-series data
* 🚦 Redis Pub/Sub for triggering async updates
* 🧪 Robust input validation & centralized error handling
* 🧱 Clean separation of concerns (Controller, Service, Repository)
* 🧰 Secure and environment-configurable

---

## Architecture

* **Express.js** — for routing and HTTP server
* **MongoDB with Mongoose** — persistent time-series data storage
* **Redis (Pub/Sub)** — background job and event communication
* **Node-cron** — worker scheduler for periodic jobs
* **Axios** — for CoinGecko API calls
* **Service Layer** — business logic
* **Repository Layer** — data access layer
* **Validation Middleware** — request sanitization

---

## Tech Stack

| Category    | Technology         |
| ----------- | ------------------ |
| Language    | Node.js (v14+)     |
| Framework   | Express.js (v5+)   |
| Database    | MongoDB + Mongoose |
| Pub/Sub     | Redis              |
| Scheduler   | node-cron          |
| HTTP Client | Axios              |
| Validation  | express-validator  |
| Environment | dotenv             |
| Dev Tools   | nodemon            |

---

## Folder Structure

```
api-server/
  src/
    app.js
    index.js
    config/
      db-config.js
      server-config.js
    controllers/
      deviation.controller.js
      stats.controller.js
    middlewares/
      validate.js
    models/
      cryptoStats.model.js
    repositories/
      cryptoStats.repository.js
    routes/
      apiRouter.routes.js
      v1/
        deviationRouter.js
        statsRouter.js
        v1Router.js
    services/
      deviation.service.js
      stats.service.js
    subscribers/
      trigger.subscriber.js
    utils/
      common/
        error-response.js
        success-response.js
working-server/
  job.js
.env
package.json
README.md
```

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd api-server
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/crypto_stats_db
REDIS_URL=redis://localhost:6379
COINGECKO_API_KEY=<your-coingecko-api-key>
```

> Replace `<your-coingecko-api-key>` with your actual CoinGecko API key.

### 4. Start MongoDB and Redis

Ensure MongoDB and Redis servers are running locally or update connection URIs accordingly.

### 5. Start the API server

```bash
npm start
```

### 6. Start the worker server

Open a second terminal:

```bash
cd ../working-server
node job.js
```

---

## Environment Variables

| Variable            | Description                       | Example                                     |
| ------------------- | --------------------------------- | ------------------------------------------- |
| `PORT`              | Port on which the API server runs | `4000`                                      |
| `MONGO_URI`         | MongoDB connection URI            | `mongodb://localhost:27017/crypto_stats_db` |
| `REDIS_URL`         | Redis connection URI              | `redis://localhost:6379`                    |
| `COINGECKO_API_KEY` | CoinGecko API key                 | `CG-xxxxxxxx`                               |

---

## Running the Server

### API Server

```bash
npm start
```

Runs at: `http://localhost:4000` (or your configured `PORT`)

### Worker Server

```bash
cd ../working-server
node job.js
```

Triggers data update events every 15 minutes via Redis.

---

## API Documentation

### 1. Get Latest Crypto Stats

**Endpoint:**

```
GET /api/v1/stats?coin=<coinId>
```

**Query Parameters:**

* `coin` (required): `bitcoin`, `ethereum`, or `matic-network`

**Sample Response:**

```json
{
  "success": true,
  "data": {
    "price": 12345.67,
    "marketCap": 1234567890,
    "24hChange": 2.34
  },
  "message": "Latest crypto stats fetched successfully"
}
```

---

### 2. Get Standard Deviation of Price

**Endpoint:**

```
GET /api/v1/deviation?coin=<coinId>
```

**Query Parameters:**

* `coin` (required): `bitcoin`, `ethereum`, or `matic-network`

**Sample Response:**

```json
{
  "success": true,
  "data": {
    "deviation": 123.45
  },
  "message": "Standard deviation calculated successfully"
}
```

---

### 3. Error Responses

**Structure:**

```json
{
  "success": false,
  "error": "Error message",
  "data": {},
  "message": "Description of the error"
}
```

---

## Background Jobs & Pub/Sub

* A background **worker server** (`working-server/job.js`) runs every 15 minutes using `node-cron`.
* It **publishes a message** to Redis channel `crypto-update`.
* The **API server subscribes** to this channel and:

  * Fetches latest stats from CoinGecko
  * Stores them in MongoDB
* This **decoupled** model allows for scalability and independent service execution.

---

## Error Handling

* ✅ Centralized error handler for consistency
* ✅ Validation errors → HTTP `400`
* ✅ Server/database errors → HTTP `500`
* ✅ Logging for debugging
* ✅ No stack traces or sensitive info exposed in responses

---

## Testing

You can test endpoints using tools like:

### Postman or curl:

```bash
curl "http://localhost:4000/api/v1/stats?coin=bitcoin"
curl "http://localhost:4000/api/v1/deviation?coin=ethereum"
```

---

## Best Practices & Code Quality

* 📦 Modular & layered architecture
* ✅ Consistent use of `async/await`
* 🔐 All secrets in `.env` (never hardcoded)
* 🧹 Input validation via `express-validator`
* 💡 Clear API documentation and folder structure
* 🚀 Scalable design, easy to add new analytics or coins
* 📈 MongoDB indexing for performance
* 🧱 Clean code separation: controller → service → repository

---

