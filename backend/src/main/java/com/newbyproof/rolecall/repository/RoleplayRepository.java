package com.newbyproof.rolecall.repository;

import com.newbyproof.rolecall.entity.Roleplay;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface RoleplayRepository extends JpaRepository<Roleplay, UUID> {
}
