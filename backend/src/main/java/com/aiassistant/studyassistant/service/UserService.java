package com.aiassistant.studyassistant.service;


import com.aiassistant.studyassistant.model.User;
import com.aiassistant.studyassistant.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class UserService {


    @Autowired
    private UserRepository userRepository;


    public User findUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
    }


    public User updateUser(String username, String newEmail) {
        User user = findUserByUsername(username);
        user.setEmail(newEmail);
        return userRepository.save(user);
    }
}





