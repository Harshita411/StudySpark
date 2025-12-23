package com.aiassistant.studyassistant.controller;

import com.aiassistant.studyassistant.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.Map;

// @RestController marks this class as a request handler.
@RestController
// @RequestMapping sets the base URL for all routes in this class.
@RequestMapping("/api/files")
public class FileUploadController {

    @Autowired
    private FileStorageService fileStorageService;

    // @PostMapping maps this method to handle POST requests at the "/upload" sub-path.
    @PostMapping("/upload")
    // @RequestParam tells Spring to get the file from the "file" part of the multipart request.
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            // The service extracts text from the file.
            String content = fileStorageService.storeFileAndGetContent(file);
            return ResponseEntity.ok(Map.of("content", content));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("message", "Could not process the file: " + e.getMessage()));
        }
    }
}
