package com.example.fintech.loan.app.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "users")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String fullname;

    @Column(nullable = false, unique = true)
    private String email;

    private LocalDate birthdate;

    private String occupation;

    private BigDecimal monthlyIncome;

    private Boolean existingCredit;

    private BigDecimal existingCreditAmount;  // Matches Angular model

    private Boolean monthlyInstallment;  // Matches Angular model

    private BigDecimal monthlyInstallmentAmount;  // Matches Angular model

    private Boolean priorLoanDefaults;  // Matches Angular model

    private Boolean authorizationToCheckCredit;

    @Column(nullable = false)
    private String role = "ROLE_USER";

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Employment employment;

    // Getter and Setter for ID
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // Getter and Setter for Username
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    // Getter and Setter for Password
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getOccupation() {
        return occupation;
    }

    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }

    public LocalDate getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(LocalDate birthdate) {
        this.birthdate = birthdate;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public BigDecimal getMonthlyIncome() {
        return monthlyIncome;
    }

    public void setMonthlyIncome(BigDecimal monthlyIncome) {
        this.monthlyIncome = monthlyIncome;
    }

    public Boolean getExistingCredit() {
        return existingCredit;
    }

    public void setExistingCredit(Boolean existingCredit) {
        this.existingCredit = existingCredit;
    }

    public Employment getEmployment() {
        return employment;
    }

    public void setEmployment(Employment employment) {
        this.employment = employment;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public BigDecimal getExistingCreditAmount() {
        return existingCreditAmount;
    }

    public void setExistingCreditAmount(BigDecimal existingCreditAmount) {
        this.existingCreditAmount = existingCreditAmount;
    }

    public Boolean getMonthlyInstallment() {
        return monthlyInstallment;
    }

    public void setMonthlyInstallment(Boolean monthlyInstallment) {
        this.monthlyInstallment = monthlyInstallment;
    }

    public BigDecimal getMonthlyInstallmentAmount() {
        return monthlyInstallmentAmount;
    }

    public void setMonthlyInstallmentAmount(BigDecimal monthlyInstallmentAmount) {
        this.monthlyInstallmentAmount = monthlyInstallmentAmount;
    }

    public Boolean getPriorLoanDefaults() {
        return priorLoanDefaults;
    }

    public void setPriorLoanDefaults(Boolean priorLoanDefaults) {
        this.priorLoanDefaults = priorLoanDefaults;
    }

    public Boolean getAuthorizationToCheckCredit() {
        return authorizationToCheckCredit;
    }

    public void setAuthorizationToCheckCredit(Boolean authorizationToCheckCredit) {
        this.authorizationToCheckCredit = authorizationToCheckCredit;
    }
}