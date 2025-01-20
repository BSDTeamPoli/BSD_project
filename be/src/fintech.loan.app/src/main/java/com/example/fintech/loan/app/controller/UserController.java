package com.example.fintech.loan.app.controller;

import com.example.fintech.loan.app.entity.User;
import com.example.fintech.loan.app.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:4200") // Allow Angular frontend
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/")
    public ResponseEntity<?> getAuthenticatedUser() {
        // Get the authenticated user's details from security context
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();

        // Retrieve the user from the database
        User user = userService.findByUsername(currentUsername);

        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(404).body(Map.of("error", "User not found"));
        }
    }

    @PutMapping("/")
    public ResponseEntity<?> updateAuthenticatedUser(@RequestBody Map<String, Object> request) {
        try {
            // Get authenticated user
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String currentUsername = authentication.getName();

            User updatedUser = userService.updateUserByUsername(currentUsername, request);
            if (updatedUser != null) {
                return ResponseEntity.ok(Map.of("message", "User updated successfully", "user", updatedUser));
            } else {
                return ResponseEntity.status(404).body(Map.of("error", "User not found"));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}