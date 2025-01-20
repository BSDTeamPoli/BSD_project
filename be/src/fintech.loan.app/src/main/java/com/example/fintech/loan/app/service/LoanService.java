package com.example.fintech.loan.app.service;


import com.example.fintech.loan.app.entity.Loan;
import com.example.fintech.loan.app.repository.LoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LoanService {

    @Autowired
    private LoanRepository loanRepository;

    public List<Loan> getAllLoans() {
        return loanRepository.findAll();
    }

    public Optional<Loan> getLoanByType(String type) {
        return loanRepository.findByType(type);
    }

    public Loan addLoan(Loan loan) {
        return loanRepository.save(loan);
    }
}