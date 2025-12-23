package com.aiassistant.studyassistant.dto;

import com.aiassistant.studyassistant.model.Flashcard;
import lombok.Data;
import java.util.List;

@Data
public class FlashcardDeckRequest {
    private String title;
    private List<Flashcard> cards;
}
