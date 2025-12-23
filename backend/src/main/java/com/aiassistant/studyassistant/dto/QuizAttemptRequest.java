package com.aiassistant.studyassistant.dto;

import com.aiassistant.studyassistant.model.QuizAttempt;
import lombok.Data;
import java.util.List;

@Data
public class QuizAttemptRequest {
    private String quizTitle;
    private List<QuizAttempt.QuestionDetail> questions;
}
