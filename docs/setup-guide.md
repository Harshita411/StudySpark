# Project Setup Guide

Follow these steps to get the project running locally.

### Prerequisites

* **Java 17+**: [Adoptium Temurin](https://adoptium.net/)
* **Maven 3.8+**: [Maven Download Page](https://maven.apache.org/download.cgi)
* **Node.js 18+**: [Node.js Website](https://nodejs.org/)
* **Docker Desktop**: [Docker Website](https://www.docker.com/products/docker-desktop/)

### 1. Start the Database

The project uses MongoDB. The easiest way to run it is with Docker.

1.  Make sure Docker Desktop is running.
2.  Create a `docker-compose.yml` file in the project root:
    ```yaml
    version: '3.8'
    services:
      mongodb:
        image: mongo:latest
        container_name: mongodb
        ports:
          - "27017:27017"
        volumes:
          - mongo-data:/data/db
    volumes:
      mongo-data:
    ```
3.  Open a terminal in the project root and run:
    ```bash
    docker-compose up -d
    ```

### 2. Configure the Backend

1.  Navigate to `backend/src/main/resources/application.properties`.
2.  Ensure the MongoDB URI is correct: `spring.data.mongodb.uri=mongodb://localhost:27017/studyAssistantDB`
3.  Add your LLM API key if you are connecting to a real service.

### 3. Run the Backend

1.  Open a new terminal.
2.  Navigate to the `backend` directory: `cd backend`
3.  Run the application using Maven:
    ```bash
    mvn spring-boot:run
    ```
    The backend will be running on `http://localhost:8080`.

### 4. Run the Frontend

1.  Open a third terminal.
2.  Navigate to the `frontend` directory: `cd frontend`
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Start the development server:
    ```bash
    npm run dev
    ```
    The frontend will be running on `http://localhost:5173`. Open this URL in your browser.