# AI Study Assistant

AI Study Assistant is a full-stack project built to help students study more efficiently using AI. Users can upload their notes as PDFs or text, and the system generates summaries, quizzes, and flashcards automatically.

This project is primarily built as a learning and portfolio project to explore full-stack development and LLM integration.

## Tech Stack

- Frontend: React, Vite
- Backend: Java, Spring Boot
- Database: MongoDB
- AI/NLP: Placeholder service for LLM integration (OpenAI, Gemini, etc.)

## Features

- Upload PDF files or paste text notes
- Generate concise summaries from notes
- Automatically create MCQ-based quizzes
- Flashcard mode for quick revision of key concepts

## Running the Application

### Start MongoDB

From the root directory:

```bash
docker-compose up -d
```

### Run Backend

```bash
cd backend
mvn spring-boot:run
```

Backend runs on:
http://localhost:8080

### Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:
http://localhost:5173

### Notes

- AI functionality currently uses a placeholder service
- Designed to be easily extended with real LLM APIs
- Built mainly for learning full-stack and AI concepts
