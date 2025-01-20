package com.example.fintech.loan.app.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "employment")
@Data
public class Employment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EmploymentType employmentType; // TEMPORARY or PERMANENT

    @Column(nullable = false)
    private String currentEmployer;

    @Column(nullable = false)
    private String industrySector;

    @Column(nullable = false)
    private LocalDate startOfEmployment;

    private LocalDate endOfEmployment;

    @Column(nullable = false)
    private BigDecimal monthlyNetIncome;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", unique = true, nullable = false)
    private User user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public EmploymentType getEmploymentType() {
        return employmentType;
    }

    public void setEmploymentType(EmploymentType employmentType) {
        this.employmentType = employmentType;
    }

    public String getCurrentEmployer() {
        return currentEmployer;
    }

    public void setCurrentEmployer(String currentEmployer) {
        this.currentEmployer = currentEmployer;
    }

    public String getIndustrySector() {
        return industrySector;
    }

    public void setIndustrySector(String industrySector) {
        this.industrySector = industrySector;
    }

    public LocalDate getStartOfEmployment() {
        return startOfEmployment;
    }

    public void setStartOfEmployment(LocalDate startOfEmployment) {
        this.startOfEmployment = startOfEmployment;
    }

    public LocalDate getEndOfEmployment() {
        return endOfEmployment;
    }

    public void setEndOfEmployment(LocalDate endOfEmployment) {
        this.endOfEmployment = endOfEmployment;
    }

    public BigDecimal getMonthlyNetIncome() {
        return monthlyNetIncome;
    }

    public void setMonthlyNetIncome(BigDecimal monthlyNetIncome) {
        this.monthlyNetIncome = monthlyNetIncome;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
