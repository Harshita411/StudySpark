// FileStorageService.java
package com.aiassistant.studyassistant.service;

import com.aiassistant.studyassistant.model.Note;
import com.aiassistant.studyassistant.repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.time.LocalDateTime;

@Service
public class FileStorageService {

    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private NLPService nlpService;

    public String storeFileAndGetContent(MultipartFile file) throws IOException {
        String originalFilename = file.getOriginalFilename();
        
        // Use NLPService to extract text from the file
        String content = nlpService.extractTextFromFile(file);
        
        Note note = new Note();
        note.setFileName(originalFilename);
        note.setContent(content);
        note.setUploadedAt(LocalDateTime.now());
        // In a real app, you would get the userId from the security context
        note.setUserId("mockUserId"); 
        
        noteRepository.save(note);
        
        return content;
    }
}