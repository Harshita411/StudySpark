// package com.aiassistant.studyassistant.service;

// import com.aiassistant.studyassistant.dto.QuizAttemptRequest;
// import com.aiassistant.studyassistant.model.QuizAttempt;
// import com.aiassistant.studyassistant.model.User;
// import com.aiassistant.studyassistant.repository.QuizAttemptRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import java.time.LocalDateTime;
// import java.util.List;

// @Service
// public class QuizService {

//     @Autowired
//     private QuizAttemptRepository quizAttemptRepository;

//     @Autowired
//     private UserService userService; // We'll use this to get the user's ID

//     public QuizAttempt saveQuizAttempt(QuizAttemptRequest request, String username) {
//         User user = userService.findUserByUsername(username);

//         QuizAttempt attempt = new QuizAttempt();
//         attempt.setUserId(user.getId());
//         attempt.setQuizTitle(request.getQuizTitle());
//         attempt.setQuestions(request.getQuestions());
//         attempt.setAttemptedAt(LocalDateTime.now());

//         return quizAttemptRepository.save(attempt);
//     }

//     public List<QuizAttempt> getQuizHistoryForUser(String username) {
//         User user = userService.findUserByUsername(username);
//         return quizAttemptRepository.findByUserIdOrderByAttemptedAtDesc(user.getId());
//     }
// }
package com.aiassistant.studyassistant.service;

import com.aiassistant.studyassistant.dto.QuizAttemptRequest;
import com.aiassistant.studyassistant.model.QuizAttempt;
import com.aiassistant.studyassistant.model.User;
import com.aiassistant.studyassistant.repository.QuizAttemptRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class QuizService {

    @Autowired
    private QuizAttemptRepository quizAttemptRepository;

    @Autowired
    private UserService userService;

    public QuizAttempt saveQuizAttempt(QuizAttemptRequest request, String username) {
        User user = userService.findUserByUsername(username);
        QuizAttempt attempt = new QuizAttempt();
        attempt.setUserId(user.getId());
        attempt.setQuizTitle(request.getQuizTitle());
        attempt.setQuestions(request.getQuestions());
        attempt.setAttemptedAt(LocalDateTime.now());
        return quizAttemptRepository.save(attempt);
    }

    public List<QuizAttempt> getQuizHistoryForUser(String username) {
        User user = userService.findUserByUsername(username);
        return quizAttemptRepository.findByUserIdOrderByAttemptedAtDesc(user.getId());
    }

    // --- NEW METHOD ---
    public void deleteQuizAttempt(String attemptId, String username) {
        User user = userService.findUserByUsername(username);
        QuizAttempt attempt = findAttemptAndVerifyOwnership(attemptId, user.getId());
        quizAttemptRepository.delete(attempt);
    }

    // --- NEW HELPER METHOD ---
    private QuizAttempt findAttemptAndVerifyOwnership(String attemptId, String userId) {
        QuizAttempt attempt = quizAttemptRepository.findById(attemptId)
                .orElseThrow(() -> new RuntimeException("Quiz attempt not found with ID: " + attemptId));

        if (!attempt.getUserId().equals(userId)) {
            throw new IllegalStateException("User does not have permission to delete this quiz attempt.");
        }
        return attempt;
    }
}
