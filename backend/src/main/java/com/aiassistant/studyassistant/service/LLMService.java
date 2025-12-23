// package com.aiassistant.studyassistant.service;

// import com.aiassistant.studyassistant.dto.gemini.GeminiRequest;
// import com.aiassistant.studyassistant.dto.gemini.GeminiResponse;
// import com.aiassistant.studyassistant.model.Flashcard;
// import com.aiassistant.studyassistant.model.QuizQuestion;
// import com.fasterxml.jackson.core.type.TypeReference;
// import com.fasterxml.jackson.databind.ObjectMapper;
// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.stereotype.Service;
// import org.springframework.web.reactive.function.client.WebClient;
// import reactor.core.publisher.Mono;

// import java.util.Collections;
// import java.util.List;

// @Service
// public class LLMService {

//     private final WebClient webClient;
//     private final ObjectMapper objectMapper;

//     // 1. Inject API key and URL from application.properties
//     @Value("${gemini.api.key}")
//     private String apiKey;

//     @Value("${gemini.api.url}")
//     private String apiUrl;

//     // 2. Constructor to initialize WebClient and ObjectMapper
//     public LLMService(WebClient.Builder webClientBuilder, ObjectMapper objectMapper) {
//         this.webClient = webClientBuilder.baseUrl(apiUrl).build();
//         this.objectMapper = objectMapper;
//     }

//     // --- PUBLIC METHODS ---

//     public String generateSummary(String text) {
//         // 3. Create a specific prompt for summarizing
//         String prompt = "Summarize the following text in 2-3 concise sentences: \n\n" + text;

//         // 4. Call the helper method to get the raw text response from the API
//         String rawResponse = callGeminiApi(prompt).block(); // .block() waits for the response

//         // 5. Clean and return the response
//         return cleanResponse(rawResponse);
//     }

//     public List<QuizQuestion> generateQuiz(String text) {
//         // 6. Create a detailed prompt asking for a JSON structure
//         String prompt = "Based on the text below, generate exactly 5 multiple-choice questions. " +
//                 "The output MUST be a JSON array of objects. Each object must have three keys: " +
//                 "a 'question' (string), an 'options' (array of 4 strings), and a 'correctAnswerIndex' (integer from 0 to 3). " +
//                 "Do NOT include any other text or formatting outside of the JSON array. \n\n" + text;

//         String rawJson = callGeminiApi(prompt).block();
//         String cleanedJson = cleanResponse(rawJson);

//         // 7. Parse the JSON string into a List of QuizQuestion objects
//         try {
//             return objectMapper.readValue(cleanedJson, new TypeReference<>() {});
//         } catch (Exception e) {
//             System.err.println("Error parsing quiz JSON: " + e.getMessage());
//             return Collections.emptyList(); // Return empty list on failure
//         }
//     }

//     public List<Flashcard> generateFlashcards(String text) {
//         // 8. Create a prompt for flashcards, also asking for JSON
//         String prompt = "Based on the text below, generate 5-7 key terms and their definitions as flashcards. " +
//                 "The output MUST be a JSON array of objects. Each object must have two keys: " +
//                 "'term' (string) and 'definition' (string). " +
//                 "Do NOT include any other text or formatting outside of the JSON array. \n\n" + text;

//         String rawJson = callGeminiApi(prompt).block();
//         String cleanedJson = cleanResponse(rawJson);

//         try {
//             return objectMapper.readValue(cleanedJson, new TypeReference<>() {});
//         } catch (Exception e) {
//             System.err.println("Error parsing flashcard JSON: " + e.getMessage());
//             return Collections.emptyList();
//         }
//     }


//     // --- HELPER METHODS ---

//     private Mono<String> callGeminiApi(String prompt) {
//         // 9. Prepare the request body using the Gemini DTOs
//         var requestBody = new GeminiRequest(
//                 List.of(new GeminiRequest.Content(
//                         List.of(new GeminiRequest.Part(prompt))
//                 ))
//         );

//         // 10. Make the POST request
//         return webClient.post()
//                 .uri(uriBuilder -> uriBuilder.queryParam("key", apiKey).build())
//                 .bodyValue(requestBody)
//                 .retrieve()
//                 .bodyToMono(GeminiResponse.class) // Map response to our GeminiResponse DTO
//                 .map(response -> {
//                     // 11. Extract the actual text from the nested response object
//                     if (response != null && response.candidates() != null && !response.candidates().isEmpty()) {
//                         return response.candidates().get(0).content().parts().get(0).text();
//                     }
//                     return ""; // Return empty if response is not as expected
//                 });
//     }

