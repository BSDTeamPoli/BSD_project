package com.example.fintech.loan.app.controller;

import com.example.fintech.loan.app.entity.User;
import com.example.fintech.loan.app.security.JwtUtil;
import com.example.fintech.loan.app.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    public AuthController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Map<String, Object> request) {
        try {
            // Extract required fields
            String username = (String) request.get("username");
            String password = (String) request.get("password");
            String fullname = (String) request.get("fullname");
            String email = (String) request.get("email");
            String occupation = (String) request.get("occupation");

            // Handle optional fields safely
            LocalDate birthdate = (request.get("birthdate") != null)
                    ? LocalDate.parse(request.get("birthdate").toString())
                    : null;

            BigDecimal monthlyIncome = (request.get("monthlyIncome") != null)
                    ? new BigDecimal(request.get("monthlyIncome").toString())
                    : null;

            Boolean existingCredit = (request.get("existingCredit") != null)
                    ? Boolean.parseBoolean(request.get("existingCredit").toString())
                    : null;

            BigDecimal existingCreditAmount = (request.get("existingCreditAmount") != null)
                    ? new BigDecimal(request.get("existingCreditAmount").toString())
                    : null;

            Boolean monthlyInstallment = (request.get("monthlyInstallment") != null)
                    ? Boolean.parseBoolean(request.get("monthlyInstallment").toString())
                    : null;

            BigDecimal monthlyInstallmentAmount = (request.get("monthlyInstallmentAmount") != null)
                    ? new BigDecimal(request.get("monthlyInstallmentAmount").toString())
                    : null;

            Boolean priorLoanDefaults = (request.get("priorLoanDefaults") != null)
                    ? Boolean.parseBoolean(request.get("priorLoanDefaults").toString())
                    : null;

            Boolean authorizationToCheckCredit = (request.get("authorizationToCheckCredit") != null)
                    ? Boolean.parseBoolean(request.get("authorizationToCheckCredit").toString())
                    : null;

            // Call the service to register the user
            User user = userService.registerUser(username, password, fullname, email, occupation, birthdate,
                    monthlyIncome, existingCredit, existingCreditAmount, monthlyInstallment,
                    monthlyInstallmentAmount, priorLoanDefaults, authorizationToCheckCredit);

            // Log saved user to confirm persistence
            System.out.println("User successfully registered: " + user.getUsername());

            return ResponseEntity.ok(Map.of("message", "User registered successfully", "user", user));

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid request: " + e.getMessage()));
        }
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String password = request.get("password");

        boolean authenticated = userService.authenticateUser(username, password);

        if (authenticated) {
            String token = jwtUtil.generateToken(username);
            return ResponseEntity.ok(Map.of("token", token));
        } else {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
        }
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody Map<String, String> request) {
        try {
            String username = request.get("username");
            String oldPassword = request.get("oldPassword");
            String newPassword = request.get("newPassword");

            if (username == null || oldPassword == null || newPassword == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "All fields are required"));
            }

            boolean passwordChanged = userService.changePassword(username, oldPassword, newPassword);

            if (passwordChanged) {
                return ResponseEntity.ok(Map.of("message", "Password changed successfully"));
            } else {
                return ResponseEntity.status(403).body(Map.of("error", "Incorrect old password"));
            }

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        // Get the authenticated user’s details
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();

        // Retrieve the admin user from the database
        User adminUser = userService.findByUsername(currentUsername);

        // Check if the user exists
        if (adminUser == null || !adminUser.getRole().equals("ROLE_ADMIN")) {
            return ResponseEntity.status(403).body(Map.of("error", "Only admins can delete users."));
        }

        // Perform deletion
        boolean deleted = userService.deleteUserById(id);

        if (deleted) {
            return ResponseEntity.ok(Map.of("message", "User deleted successfully"));
        } else {
            return ResponseEntity.status(404).body(Map.of("error", "User not found"));
        }
    }

}
