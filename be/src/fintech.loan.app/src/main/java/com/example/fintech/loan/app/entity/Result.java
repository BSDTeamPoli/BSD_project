package com.example.fintech.loan.app.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "results")
public class Result {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long interactionId;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user; // One-to-One mapping with User

    @Column(nullable = false)
    private String loanType; // Type of loan requested

    @Column(nullable = false)
    private double amount; // Amount requested by the user

    @Column(nullable = false)
    private int period; // Loan period requested by the user

    @Column(nullable = false)
    private LocalDate requestDate; // Date of request

    @Column(nullable = false)
    private double loanInstalment; // Monthly loan installment

    @Column(nullable = false)
    private boolean preliminaryApproval; // Indicates if the user received a preliminary approval

    public Result() {}

    public Result(User user, String loanType, double amount, int period, LocalDate requestDate, boolean preliminaryApproval) {
        this.user = user;
        this.loanType = loanType;
        this.amount = amount;
        this.period = period;
        this.requestDate = requestDate;
        this.loanInstalment = calculateEMI();
        this.preliminaryApproval = preliminaryApproval;
    }

    public double calculateEMI() {
        double interestRate = 1;

        if(loanType.equals("Mortgage loan")) {
            interestRate = 7;
        }
        else if(loanType.equals("Auto loan")) {
            interestRate = 9;
        }
        else if(loanType.equals("Personal loan")) {
            interestRate = 10;
        }
        else if(loanType.equals("Credit card")) {
            interestRate = 12;
        }

        double r = interestRate / 100.0; // Convert percentage to decimal
        return (amount * r * Math.pow(1 + r, period)) / (Math.pow(1 + r, period) - 1);
    }

    // Getters and Setters
    public Long getInteractionId() {
        return interactionId;
    }

    public void setInteractionId(Long interactionId) {
        this.interactionId = interactionId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getLoanType() {
        return loanType;
    }

    public void setLoanType(String loanType) {
        this.loanType = loanType;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public int getPeriod() {
        return period;
    }

    public void setPeriod(int period) {
        this.period = period;
    }

    public LocalDate getRequestDate() {
        return requestDate;
    }

    public void setRequestDate(LocalDate requestDate) {
        this.requestDate = requestDate;
    }

    public double getLoanInstalment() {
        return loanInstalment;
    }

    public void setLoanInstalment(double loanInstalment) {
        this.loanInstalment = loanInstalment;
    }

    public boolean isPreliminaryApproval() {
        return preliminaryApproval;
    }

    public void setPreliminaryApproval(boolean preliminaryApproval) {
        this.preliminaryApproval = preliminaryApproval;
    }
}
