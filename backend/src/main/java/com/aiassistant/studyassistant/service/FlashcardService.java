// package com.aiassistant.studyassistant.service;


// import com.aiassistant.studyassistant.model.Flashcard;
// import com.aiassistant.studyassistant.repository.FlashcardRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;


// import java.util.List;


// @Service
// public class FlashcardService {


//     @Autowired
//     private LLMService llmService;


//     @Autowired
//     private FlashcardRepository flashcardRepository;


//     /**
//      * Uses the LLM to generate flashcards from the given text.
//      * Optionally saves them to the database.
//      */
//     public List<Flashcard> generateFlashcards(String text) {
//         List<Flashcard> generatedFlashcards = llmService.generateFlashcards(text);


//         // Optionally save generated flashcards
//         // flashcardRepository.saveAll(generatedFlashcards);


//         return generatedFlashcards;
//     }
// }
package com.aiassistant.studyassistant.service;

import com.aiassistant.studyassistant.dto.FlashcardDeckRequest;
import com.aiassistant.studyassistant.model.Flashcard;
import com.aiassistant.studyassistant.model.FlashcardDeck;
import com.aiassistant.studyassistant.model.User;
import com.aiassistant.studyassistant.repository.FlashcardDeckRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class FlashcardService {

    @Autowired
    private FlashcardDeckRepository flashcardDeckRepository;

    @Autowired
    private UserService userService;

    public FlashcardDeck saveFlashcardDeck(FlashcardDeckRequest request, String username) {
        User user = userService.findUserByUsername(username);
        FlashcardDeck deck = new FlashcardDeck();
        deck.setUserId(user.getId());
        deck.setTitle(request.getTitle());
        deck.setCards(request.getCards());
        deck.setCreatedAt(LocalDateTime.now());
        return flashcardDeckRepository.save(deck);
    }

    public List<FlashcardDeck> getDecksForUser(String username) {
        User user = userService.findUserByUsername(username);
        return flashcardDeckRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
    }

    public void deleteDeck(String deckId, String username) {
        User user = userService.findUserByUsername(username);
        FlashcardDeck deck = findDeckAndVerifyOwnership(deckId, user.getId());
        flashcardDeckRepository.delete(deck);
    }

    public void deleteCardFromDeck(String deckId, String term, String username) {
        User user = userService.findUserByUsername(username);
        FlashcardDeck deck = findDeckAndVerifyOwnership(deckId, user.getId());
        
        // Remove the card from the list if the term matches
        deck.getCards().removeIf(card -> card.getTerm().equals(term));
        
        flashcardDeckRepository.save(deck); // Save the updated deck
    }

    private FlashcardDeck findDeckAndVerifyOwnership(String deckId, String userId) {
        FlashcardDeck deck = flashcardDeckRepository.findById(deckId)
                .orElseThrow(() -> new RuntimeException("Deck not found with ID: " + deckId));

        if (!deck.getUserId().equals(userId)) {
            throw new IllegalStateException("User does not have permission to modify this deck.");
        }
        return deck;
    }
}


