// NoteRepository.java
package com.aiassistant.studyassistant.repository;

import com.aiassistant.studyassistant.model.Note;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface NoteRepository extends MongoRepository<Note, String> {
    List<Note> findByUserId(String userId);
}

