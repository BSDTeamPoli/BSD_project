package com.example.fintech.loan.app.controller;

import com.example.fintech.loan.app.entity.Loan;
import com.example.fintech.loan.app.service.LoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/loans")
public class LoanController {

    @Autowired
    private LoanService loanService;

    @GetMapping
    public List<Loan> getAllLoans() {
        return loanService.getAllLoans();
    }

    @GetMapping("/{type}")
    public Optional<Loan> getLoanByType(@PathVariable String type) {
        return loanService.getLoanByType(type);
    }

    @PostMapping
    public Loan addLoan(@RequestBody Loan loan) {
        return loanService.addLoan(loan);
    }
}
