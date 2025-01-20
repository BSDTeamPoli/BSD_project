package com.example.fintech.loan.app.service;

import com.example.fintech.loan.app.entity.Result;
import com.example.fintech.loan.app.entity.User;
import com.example.fintech.loan.app.repository.ResultRepository;
import com.example.fintech.loan.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class ResultService {

    @Autowired
    private ResultRepository resultRepository;

    @Autowired
    private UserRepository userRepository;

    public Result saveResultForUser(String username, String loanType, double amount, int period, boolean preliminaryApproval) {
        // Fetch the authenticated user
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found: " + username));

        // Create a Result object
        Result result = new Result(user, loanType, amount, period, LocalDate.now(), preliminaryApproval);

        // Calculate and set loan installment
        result.setLoanInstalment(result.calculateEMI());

        // Save to the database
        return resultRepository.save(result);
    }
}
