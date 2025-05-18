
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

---

## 🚀 Deployment Notes

This project is deployed on [Render](https://render.com) using their **Free Web Service** tier.

### 🔄 Background Worker with Cron
The `worker-server` uses `node-cron` to run scheduled jobs every **15 minutes**, publishing messages (`trigger: update`) to a Redis pub/sub channel named `crypto-update`.

### 🌐 Running as Web Service (Port Hack)
Render’s Free Web Services **require port binding**, which doesn't naturally suit background worker processes.  
To bypass this limitation, we’ve added a **minimal HTTP server** (`http.createServer(...)`) that keeps the service alive — a widely used workaround to simulate persistent workers on the free plan.

> 🛠 **Note**: This approach is safe and commonly practiced. It allows us to deploy the worker for free without needing Render’s paid "Background Worker" tier.

### 📡 Redis via Upstash
We use [**Upstash Redis**](https://upstash.com/) for Redis Pub/Sub communication between services.  
Upstash is a **serverless, cloud-hosted Redis** with:
- Global replication
- REST-based API (but we used native Redis client)
- No need to manage Redis manually

This improves scalability and reduces infrastructure complexity.

### ☁ Future Improvements (Production Scale)
For full-scale production readiness, we can deploy on platforms like **GCP**, **AWS**, or **Heroku (paid tier)** where:
- Redis and MongoDB can be provisioned as managed cloud services
- Dedicated background jobs can run without HTTP workarounds

---

✅ **API Server**: Deployed on Render  
✅ **Worker Server**: Deployed on Render Free Tier using port-hack workaround  
✅ **Redis**: Powered by [Upstash Redis](https://upstash.com)
