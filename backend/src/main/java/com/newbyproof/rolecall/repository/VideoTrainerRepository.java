package com.newbyproof.rolecall.repository;

import com.newbyproof.rolecall.entity.MarkingStatus;
import com.newbyproof.rolecall.entity.VideoTrainer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface VideoTrainerRepository extends JpaRepository<VideoTrainer, UUID> {

    List<VideoTrainer> findByVideoId(UUID videoId);

    List<VideoTrainer> findByTrainerId(Integer trainerId);

    Optional<VideoTrainer> findByVideoIdAndTrainerId(UUID videoId, Integer trainerId);

    List<VideoTrainer> findByStatus(MarkingStatus status);

    List<VideoTrainer> findByTrainerIdAndStatus(Integer trainerId, MarkingStatus status);
}
