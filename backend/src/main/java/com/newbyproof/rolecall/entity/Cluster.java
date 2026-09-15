package com.newbyproof.rolecall.entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
public class Cluster {

    @Id
    @GeneratedValue
    private UUID id;

    private String name;

    @OneToMany(mappedBy = "cluster", cascade = CascadeType.ALL, orphanRemoval = false)
    private List<User> users = new ArrayList<>();
}
