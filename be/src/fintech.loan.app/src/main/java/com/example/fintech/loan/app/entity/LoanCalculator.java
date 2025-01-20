package com.example.fintech.loan.app.entity;

public class LoanCalculator {
    private String loanType;
    private double amount;
    private int period; // in months
    private double interestRate; // monthly interest rate
    private double monthlyIncome;
    private double existingCredit;

    // Constructor
    public LoanCalculator(String loanType, double amount, int period, double interestRate,
                          double monthlyIncome, double existingCredit) {
        this.loanType = loanType;
        this.amount = amount;
        this.period = period;
        this.interestRate = interestRate;
        this.monthlyIncome = monthlyIncome;
        this.existingCredit = existingCredit;
    }

    // Method to calculate EMI (Equated Monthly Installment)
    public double calculateEMI() {
        double r = interestRate / 100; // Convert percentage to decimal
        return (amount * r * Math.pow(1 + r, period)) / (Math.pow(1 + r, period) - 1);
    }

    // Getters
    public String getLoanType() { return loanType; }
    public double getAmount() { return amount; }
    public int getPeriod() { return period; }
    public double getInterestRate() { return interestRate; }
    public double getMonthlyIncome() { return monthlyIncome; }
    public double getExistingCredit() { return existingCredit; }
}