//     private String cleanResponse(String response) {
//         // 12. Helper to remove markdown formatting that Gemini sometimes adds
//         if (response == null) return "";
//         return response.replace("```json", "").replace("```", "").trim();
//     }
// }
package com.aiassistant.studyassistant.service;

import com.aiassistant.studyassistant.dto.gemini.GeminiRequest;
import com.aiassistant.studyassistant.dto.gemini.GeminiResponse;
import com.aiassistant.studyassistant.model.Flashcard;
import com.aiassistant.studyassistant.model.QuizQuestion;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Collections;
import java.util.List;

@Service
public class LLMService {

    private final WebClient.Builder webClientBuilder;
    private final ObjectMapper objectMapper;

    // These values will be injected by Spring after the constructor runs.
    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;

    // The constructor now only stores the tools we need later.
    public LLMService(WebClient.Builder webClientBuilder, ObjectMapper objectMapper) {
        this.webClientBuilder = webClientBuilder;
        this.objectMapper = objectMapper;
    }

    // --- PUBLIC METHODS ---

    public String generateSummary(String text) {
        String prompt = "Summarize the following text in 2-3 concise sentences: \n\n" + text;
        String rawResponse = callGeminiApi(prompt).block(); // .block() waits for the API response.
        return cleanResponse(rawResponse);
    }

    public List<QuizQuestion> generateQuiz(String text) {
        String prompt = "Based on the text below, generate exactly 5 multiple-choice questions. " +
                "The output MUST be a JSON array of objects. Each object must have three keys: " +
                "a 'question' (string), an 'options' (array of 4 strings), and a 'correctAnswerIndex' (integer from 0 to 3). " +
                "Do NOT include any other text or formatting outside of the JSON array. \n\n" + text;

        String rawJson = callGeminiApi(prompt).block();
        String cleanedJson = cleanResponse(rawJson);

        try {
            // Use ObjectMapper to convert the JSON string into a list of Java objects.
            return objectMapper.readValue(cleanedJson, new TypeReference<>() {});
        } catch (Exception e) {
            System.err.println("Error parsing quiz JSON: " + e.getMessage());
            return Collections.emptyList(); // Return an empty list if parsing fails.
        }
    }

    public List<Flashcard> generateFlashcards(String text) {
        String prompt = "Based on the text below, generate 5-7 key terms and their definitions as flashcards. " +
                "The output MUST be a JSON array of objects. Each object must have two keys: " +
                "'term' (string) and 'definition' (string). " +
                "Do NOT include any other text or formatting outside of the JSON array. \n\n" + text;

        String rawJson = callGeminiApi(prompt).block();
        String cleanedJson = cleanResponse(rawJson);

        try {
            return objectMapper.readValue(cleanedJson, new TypeReference<>() {});
        } catch (Exception e) {
            System.err.println("Error parsing flashcard JSON: " + e.getMessage());
            return Collections.emptyList();
        }
    }


    // --- HELPER METHODS ---

    private Mono<String> callGeminiApi(String prompt) {
        // Build the WebClient here, right before you use it.
        // At this point, `apiUrl` has been successfully injected.
        WebClient webClient = this.webClientBuilder.baseUrl(this.apiUrl).build();

        var requestBody = new GeminiRequest(
                List.of(new GeminiRequest.Content(
                        List.of(new GeminiRequest.Part(prompt))
                ))
        );

        return webClient.post()
                .uri(uriBuilder -> uriBuilder.queryParam("key", apiKey).build())
                .bodyValue(requestBody)
                .retrieve() // Begins the process of retrieving the response.
                .bodyToMono(GeminiResponse.class) // Converts the response body to our GeminiResponse DTO.
                .map(response -> {
                    // Extracts the actual text from the nested response object.
                    if (response != null && response.candidates() != null && !response.candidates().isEmpty()) {
                        return response.candidates().get(0).content().parts().get(0).text();
                    }
                    return ""; // Return empty if the response is not as expected.
                });
    }

    private String cleanResponse(String response) {
        // Helper to remove markdown formatting that Gemini sometimes adds.
        if (response == null) return "";
        return response.replace("```json", "").replace("```", "").trim();
    }
}