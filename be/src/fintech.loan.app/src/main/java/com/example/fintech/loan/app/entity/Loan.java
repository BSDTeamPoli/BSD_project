package com.example.fintech.loan.app.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "loans")
public class Loan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String type;

    @Column(nullable = false)
    private double interestRate;

    @Column(nullable = false)
    private int maxAmount;

    @Column(nullable = false)
    private int maxPeriod;

    public Loan() {}

    public Loan(String type, double interestRate, int maxAmount, int maxPeriod) {
        this.type = type;
        this.interestRate = interestRate;
        this.maxAmount = maxAmount;
        this.maxPeriod = maxPeriod;
    }

    public Long getId() { return id; }
    public String getType() { return type; }
    public double getInterestRate() { return interestRate; }
    public int getMaxAmount() { return maxAmount; }
    public int getMaxPeriod() { return maxPeriod; }

    public void setId(Long id) {
        this.id = id;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setInterestRate(double interestRate) {
        this.interestRate = interestRate;
    }

    public void setMaxAmount(int maxAmount) {
        this.maxAmount = maxAmount;
    }

    public void setMaxPeriod(int maxPeriod) {
        this.maxPeriod = maxPeriod;
    }
}
