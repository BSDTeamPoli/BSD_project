package com.example.fintech.loan.app.repository;

import com.example.fintech.loan.app.entity.Employment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmploymentRepository extends JpaRepository<Employment, Long> {
    Optional<Employment> findByUserId(Long userId);
}
