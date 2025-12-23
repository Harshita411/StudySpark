// Note.java
package com.aiassistant.studyassistant.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "notes")
@Data
public class Note {
    @Id
    private String id;
    private String userId;
    private String fileName;
    private String content;
    private LocalDateTime uploadedAt;
}