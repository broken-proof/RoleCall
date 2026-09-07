package com.newbyproof.rolecall.service;

import com.newbyproof.rolecall.entity.User;
import com.newbyproof.rolecall.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JetService jetService;
    private final MailService mailService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager, JetService jetService,
                       MailService mailService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jetService = jetService;
        this.mailService = mailService;
    }

    public User register(String username, String email, String password) {
        if (username == null || email == null || password == null || password.length() < 8) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username, email, and an 8-character password are required");
        }
        if (userRepository.findByUsername(username).isPresent() || userRepository.findByEmail(email).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Username or email is already in use");
        }
        return userRepository.save(new User(username, email, passwordEncoder.encode(password)));
    }

    public String login(String identifier, String password) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(identifier, password));
        return jetService.generateToken((User) authentication.getPrincipal());
    }

    public void requestPasswordReset(String email) {
        userRepository.findByEmail(email).ifPresent(user -> {
            user.setVerificationCode(UUID.randomUUID().toString());
            user.setVerificationExpiration(LocalDateTime.now().plusMinutes(15));
            userRepository.save(user);
            mailService.sendPasswordReset(user);
        });
    }

    public void resetPassword(String token, String password) {
        User user = userRepository.findByVerificationCode(token)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid or expired reset token"));
        if (user.getVerificationExpiration() == null || user.getVerificationExpiration().isBefore(LocalDateTime.now())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid or expired reset token");
        }
        if (password == null || password.length() < 8) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password must be at least 8 characters");
        }
        user.setPassword(passwordEncoder.encode(password));
        user.setVerificationCode(null);
        user.setVerificationExpiration(null);
        userRepository.save(user);
    }
}