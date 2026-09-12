package com.newbyproof.rolecall.service;

import com.newbyproof.rolecall.entity.Role;
import com.newbyproof.rolecall.entity.Status;
import com.newbyproof.rolecall.entity.User;
import com.newbyproof.rolecall.entity.Video;
import com.newbyproof.rolecall.repository.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
public class VideoService {

    @Autowired
    private VideoRepository videoRepository;

    @Autowired
    private S3Service s3Service;

    public List<Video> getAllVideosFromTrainee(Integer id){
        try {
            return videoRepository.findAllByTraineeId(id);
        } catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    // Creates a pending Video row and returns a presigned url the client can PUT the file directly
    public UploadRequest createUploadRequest(User trainee, String title, String filename, String contentType){
        String key = "videos/" + trainee.getId() + "/" + UUID.randomUUID() + "_" + filename;

        Video video = new Video();
        video.setTrainee(trainee);
        video.setTitle(title);
        video.setStorageKey(key);
        video.setContentType(contentType);
        video.setStatus(Status.PENDING);
        video = videoRepository.save(video);

        String uploadUrl = s3Service.generatePutPresignedUrlForKey(key, contentType);
        return new UploadRequest(video.getId(), uploadUrl);
    }

    // Marks a pending video as uploaded once the client has finished the direct S3 PUT.
    public Video completeUpload(UUID videoId, User trainee){
        Video video = videoRepository.findById(videoId)
                .orElseThrow(() -> new IllegalArgumentException("Video not found"));
        if (!video.getTrainee().getId().equals(trainee.getId())) {
            throw new SecurityException("Not authorized to modify this video");
        }
        video.setStatus(Status.UPLOADED);
        video.setCreatedAt(Instant.now());
        return videoRepository.save(video);
    }

    public String getDownloadUrl(UUID videoId, User requester){
        Video video = videoRepository.findById(videoId)
                .orElseThrow(() -> new IllegalArgumentException("Video not found"));
        boolean isOwner = video.getTrainee().getId().equals(requester.getId());
        boolean canReview = requester.getRole() == Role.TRAINER || requester.getRole() == Role.ADMIN;
        if (!isOwner && !canReview) {
            throw new SecurityException("Not authorized to view this video");
        }
        return s3Service.generateGetPresignedUrlForKey(video.getStorageKey());
    }

    public record UploadRequest(UUID videoId, String uploadUrl) {}
}
