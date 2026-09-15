package com.newbyproof.rolecall.repository;

import com.newbyproof.rolecall.entity.Evaluation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface EvaluationRepository extends JpaRepository<Evaluation, UUID> {

    List<Evaluation> findByVideoId(UUID videoId);

    List<Evaluation> findByTrainerId(Integer trainerId);

    Optional<Evaluation> findByVideoIdAndTrainerId(UUID videoId, Integer trainerId);

    List<Evaluation> findByVideoIdOrderByGradedAtDesc(UUID videoId);
}
