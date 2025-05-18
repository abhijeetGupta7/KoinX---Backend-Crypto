
# 🚀 Crypto Stats Platform (Monorepo)

**Crypto Stats Platform** is a real-time cryptocurrency statistics service built using a **scalable**, **modular**, and **event-driven microservice architecture**. It fetches live crypto data from CoinGecko and serves it through a RESTful API.

---

## 🧠 Use Case

This platform is ideal for powering:

* Cryptocurrency dashboards
* Portfolio trackers
* Live analytics and reporting tools
* Backend data services for crypto applications

---

## 🏗 Architecture Overview

The system is built around two microservices connected via **Redis Pub/Sub**, enabling decoupled and real-time data handling.

```
+----------------+       Publishes via Redis       +----------------+
|  Worker Server | ───────────────────────────────▶|   API Server   |
| (Cron Trigger) |                                | (Subscriber)   |
+----------------+                                +----------------+
       |                                                  |
  [node-cron]                                  [Serves REST API]
```

---

## 📦 Repositories

| Directory                          | Description                                        |
| ---------------------------------- | -------------------------------------------------- |
| [`api-server`](./api-server)       | Main Node.js backend API using Express and MongoDB |
| [`worker-server`](./worker-server) | Lightweight Node.js cron job that triggers updates |

---

## 🔍 Features

* ⏱ **Periodic Crypto Updates** using `node-cron`
* 🔁 **Decoupled Services** via Redis Pub/Sub
* 🛠 **Microservice-Friendly** modular codebase
* 📊 **MongoDB** for persistent storage of crypto data
* 🌐 **RESTful APIs** to fetch real-time prices
* 🔌 **Pluggable Architecture**—easy to add new services
* 📡 **CoinGecko API** for reliable crypto data source

---

## 🛠 Tech Stack

* **Node.js**
* **Express**
* **MongoDB**
* **Redis (Pub/Sub)**
* **node-cron**
* **CoinGecko API**

---

## 🚀 Getting Started (Monorepo)

```bash
# Clone the repository
git clone <your-repo-url>
cd <repo>

# Install dependencies for both services
cd api-server 
npm install  
cd ../worker-server 
npm install
```

---

### ✅ Start Services

1. **Start MongoDB & Redis**
   (Ensure both are running locally or through Docker)

2. **Run the API Server**

```bash
cd api-server
npm start
```

3. **Run the Worker Server**

```bash
cd ../worker-server
node job.js
```

---

## 📄 Individual Service Docs

Refer to each service’s README for specific instructions and configurations:

* [`api-server/README.md`](./api-server/README.md)
* [`worker-server/README.md`](./worker-server/README.md)

---

## 🧪 Project Quality Highlights

* 🧱 **Modular Monorepo**: Clear separation of responsibilities
* 🔁 **Scalable & Event-Driven**: Loosely coupled with Redis Pub/Sub
* 🧪 **Easily Testable & Deployable**: Services can run independently
* 🛡 **Best Practices**: Uses clean coding patterns and stable tech stack

---

# 🚀 Deployment Notes

This project is deployed on [Render](https://render.com) using their **Free Web Service** tier.

---

### 🌐 Public API Base URL

All API endpoints are accessible under the base URL:

```
https://koinx-backend-crypto.onrender.com/api/v1
```

### 🔹 Available Endpoints

* **Stats:**
  `/stats?coin={coin_id}`
  Fetches statistics for the specified cryptocurrency.

  **Example:**
  [https://koinx-backend-crypto.onrender.com/api/v1/stats?coin=bitcoin](https://koinx-backend-crypto.onrender.com/api/v1/stats?coin=bitcoin)

* **Deviation:**
  `/deviation?coin={coin_id}`
  Fetches deviation data for the specified cryptocurrency.

  **Example:**
  [https://koinx-backend-crypto.onrender.com/api/v1/deviation?coin=ethereum](https://koinx-backend-crypto.onrender.com/api/v1/deviation?coin=ethereum)

### 🔸 Supported Coins

Currently, the API supports these coins:

* `bitcoin`
* `ethereum`
* `dogecoin`

> Replace `{coin_id}` with any of the above coin names in the query parameter to get data.

---

### 🔄 Worker-server as Background Worker with Cron

The `worker-server` runs scheduled jobs every **15 minutes** using `node-cron`. It publishes messages (`trigger: update`) to a Redis pub/sub channel named `crypto-update`.

Since Render's Free Web Service requires an open port for deployment, a **minimal HTTP server** is added to keep the worker alive — a commonly used workaround often referred to as the “port hack.”

> **Note:** This is a safe and effective practice for running background jobs on free tiers without dedicated worker support.

---

### 📡 Redis via Upstash

We use [**Upstash Redis**](https://upstash.com/) for Redis Pub/Sub communication between services.  
Upstash is a **serverless, cloud-hosted Redis** provider offering:

- Global replication  
- REST-based API and native Redis client  
- No infrastructure management required  

This setup improves scalability, reliability, and reduces operational overhead.

---

### ☁ Future Improvements (Production Scale)

For production-grade deployments, consider moving to platforms such as **GCP**, **AWS**, or **Heroku (paid tier)** where:

- Managed Redis and MongoDB services are available  
- Background workers can run without HTTP port workarounds  
- More robust scaling and monitoring features are supported  

---

### ✅ Summary of Deployment

| Component      | Deployment Platform       | Notes                                  |
| -------------- | ------------------------ | ------------------------------------ |
| API Server     | Render Free Web Service  | Public API accessible over HTTPS     |
| Worker Server  | Render Free Web Service  | Runs background jobs with port hack  |
| Redis          | Upstash                  | Serverless Redis with Pub/Sub support|

---

