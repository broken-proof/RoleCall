package com.newbyproof.rolecall.service;

import com.newbyproof.rolecall.entity.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailService {
    private final JavaMailSender mailSender;
    private final String frontendResetUrl;

    public MailService(JavaMailSender mailSender,
                       @Value("${app.frontend-reset-url:http://localhost:5173/reset-password}") String frontendResetUrl) {
        this.mailSender = mailSender;
        this.frontendResetUrl = frontendResetUrl;
    }

    public void sendPasswordReset(User user) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getEmail());
        message.setSubject("Reset your RoleCall password");
        message.setText("Reset your password with this link: " + frontendResetUrl
                + "?token=" + user.getVerificationCode());
        mailSender.send(message);
    }
}