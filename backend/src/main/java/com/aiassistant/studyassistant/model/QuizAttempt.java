package com.aiassistant.studyassistant.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "quizAttempts")
@Data
public class QuizAttempt {

    @Id
    private String id;
    private String userId;
    private String quizTitle;
    private LocalDateTime attemptedAt;
    private List<QuestionDetail> questions;

    // A nested class to store details for each question in the attempt
    @Data
    public static class QuestionDetail {
        private String question;
        private List<String> options;
        private int correctAnswerIndex;
        private int userAnswerIndex; // The user's selected answer
    }
}
