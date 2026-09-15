package com.newbyproof.rolecall.entity;
import java.time.Instant;
import java.util.UUID;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class VideoTrainer {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "video_id", nullable = false)
    private Video video;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trainer_id", nullable = false)
    private User trainer;

    //Unmarked, Inprogress, or Marked
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MarkingStatus status;

    //When the trainer was assigned to mark this case
    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private Instant assignedAt;
}