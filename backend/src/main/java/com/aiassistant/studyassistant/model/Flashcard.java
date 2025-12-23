// package com.aiassistant.studyassistant.model;


// import lombok.AllArgsConstructor;
// import lombok.Data;
// import lombok.NoArgsConstructor;
// import org.springframework.data.annotation.Id;
// import org.springframework.data.mongodb.core.mapping.Document;


// @Document(collection = "flashcards")
// @Data
// @NoArgsConstructor
// @AllArgsConstructor
// public class Flashcard {
//     @Id
//     private String id;
//     private String term;
//     private String definition;
//     private String noteId; // Reference to the note
// }

package com.aiassistant.studyassistant.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// This is now a Plain Old Java Object (POJO), not a MongoDB document.
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Flashcard {
    private String term;
    private String definition;
}
