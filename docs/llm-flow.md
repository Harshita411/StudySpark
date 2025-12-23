# LLM Interaction Flow

This document outlines the sequence of events when a user requests a study aid.

1.  **User Action**: The user uploads a file or pastes text into the frontend and clicks "Generate".
2.  **Frontend**:
    * The React application captures the text content.
    * It makes an asynchronous API call (e.g., using `axios`) to the backend. The request body contains the raw text.
    * Three parallel API calls are made: `/api/summaries`, `/api/quizzes`, and `/api/flashcards`.
3.  **Backend (Spring Boot)**:
    * The corresponding `Controller` (`SummaryController`, `QuizController`, etc.) receives the request.
    * The controller calls its associated `Service` (e.g., `QuizGenerationService`).
    * The service's primary job is to call the `LLMService`.
4.  **LLM Service (`LLMService.java`)**:
    * **Prompt Engineering**: This is the core step. The service constructs a specific prompt tailored to the task.
        * **For Summary**: "Summarize the following text in three key bullet points: [user's text]"
        * **For Quiz**: "Generate 5 multiple-choice questions based on the following text. Provide the question, four options, and the index of the correct answer. Format the output as a JSON array: [user's text]"
    * **API Call**: The service makes an HTTP request to the actual LLM API endpoint (e.g., Gemini API).
    * **Response Parsing**: The service receives the raw response from the LLM (which could be a JSON string or plain text). It parses this response into the required Java objects (e.g., `List<QuizQuestion>`).
5.  **Backend Response**:
    * The `LLMService` returns the structured data to the business `Service`.
    * The `Service` returns it to the `Controller`.
    * The `Controller` serializes the Java objects into a JSON response and sends it back to the frontend with a 200 OK status.
6.  **Frontend Display**:
    * The React application receives the JSON data.
    * It updates its state (e.g., `setQuestions(data)`).
    * React re-renders the UI, displaying the summary, quiz, or flashcards in their respective components.