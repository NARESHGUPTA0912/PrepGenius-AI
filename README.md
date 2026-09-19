# 🚀 PrepGenius AI

**PrepGenius AI** is an AI-powered interview preparation platform designed to help students and job seekers prepare for technical interviews through personalized practice, AI-generated questions, interview sessions, and performance tracking.

The project uses **React** for the frontend and **Java Spring Boot** for the backend, with **MongoDB** for data storage and **Google Gemini AI** for intelligent question generation.

---

## ✨ Features

* 🔐 **User Authentication**

  * User registration and login
  * JWT-based authentication
  * BCrypt password encryption
  * Secure API endpoints using Spring Security

* 🤖 **AI-Powered Interview Questions**

  * Generate interview questions using Google Gemini AI
  * Questions based on selected technologies and topics
  * Supports technical interview preparation

* 📝 **Interview Preparation**

  * Practice technical interview questions
  * Create interview preparation sessions
  * Track questions and answers

* 📊 **Session Management**

  * Create and manage interview sessions
  * Store interview questions and responses
  * Track preparation progress

* 👤 **User Profile**

  * Secure user-specific data
  * Retrieve authenticated user information

* 🌐 **RESTful API**

  * Backend APIs built using Spring Boot
  * JSON-based request and response handling

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Tailwind CSS
* JavaScript
* HTML5
* CSS3
* Axios
* React Router
* React Hot Toast

### Backend

* Java 25
* Spring Boot 4
* Spring Security
* Spring Data MongoDB
* REST API
* JWT
* BCrypt
* Lombok
* Maven

### Database

* MongoDB
* MongoDB Atlas / Local MongoDB

### AI

* Google Gemini API

### Development Tools

* STS (Spring Tools Suite)
* VS Code
* Postman
* MongoDB Compass / MongoDB Atlas
* Git & GitHub

---

## 🏗️ Project Architecture

```text
                    ┌──────────────────────┐
                    │      React.js        │
                    │      Frontend        │
                    └──────────┬───────────┘
                               │
                               │ REST API
                               ▼
                    ┌──────────────────────┐
                    │     Spring Boot      │
                    │       Backend        │
                    └──────────┬───────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
       ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
       │   MongoDB   │  │ JWT/Security│  │ Gemini API  │
       │   Database  │  │             │  │     AI      │
       └─────────────┘  └─────────────┘  └─────────────┘
```

---

## 📂 Project Structure

### Backend

```text
backend/
├── src/
│   └── main/
│       ├── java/
│       │   └── com/
│       │       └── prepgeniusai/
│       │           ├── config/
│       │           ├── controller/
│       │           ├── dto/
│       │           ├── model/
│       │           ├── repository/
│       │           ├── security/
│       │           ├── service/
│       │           └── BackendApplication.java
│       │
│       └── resources/
│           └── application.properties
│
├── pom.xml
└── README.md
```

### Frontend

```text
frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── App.jsx
│   └── main.jsx
│
├── public/
├── package.json
└── README.md
```

---

## 🔐 Authentication Flow

PrepGenius AI uses **JWT-based authentication**.

```text
User
 │
 ▼
Register / Login
 │
 ▼
Spring Security
 │
 ▼
Validate Credentials
 │
 ▼
Generate JWT
 │
 ▼
Frontend Stores Token
 │
 ▼
Token Sent with API Requests
 │
 ▼
JWT Validation
 │
 ▼
Protected API Access
```

Passwords are securely hashed using **BCrypt** before being stored in MongoDB.

---

## 🤖 AI Question Generation

The application integrates the **Google Gemini API** to generate interview questions dynamically.

Example flow:

```text
User selects:
Java + Spring Boot + MongoDB
              │
              ▼
        Backend API
              │
              ▼
        Gemini AI API
              │
              ▼
     Generated Questions
              │
              ▼
           MongoDB
              │
              ▼
           Frontend
```

---

## ⚙️ Environment Variables

Create an environment configuration for sensitive information.

Example:

```env
MONGODB_URI=mongodb://localhost:27017/prepgenius
JWT_SECRET=your-secret-key
GEMINI_API_KEY=your-gemini-api-key
```

> ⚠️ Never commit API keys, JWT secrets, passwords, or other sensitive credentials to GitHub.

Add sensitive configuration files to `.gitignore`.

Example:

```gitignore
.env
application-local.properties
target/
node_modules/
```

---

## 🚀 How to Run the Project

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/prepgenius-ai.git
```

```bash
cd prepgenius-ai
```

---

### 2. Start MongoDB

Make sure MongoDB is running locally or configure MongoDB Atlas.

Example local connection:

```text
mongodb://localhost:27017
```

---

### 3. Run the Backend

Navigate to the backend directory:

```bash
cd backend
```

Run using Maven:

```bash
mvn spring-boot:run
```

The backend will start on:

```text
http://localhost:8082
```

---

### 4. Run the Frontend

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm run dev
```

The frontend will be available at the URL displayed by Vite.

---

## 🧪 API Testing

The backend REST APIs can be tested using **Postman**.

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

### Interview / AI

```text
POST /api/ai/...
POST /api/sessions/...
GET  /api/sessions/...
```

> API endpoints may change as the project continues to evolve.

---

## 🔒 Security

The project implements:

* JWT authentication
* Spring Security
* BCrypt password hashing
* Protected REST endpoints
* User-specific data access
* Environment-based secret configuration

---

## ⚙️ CI/CD

This project uses GitHub Actions for continuous integration.

The backend is automatically built using:

- Java 25
- Maven
- Spring Boot

Every push and pull request to the `main` branch triggers the Maven build workflow.

---

## 📌 Future Improvements

* 🎤 AI voice-based mock interviews
* 🗣️ Speech-to-text interview interaction
* 📈 Advanced performance analytics
* 🎯 Personalized preparation roadmap
* 📄 Resume-based interview questions
* 💻 Coding interview support
* 🏆 Leaderboards and achievements
* 🌍 Deployment with CI/CD
* 📱 Responsive mobile UI

---

## 📸 Screenshots

Add screenshots of the application here.

Example:

```text
docs/
├── landing-page.png
├── login.png
├── dashboard.png
├── interview-prep.png
└── interview-session.png
```

Then add them to the README:

```markdown
![Landing Page](docs/landing-page.png)
![Dashboard](docs/dashboard.png)
![Interview Preparation](docs/interview-prep.png)
```

---

## 🎯 Learning Objectives

This project was developed to gain practical experience with:

* Java
* Spring Boot
* Spring Security
* JWT Authentication
* REST API Development
* MongoDB
* React.js
* AI API Integration
* Full-Stack Development
* Git & GitHub
* API Testing with Postman

---

## 👨‍💻 Author

**Naresh Gupta**

MCA | Java Full Stack Developer

### Technologies

```text
Java • Spring Boot • Spring Security • MongoDB
React • JavaScript • REST API • JWT • AI
```

---

## ⭐ Support

If you find this project useful, consider giving it a ⭐ on GitHub.

---

## 📄 License

This project is developed for educational and portfolio purposes.
