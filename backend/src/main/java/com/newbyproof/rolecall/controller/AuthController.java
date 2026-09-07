package com.newbyproof.rolecall.controller;

import com.newbyproof.rolecall.entity.User;
import com.newbyproof.rolecall.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Credentials request) {
        User user = authService.register(request.username(), request.email(), request.password());
        return ResponseEntity.ok(Map.of("username", user.getUsername(), "email", user.getEmail()));
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody LoginRequest request) {
        return Map.of("token", authService.login(request.identifier(), request.password()));
    }

    @PostMapping("/forgot-password")
    public Map<String, String> forgotPassword(@RequestBody EmailRequest request) {
        authService.requestPasswordReset(request.email());
        return Map.of("message", "If that email exists, a password reset link has been sent");
    }

    @PostMapping("/reset-password")
    public Map<String, String> resetPassword(@RequestBody ResetPasswordRequest request) {
        authService.resetPassword(request.token(), request.password());
        return Map.of("message", "Password reset successfully");
    }

    public record Credentials(String username, String email, String password) {}
    public record LoginRequest(String identifier, String password) {}
    public record EmailRequest(String email) {}
    public record ResetPasswordRequest(String token, String password) {}
}