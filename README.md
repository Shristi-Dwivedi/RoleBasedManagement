# Scalable Task Manager API (MERN Stack)

A full-stack web application built using the MERN stack that provides authentication, role-based access control, and CRUD functionality for managing tasks.

---

## 🚀 Features

### Authentication
- User registration
- User login
- JWT-based authentication
- Password hashing using bcrypt

### Authorization
- Role-based access control (User / Admin)

### Task Management
- Create task
- Read tasks
- Update task status
- Delete task

### Security
- Protected routes using JWT
- Input validation
- Secure password storage

---

## 🛠 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT
- bcryptjs

### Frontend
- React.js
- Axios
- Context API

---

## 📁 Project Structure
backend/
frontend/

---

## ⚙️ Setup Instructions

### 1. Clone Repository
```bash
git clone <your-repo-url>
cd InternshipAssignment

2. Backend Setup
cd backend
npm install

Create .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Run backend:

npm run dev

3. Frontend Setup
cd frontend
npm install
npm run dev
```
📡 API Endpoints

Auth Routes
POST /api/v1/auth/register
POST /api/v1/auth/login
Task Routes
POST /api/v1/tasks
GET /api/v1/tasks
PUT /api/v1/tasks/:id
DELETE /api/v1/tasks/:id

🔐 Authentication Flow

User registers or logs in
Server returns JWT token
Token stored in localStorage
Token sent in Authorization header for protected routes

📊 Scalability Notes

Modular architecture (controllers, routes, middleware)
Stateless JWT authentication
Easy to extend into microservices
Can integrate Redis caching for performance improvement
Docker-ready structure
