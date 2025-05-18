# Crypto Stats Worker Server

A **lightweight yet production-ready worker server** responsible for periodically triggering cryptocurrency data refreshes for the Crypto Stats platform. This Node.js service publishes update events to a Redis channel every 15 minutes, allowing the API server to fetch the latest stats on demand—ensuring real-time data delivery while maintaining a decoupled, scalable architecture.

---

## Table of Contents

* [Overview](#overview)
* [Features](#features)
* [Architecture](#architecture)
* [Tech Stack](#tech-stack)
* [Folder Structure](#folder-structure)
* [Getting Started](#getting-started)
* [Environment Variables](#environment-variables)
* [Usage](#usage)
* [How It Works](#how-it-works)
* [Code Quality](#code-quality)
* [Troubleshooting](#troubleshooting)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)

---

## Overview

The **worker-server** is a Node.js microservice that uses a cron job to publish update signals to a Redis channel (`crypto-update`). These messages act as triggers for the API server to fetch fresh data from third-party services like CoinGecko. This separation of concerns ensures high availability and simplifies maintenance.

---

## Features

* 🕒 **Scheduled Execution**: Sends update triggers every 15 minutes using `node-cron`.
* 📢 **Pub/Sub Messaging**: Uses Redis Pub/Sub to notify subscribers asynchronously.
* 🧩 **Microservice-Ready**: Operates independently from the API server.
* 🛠️ **Minimal & Efficient**: Single-file setup with zero overhead.
* 🚫 **Graceful Shutdown**: Handles process termination signals to close Redis connections cleanly.
* 📈 **Console Logging**: Logs each trigger for visibility and monitoring.

---

## Architecture

```text
┌────────────┐        publish        ┌──────────────┐
│ job.js (15m) ───────┬────────────▶ │ API Server   │
└────────────┘        │              │ (subscriber) │
                      ▼              └──────────────┘
                 Redis Pub/Sub Channel
                      (crypto-update)
```

---

## Tech Stack

| Purpose    | Package   |
| ---------- | --------- |
| Scheduling | node-cron |
| Messaging  | Redis     |
| Env Config | dotenv    |
| Logging    | Console   |
| Runtime    | Node.js   |

---

## Folder Structure

```bash
worker-server/
├── job.js          # Main worker file for publishing update triggers
```

---

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Create a `.env` file in the project root with:

```env
REDIS_URL=redis://localhost:6379
```

> Ensure the Redis server is running locally or update the URL accordingly.

---

## Environment Variables

| Variable    | Description             | Example                  |
| ----------- | ----------------------- | ------------------------ |
| `REDIS_URL` | Redis connection string | `redis://localhost:6379` |

---

## Usage

Run the worker manually:

```bash
npm start
```

You should see console logs indicating messages being published every 15 minutes.

---

## How It Works

* Uses `node-cron` to schedule a job every 15 minutes.
* The job publishes `{ trigger: "update" }` to the Redis channel `crypto-update`.
* The API server listens to this channel and, upon receiving the trigger, fetches new stats from external APIs like CoinGecko.

This approach keeps the API server stateless and avoids unnecessary polling or tight coupling between services.

---

## Troubleshooting

| Issue                       | Solution                                                        |
| --------------------------- | --------------------------------------------------------------- |
| Redis connection error      | Make sure Redis is running and `REDIS_URL` is correctly set     |
| Job not publishing messages | Check cron syntax and ensure the script is not exiting early    |
| No updates on API side      | Ensure the API server is subscribing to `crypto-update` channel |

---

