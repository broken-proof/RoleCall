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

    // The roleplay this submission performs; a roleplay can have many submissions
    @ManyToOne
    @JoinColumn(name = "roleplay_id")
    private Roleplay roleplay;

    private String title;

    @Column(unique = true)
    private String storageKey; // For s3, one file per submission
    private String contentType;

    @Enumerated(EnumType.STRING)
    private VideoStatus status; // PENDING, UPLOADED, REVIEWED

    private Instant createdAt;
}
