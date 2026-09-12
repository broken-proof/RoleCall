package com.newbyproof.rolecall.controller;

import com.newbyproof.rolecall.entity.User;
import com.newbyproof.rolecall.entity.Video;
import com.newbyproof.rolecall.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/video")
@CrossOrigin(origins = "*")
public class VideoController {

    @Autowired
    private VideoService videoService;

    @PostMapping("/upload-url")
    public ResponseEntity<?> createUploadUrl(@AuthenticationPrincipal User trainee,
                                              @RequestBody UploadUrlRequest request){
        if (request.filename() == null || request.filename().isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("message", "filename is required"));
        }
        VideoService.UploadRequest uploadRequest = videoService.createUploadRequest(
                trainee, request.title(), request.filename(), request.contentType());
        return ResponseEntity.ok(Map.of(
                "videoId", uploadRequest.videoId(),
                "uploadUrl", uploadRequest.uploadUrl()));
    }

    @PostMapping("/{id}/complete-upload")
    public ResponseEntity<?> completeUpload(@AuthenticationPrincipal User trainee, @PathVariable UUID id){
        try {
            Video video = videoService.completeUpload(id, trainee);
            return ResponseEntity.ok(video);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", e.getMessage()));
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/mine")
    public ResponseEntity<?> getMyVideos(@AuthenticationPrincipal User trainee){
        List<Video> videos = videoService.getAllVideosFromTrainee(trainee.getId());
        return ResponseEntity.ok(videos);
    }

    @GetMapping("/{id}/download-url")
    public ResponseEntity<?> getDownloadUrl(@AuthenticationPrincipal User requester, @PathVariable UUID id){
        try {
            String url = videoService.getDownloadUrl(id, requester);
            return ResponseEntity.ok(Map.of("url", url));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", e.getMessage()));
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("message", e.getMessage()));
        }
    }

    public record UploadUrlRequest(String title, String filename, String contentType) {}
}
