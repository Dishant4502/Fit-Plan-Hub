FitPlanHub – Trainers & Users Fitness Platform

Project Overview
FitPlanHub is a full-stack backend‑focused project built using **Node.js, Express, MongoDB, and JWT authentication**. The system allows **certified trainers** to create paid fitness plans and **users** to subscribe to those plans, follow trainers, and view a personalized feed.

This project was developed to demonstrate **backend logic, database relationships, authentication, and CRUD operations** in a real‑world use case.

---

Objective of the Project
The goal of FitPlanHub is to design and implement a secure backend system where:

* Trainers manage fitness plans
* Users purchase and access those plans
* Access is controlled based on roles and subscriptions

---

Database Design (MongoDB)

The database is designed using **Mongoose schemas** with proper relationships.

1⃣ User Schema
Represents both users and trainers.

**Key Fields:**

* name
* email (unique)
* password (hashed)
* role (user / trainer)
* following (list of trainers followed by user)

**Relationship:**

* One user can follow many trainers (many‑to‑many)

---

2⃣ Plan Schema
Represents fitness plans created by trainers.

**Key Fields:**

* title
* description
* price
* duration
* trainer (reference to User)

**Relationship:**

* One trainer → many plans (one‑to‑many)

---

3⃣ Subscription Schema
Represents user subscriptions to fitness plans.

**Key Fields:**

* user (reference to User)
* plan (reference to Plan)

**Relationship:**

* Many users ↔ many plans (many‑to‑many)

---

API Design

Authentication APIs

| Method | Endpoint         | Description              |
| ------ | ---------------- | ------------------------ |
| POST   | /api/auth/signup | Register user or trainer |
| POST   | /api/auth/login  | Login and receive JWT    |

---

Fitness Plan APIs

| Method | Endpoint       | Description                |
| ------ | -------------- | -------------------------- |
| GET    | /api/plans     | View all plans (preview)   |
| POST   | /api/plans     | Create plan (trainer only) |
| GET    | /api/plans/:id | View plan (preview/full)   |
| PUT    | /api/plans/:id | Edit own plan              |
| DELETE | /api/plans/:id | Delete own plan            |

---

Subscription APIs

| Method | Endpoint               | Description         |
| ------ | ---------------------- | ------------------- |
| POST   | /api/subscribe/:planId | Subscribe to a plan |

---

Follow & Feed APIs

| Method | Endpoint               | Description            |
| ------ | ---------------------- | ---------------------- |
| POST   | /api/follow/:trainerId | Follow trainer         |
| GET    | /api/feed              | Personalized user feed |

---

Authentication & Authorization

* Passwords are hashed using **bcrypt**
* Authentication handled using **JWT tokens**
* Role‑based access:

  * Trainers → create/edit/delete plans
  * Users → subscribe & follow trainers

---

CRUD Operations

| Entity       | Operations                   |
| ------------ | ---------------------------- |
| User         | Create, Read                 |
| Trainer      | Create, Read                 |
| Plan         | Create, Read, Update, Delete |
| Subscription | Create, Read                 |

Postman Collection

* All APIs were tested using **Postman**
* Collection can be added to GitHub for easy evaluation
* Includes authentication, plan management, subscriptions, and feed APIs

Project Structure

FitPlanHub/
 ├── backend/
 │    ├── models/
 │    ├── routes/
 │    ├── middleware/
 │    ├── server.js
 │    └── .env
 │
 ├── frontend/
 │    └── (React client)
 │
 └── README.md

How to Run the Project

Backend Setup

cd backend
npm install
node server.js

Environment Variables (.env)

env
MONGO_URI=mongodb://127.0.0.1:27017/fitplanhub
JWT_SECRET=your_secret_key
PORT=5000

Backend runs on:

http://localhost:5000

Frontend Setup

cd frontend
npm install
npm start

Frontend runs on:

http://localhost:3000

What This Project Demonstrates

Backend business logic
MongoDB schema design & relationships
JWT authentication
Role‑based authorization
Secure CRUD operations
Clean code structure


Conclusion
FitPlanHub is a complete backend‑driven project that clearly demonstrates **real‑world API design, database modeling, authentication, and access control**. It fulfills all the required evaluation criteria and can be extended further with UI enhancements or real payment integration.


