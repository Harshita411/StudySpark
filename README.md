# StudySpark – AI-Powered Study Assistant

StudySpark is a full-stack web application built to help students study more effectively using Large Language Models (LLMs). It allows users to upload their notes (PDFs or plain text) and automatically generates summaries, quizzes, and flashcards for faster and more structured revision.

This project focuses on clean architecture, real-world backend practices, and practical AI integration.

---

## Tech Stack

- **Frontend:** React, Vite
- **Backend:** Java, Spring Boot
- **Database:** MongoDB
- **AI / NLP:** Gemini API (can be extended to other LLMs)
- **Authentication:** JWT-based authentication
- **Containerization:** Docker (MongoDB)

---

## Features

- Upload PDF files or paste text notes
- AI-generated summaries for quick understanding
- Automatic MCQ quiz generation
- Flashcards for active recall
- Secure REST APIs protected using JWT
- Modular and extensible backend design

---

## Project Structure

StudySpark/
│
├── backend/ # Spring Boot backend
├── frontend/ # React + Vite frontend
├── docker-compose.yml
└── README.md

yaml
Copy code

---

## Running the Application Locally

### Prerequisites

- Java 17+
- Node.js 18+
- Docker & Docker Compose
- Maven

---

### 1. Start MongoDB

From the project root, start MongoDB using Docker:

```bash
docker-compose up -d
MongoDB will be available on:

arduino
Copy code
mongodb://localhost:27017
2. Run the Backend
Navigate to the backend directory and start the Spring Boot application:

bash
Copy code
cd backend
mvn spring-boot:run
Backend will be available at:

arduino
Copy code
http://localhost:8080
3. Run the Frontend
Navigate to the frontend directory and start the development server:

bash
Copy code
cd frontend
npm install
npm run dev
Frontend will be available at:

arduino
Copy code
http://localhost:5173
Configuration
Update the following in backend/src/main/resources/application.properties:

properties
Copy code
# Server
server.port=8080

# MongoDB
spring.data.mongodb.uri=mongodb://localhost:27017/studyAssistantDB

# JWT
jwt.secret=your_jwt_secret_key

# Gemini API
gemini.api.key=your_gemini_api_key
gemini.api.url=https://generativelanguage.googleapis.com

# File upload limits
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB
⚠️ Do NOT commit real API keys. Use environment variables or keep them local.

API Authentication Flow
Register / Login via /api/auth

Receive JWT token

Send token in request headers:

http
Copy code
Authorization: Bearer <your_token>
Access protected endpoints

AI Integration
StudySpark uses Gemini models to:

Generate summaries

Create quizzes

Extract key concepts for flashcards

Rate limits apply based on your API plan.

Notes
This project is intended for learning and experimentation.

LLM usage is modular and can be swapped with OpenAI or other providers.

Frontend and backend are loosely coupled via REST APIs.

```
