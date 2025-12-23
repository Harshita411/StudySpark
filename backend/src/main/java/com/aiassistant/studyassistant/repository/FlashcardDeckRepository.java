package com.aiassistant.studyassistant.repository;

import com.aiassistant.studyassistant.model.FlashcardDeck;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface FlashcardDeckRepository extends MongoRepository<FlashcardDeck, String> {
    List<FlashcardDeck> findByUserIdOrderByCreatedAtDesc(String userId);
}
