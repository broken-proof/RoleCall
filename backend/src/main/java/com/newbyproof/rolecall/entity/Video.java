package com.newbyproof.rolecall.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Video {
    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne
    private User trainee;

    private String title;
    private String storageKey; // For s3
    private String contentType;

    @Enumerated(EnumType.STRING)
    private Status status; // PENDING, UPLOADED, REVIEWED

    private Instant createdAt;
}
