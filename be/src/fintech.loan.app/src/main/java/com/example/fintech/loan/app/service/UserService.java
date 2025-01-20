package com.example.fintech.loan.app.service;

import com.example.fintech.loan.app.entity.User;
import com.example.fintech.loan.app.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public User registerUser(String username, String password, String fullname, String email,
                             String occupation, LocalDate birthdate, BigDecimal monthlyIncome,
                             Boolean existingCredit, BigDecimal existingCreditAmount,
                             Boolean monthlyInstallment, BigDecimal monthlyInstallmentAmount,
                             Boolean priorLoanDefaults, Boolean authorizationToCheckCredit) {

        if (userRepository.findByUsername(username).isPresent()) {
            throw new RuntimeException("Username already exists");
        }
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setFullname(fullname);
        user.setEmail(email);
        user.setOccupation(occupation);
        user.setBirthdate(birthdate);
        user.setMonthlyIncome(monthlyIncome);
        user.setExistingCredit(existingCredit);
        user.setExistingCreditAmount(existingCreditAmount);
        user.setMonthlyInstallment(monthlyInstallment);
        user.setMonthlyInstallmentAmount(monthlyInstallmentAmount);
        user.setPriorLoanDefaults(priorLoanDefaults);
        user.setAuthorizationToCheckCredit(authorizationToCheckCredit);
        user.setRole("ROLE_USER"); // Default role

        User savedUser = userRepository.save(user);

        System.out.println("User successfully registered: " + savedUser);

        return savedUser;
    }


    public boolean authenticateUser(String username, String password) {
        Optional<User> optionalUser = userRepository.findByUsername(username);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            return passwordEncoder.matches(password, user.getPassword());
        }
        return false;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> optionalUser = userRepository.findByUsername(username);
        if (!optionalUser.isPresent()) {
            throw new UsernameNotFoundException("User not found");
        }

        User user = optionalUser.get();
        return org.springframework.security.core.userdetails.User
                .withUsername(user.getUsername())
                .password(user.getPassword())
                .roles(user.getRole().replace("ROLE_", "")) // Spring expects role without "ROLE_"
                .build();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public Optional<User> updateUser(Long id, User updatedUser) {
        return userRepository.findById(id).map(user -> {
            user.setFullname(updatedUser.getFullname());
            user.setEmail(updatedUser.getEmail());
            user.setOccupation(updatedUser.getOccupation());
            user.setBirthdate(updatedUser.getBirthdate());
            user.setMonthlyIncome(updatedUser.getMonthlyIncome());
            user.setExistingCredit(updatedUser.getExistingCredit());
            user.setExistingCreditAmount(updatedUser.getExistingCreditAmount());
            user.setMonthlyInstallment(updatedUser.getMonthlyInstallment());
            user.setMonthlyInstallmentAmount(updatedUser.getMonthlyInstallmentAmount());
            user.setPriorLoanDefaults(updatedUser.getPriorLoanDefaults());
            user.setAuthorizationToCheckCredit(updatedUser.getAuthorizationToCheckCredit());

            // If updating password, encrypt it
            if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
                user.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
            }

            return userRepository.save(user);
        });
    }

    public boolean changePassword(String username, String oldPassword, String newPassword) {
        Optional<User> optionalUser = userRepository.findByUsername(username);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
                return false; // Incorrect old password
            }

            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);
            return true;
        }

        return false; // User not found
    }

    public boolean deleteUserById(Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }

    public User updateUserByUsername(String username, Map<String, Object> request) {
        return userRepository.findByUsername(username).map(user -> {
            if (request.containsKey("fullname")) user.setFullname((String) request.get("fullname"));
            if (request.containsKey("email")) user.setEmail((String) request.get("email"));
            if (request.containsKey("occupation")) user.setOccupation((String) request.get("occupation"));
            if (request.containsKey("birthdate"))
                user.setBirthdate(LocalDate.parse(request.get("birthdate").toString()));
            if (request.containsKey("monthlyIncome"))
                user.setMonthlyIncome(new BigDecimal(request.get("monthlyIncome").toString()));
            if (request.containsKey("existingCredit"))
                user.setExistingCredit(Boolean.parseBoolean(request.get("existingCredit").toString()));
            if (request.containsKey("existingCreditAmount"))
                user.setExistingCreditAmount(new BigDecimal(request.get("existingCreditAmount").toString()));
            if (request.containsKey("monthlyInstallment"))
                user.setMonthlyInstallment(Boolean.parseBoolean(request.get("monthlyInstallment").toString()));
            if (request.containsKey("monthlyInstallmentAmount"))
                user.setMonthlyInstallmentAmount(new BigDecimal(request.get("monthlyInstallmentAmount").toString()));
            if (request.containsKey("priorLoanDefaults"))
                user.setPriorLoanDefaults(Boolean.parseBoolean(request.get("priorLoanDefaults").toString()));
            if (request.containsKey("authorizationToCheckCredit"))
                user.setAuthorizationToCheckCredit(Boolean.parseBoolean(request.get("authorizationToCheckCredit").toString()));

            return userRepository.save(user);
        }).orElse(null); // User not found
    }
}

