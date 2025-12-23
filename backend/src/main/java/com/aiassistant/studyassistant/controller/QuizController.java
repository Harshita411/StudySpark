// // package com.aiassistant.studyassistant.controller;

// // import com.aiassistant.studyassistant.dto.QuizRequest;
// // import com.aiassistant.studyassistant.model.QuizQuestion;
// // import com.aiassistant.studyassistant.service.LLMService; // Changed from QuizGenerationService for directness
// // import org.springframework.beans.factory.annotation.Autowired;
// // import org.springframework.http.ResponseEntity;
// // import org.springframework.web.bind.annotation.*;
// // import java.util.List;

// // @RestController
// // @RequestMapping("/api/quizzes")
// // public class QuizController {

// //     @Autowired
// //     private LLMService llmService; // Changed from QuizGenerationService

// //     @PostMapping
// //     public ResponseEntity<List<QuizQuestion>> generateQuiz(@RequestBody QuizRequest request) {
// //         List<QuizQuestion> questions = llmService.generateQuiz(request.getText());
// //         return ResponseEntity.ok(questions);
// //     }
// // }


// package com.aiassistant.studyassistant.controller;

// import com.aiassistant.studyassistant.dto.QuizAttemptRequest;
// import com.aiassistant.studyassistant.dto.QuizRequest;
// import com.aiassistant.studyassistant.model.QuizAttempt;
// import com.aiassistant.studyassistant.model.QuizQuestion;
// import com.aiassistant.studyassistant.service.LLMService;
// import com.aiassistant.studyassistant.service.QuizService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.security.core.Authentication;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;

// @RestController
// @RequestMapping("/api/quizzes")
// public class QuizController {

//     @Autowired
//     private LLMService llmService;

//     @Autowired
//     private QuizService quizService;

//     // This endpoint remains the same for generating a new quiz
//     @PostMapping
//     public ResponseEntity<List<QuizQuestion>> generateQuiz(@RequestBody QuizRequest request) {
//         return ResponseEntity.ok(llmService.generateQuiz(request.getText()));
//     }

//     // NEW Endpoint to SAVE a quiz attempt
//     @PostMapping("/save")
//     public ResponseEntity<?> saveQuizAttempt(@RequestBody QuizAttemptRequest request) {
//         Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//         String username = authentication.getName();
//         quizService.saveQuizAttempt(request, username);
//         return ResponseEntity.ok("Quiz attempt saved successfully.");
//     }

//     // NEW Endpoint to GET all saved quiz attempts for the logged-in user
//     @GetMapping("/history")
//     public ResponseEntity<List<QuizAttempt>> getQuizHistory() {
//         Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//         String username = authentication.getName();
//         return ResponseEntity.ok(quizService.getQuizHistoryForUser(username));
//     }
// }
package com.aiassistant.studyassistant.controller;

import com.aiassistant.studyassistant.dto.QuizAttemptRequest;
import com.aiassistant.studyassistant.dto.QuizRequest;
import com.aiassistant.studyassistant.model.QuizAttempt;
import com.aiassistant.studyassistant.model.QuizQuestion;
import com.aiassistant.studyassistant.service.LLMService;
import com.aiassistant.studyassistant.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quizzes")
public class QuizController {

    @Autowired
    private LLMService llmService;

    @Autowired
    private QuizService quizService;

    // Generates a new quiz
    @PostMapping
    public ResponseEntity<List<QuizQuestion>> generateQuiz(@RequestBody QuizRequest request) {
        return ResponseEntity.ok(llmService.generateQuiz(request.getText()));
    }

    // Saves a quiz attempt
    @PostMapping("/save")
    public ResponseEntity<?> saveQuizAttempt(@RequestBody QuizAttemptRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        quizService.saveQuizAttempt(request, authentication.getName());
        return ResponseEntity.ok("Quiz attempt saved successfully.");
    }

    // Gets all saved quiz attempts for the user
    @GetMapping("/history")
    public ResponseEntity<List<QuizAttempt>> getQuizHistory() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return ResponseEntity.ok(quizService.getQuizHistoryForUser(authentication.getName()));
    }

    // --- NEW ENDPOINT ---
    // Deletes a specific quiz attempt by its ID
    @DeleteMapping("/{attemptId}")
    public ResponseEntity<?> deleteQuizAttempt(@PathVariable String attemptId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        quizService.deleteQuizAttempt(attemptId, authentication.getName());
        return ResponseEntity.ok("Quiz attempt deleted successfully.");
    }
}
