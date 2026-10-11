package com.newbyproof.rolecall.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Roleplay {

    @Id
    @GeneratedValue
    private UUID id;

    private String title;
    private String roleplayLink;

    @Column(columnDefinition = "TEXT")
    private String scenarioSummary;

    @ManyToOne
    private Cluster cluster;

    private Integer prepTimeMinutes;
    private Integer presentationTimeMinutes;
}
