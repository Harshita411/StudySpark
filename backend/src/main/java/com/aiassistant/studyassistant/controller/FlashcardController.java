// package com.aiassistant.studyassistant.controller;


// import com.aiassistant.studyassistant.dto.FlashcardRequest;
// import com.aiassistant.studyassistant.model.Flashcard;
// import com.aiassistant.studyassistant.service.LLMService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;


// import java.util.List;


// @RestController
// @RequestMapping("/api/flashcards")
// @CrossOrigin(origins = "http://localhost:3000")  
// public class FlashcardController {


//     @Autowired
//     private LLMService llmService;


//     @PostMapping
//     public ResponseEntity<List<Flashcard>> generateFlashcards(@RequestBody FlashcardRequest request) {
//         List<Flashcard> flashcards = llmService.generateFlashcards(request.getText());
//         return ResponseEntity.ok(flashcards);
//     }
// }






package com.aiassistant.studyassistant.controller;

import com.aiassistant.studyassistant.dto.FlashcardDeckRequest;
import com.aiassistant.studyassistant.dto.FlashcardRequest;
import com.aiassistant.studyassistant.model.Flashcard;
import com.aiassistant.studyassistant.model.FlashcardDeck;
import com.aiassistant.studyassistant.service.FlashcardService;
import com.aiassistant.studyassistant.service.LLMService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/flashcards")
public class FlashcardController {

    @Autowired
    private LLMService llmService;

    @Autowired
    private FlashcardService flashcardService;

    // Generates a new set of flashcards from text
    @PostMapping
    public ResponseEntity<List<Flashcard>> generateFlashcards(@RequestBody FlashcardRequest request) {
        return ResponseEntity.ok(llmService.generateFlashcards(request.getText()));
    }

    // --- DECK MANAGEMENT ENDPOINTS ---

    // Saves a new flashcard deck
    @PostMapping("/decks")
    public ResponseEntity<?> saveFlashcardDeck(@RequestBody FlashcardDeckRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        flashcardService.saveFlashcardDeck(request, authentication.getName());
        return ResponseEntity.ok("Deck saved successfully.");
    }

    // Gets all saved decks for the logged-in user
    @GetMapping("/decks")
    public ResponseEntity<List<FlashcardDeck>> getFlashcardDecks() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return ResponseEntity.ok(flashcardService.getDecksForUser(authentication.getName()));
    }

    // Deletes an entire deck
    @DeleteMapping("/decks/{deckId}")
    public ResponseEntity<?> deleteDeck(@PathVariable String deckId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        flashcardService.deleteDeck(deckId, authentication.getName());
        return ResponseEntity.ok("Deck deleted successfully.");
    }

    // Deletes a single card from a specific deck
    @DeleteMapping("/decks/{deckId}/cards")
    public ResponseEntity<?> deleteCardFromDeck(@PathVariable String deckId, @RequestParam String term) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        flashcardService.deleteCardFromDeck(deckId, term, authentication.getName());
        return ResponseEntity.ok("Card deleted successfully.");
    }
}
