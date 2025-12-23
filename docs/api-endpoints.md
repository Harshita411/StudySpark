# API Endpoints Documentation

**Base URL:** `/api`

---

### File Upload

-   **Endpoint:** `POST /files/upload`
-   **Description:** Uploads a file (.txt, .pdf) for processing.
-   **Request Type:** `multipart/form-data`
-   **Form Field:** `file` (the file to upload)
-   **Success Response (200 OK):**
    ```json
    {
      "content": "The extracted text content of the file..."
    }
    ```
-   **Error Response (500 Internal Server Error):**
    ```json
    {
      "message": "Could not upload the file: [error message]"
    }
    ```

---

### Summaries

-   **Endpoint:** `POST /summaries`
-   **Description:** Generates a summary for the given text.
-   **Request Body:**
    ```json
    {
      "text": "The full text content from the notes..."
    }
    ```
-   **Success Response (200 OK):**
    -   **Content-Type:** `text/plain`
    -   **Body:** `This is the generated summary of the text.`

---

### Quizzes

-   **Endpoint:** `POST /quizzes`
-   **Description:** Generates a list of quiz questions from the given text.
-   **Request Body:**
    ```json
    {
      "text": "The full text content from the notes..."
    }
    ```
-   **Success Response (200 OK):**
    ```json
    [
      {
        "question": "What is the capital of France?",
        "options": ["London", "Berlin", "Paris", "Madrid"],
        "correctAnswerIndex": 2
      }
    ]
    ```

---

### Flashcards

-   **Endpoint:** `POST /flashcards`
-   **Description:** Generates a list of flashcards from the given text.
-   **Request Body:**
    ```json
    {
      "text": "The full text content from the notes..."
    }
    ```
-   **Success Response (200 OK):**
    ```json
    [
      {
        "id": null,
        "term": "Mitochondria",
        "definition": "The powerhouse of the cell.",
        "noteId": "mockNoteId"
      }
    ]
    ```