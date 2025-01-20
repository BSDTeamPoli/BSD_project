package com.example.fintech.loan.app.controller;

import com.example.fintech.loan.app.entity.Employment;
import com.example.fintech.loan.app.service.EmploymentService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/employment")
public class EmploymentController {

    private final EmploymentService employmentService;

    public EmploymentController(EmploymentService employmentService) {
        this.employmentService = employmentService;
    }

    @GetMapping("/")
    public ResponseEntity<?> getEmployment() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        Employment employment = employmentService.getEmploymentByUserId(employmentService.getUserIdByUsername(username));

        if (employment != null) {
            return ResponseEntity.ok(employment);
        } else {
            return ResponseEntity.status(404).body(Map.of("error", "Employment details not found"));
        }
    }

    @PutMapping("/")
    public ResponseEntity<?> updateEmployment(@RequestBody Employment employmentData) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        Employment updatedEmployment = employmentService.saveEmployment(employmentService.getUserIdByUsername(username), employmentData);

        if (updatedEmployment != null) {
            return ResponseEntity.ok(Map.of("message", "Employment details updated successfully", "employment", updatedEmployment));
        } else {
            return ResponseEntity.status(404).body(Map.of("error", "User not found"));
        }
    }
}
