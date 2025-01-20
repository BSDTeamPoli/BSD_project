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

    public User registerUser(String username, String password, String firstName, String lastName, String email,
                             String occupation, LocalDate birthdate, BigDecimal monthlyIncome, Boolean existingCredit,
                             BigDecimal installmentAmount, String role) {
        if (userRepository.findByUsername(username).isPresent()) {
            throw new RuntimeException("Username already exists");
        }
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password)); // Encrypt password
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setEmail(email);
        user.setOccupation(occupation);
        user.setBirthdate(birthdate);
        user.setMonthlyIncome(monthlyIncome);
        user.setExistingCredit(existingCredit);
        user.setInstallmentAmount(installmentAmount);
        user.setRole(role != null ? role : "ROLE_USER"); // Default to "ROLE_USER" if not provided

        return userRepository.save(user);
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
            user.setFirstName(updatedUser.getFirstName());
            user.setLastName(updatedUser.getLastName());
            user.setEmail(updatedUser.getEmail());
            user.setOccupation(updatedUser.getOccupation());
            user.setBirthdate(updatedUser.getBirthdate());
            user.setMonthlyIncome(updatedUser.getMonthlyIncome());
            user.setExistingCredit(updatedUser.getExistingCredit());
            user.setInstallmentAmount(updatedUser.getInstallmentAmount());

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
        Optional<User> optionalUser = userRepository.findByUsername(username);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            if (request.containsKey("firstName")) user.setFirstName((String) request.get("firstName"));
            if (request.containsKey("lastName")) user.setLastName((String) request.get("lastName"));
            if (request.containsKey("email")) user.setEmail((String) request.get("email"));
            if (request.containsKey("occupation")) user.setOccupation((String) request.get("occupation"));
            if (request.containsKey("birthdate"))
                user.setBirthdate(LocalDate.parse(request.get("birthdate").toString()));
            if (request.containsKey("monthlyIncome"))
                user.setMonthlyIncome(new BigDecimal(request.get("monthlyIncome").toString()));
            if (request.containsKey("existingCredit"))
                user.setExistingCredit(Boolean.parseBoolean(request.get("existingCredit").toString()));
            if (request.containsKey("installmentAmount"))
                user.setInstallmentAmount(new BigDecimal(request.get("installmentAmount").toString()));

            return userRepository.save(user);
        }
        return null; // User not found
    }
}

