package com.newbyproof.rolecall.repository;

import com.newbyproof.rolecall.entity.Cluster;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ClusterRepository extends JpaRepository<Cluster, UUID> {
}
