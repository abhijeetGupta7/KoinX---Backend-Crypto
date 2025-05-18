
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
