package com.aiassistant.studyassistant.repository;

import com.aiassistant.studyassistant.model.QuizAttempt;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface QuizAttemptRepository extends MongoRepository<QuizAttempt, String> {
    // Spring Data automatically creates a query to find all attempts by a specific user ID
    List<QuizAttempt> findByUserIdOrderByAttemptedAtDesc(String userId);
}
