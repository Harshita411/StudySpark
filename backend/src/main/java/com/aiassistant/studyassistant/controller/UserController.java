package com.aiassistant.studyassistant.controller;

import com.aiassistant.studyassistant.dto.UpdateProfileRequest;
import com.aiassistant.studyassistant.model.User;
import com.aiassistant.studyassistant.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Endpoint to GET the current user's profile
    @GetMapping("/profile")
    public ResponseEntity<User> getUserProfile() {
        // Get the currently authenticated user's username from the security context.
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userService.findUserByUsername(username);
        return ResponseEntity.ok(user);
    }

    // Endpoint to UPDATE the current user's profile
    @PutMapping("/profile")
    public ResponseEntity<User> updateUserProfile(@RequestBody UpdateProfileRequest updateRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User updatedUser = userService.updateUser(username, updateRequest.getEmail());
        return ResponseEntity.ok(updatedUser);
    }
}

