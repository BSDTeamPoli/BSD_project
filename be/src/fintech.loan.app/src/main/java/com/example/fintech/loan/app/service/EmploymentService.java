package com.example.fintech.loan.app.service;

import com.example.fintech.loan.app.entity.Employment;
import com.example.fintech.loan.app.entity.User;
import com.example.fintech.loan.app.repository.EmploymentRepository;
import com.example.fintech.loan.app.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EmploymentService {

    private final EmploymentRepository employmentRepository;
    private final UserRepository userRepository;

    public EmploymentService(EmploymentRepository employmentRepository, UserRepository userRepository) {
        this.employmentRepository = employmentRepository;
        this.userRepository = userRepository;
    }

    public Employment getEmploymentByUserId(Long userId) {
        return employmentRepository.findByUserId(userId).orElse(null);
    }

    public Employment saveEmployment(Long userId, Employment employmentData) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            employmentData.setUser(user.get());
            return employmentRepository.save(employmentData);
        }
        return null; // User not found
    }

    public Long getUserIdByUsername(String username) {
        Optional<User> user = userRepository.findByUsername(username);
        return user.map(User::getId).orElse(null); // Return ID if user exists, else null
    }

}
