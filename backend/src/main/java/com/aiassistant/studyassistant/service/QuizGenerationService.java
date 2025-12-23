package com.aiassistant.studyassistant.service;
import com.aiassistant.studyassistant.model.QuizQuestion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuizGenerationService {

    @Autowired
    private LLMService llmService;

    /**
     * Generates multiple-choice quiz questions using the LLM.
     */
    public List<QuizQuestion> generateQuiz(String text) {
        return llmService.generateQuiz(text);
    }
}
