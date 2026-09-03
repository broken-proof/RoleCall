package com.newbyproof.rolecall.controller;

import com.newbyproof.rolecall.service.S3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/files")
@CrossOrigin(origins = "*")
public class S3Controller {

    @Autowired
    private S3Service service;

    @GetMapping("/{filename}")
    public ResponseEntity<?> getUrl(@PathVariable String filename){
        return service.generateGetPresignedUrl(filename);
    }

    @PostMapping("/presigned/{filename}")
    public ResponseEntity<?> generateUrl(@PathVariable String filename){
        return service.generatePutPresignedUrl(filename);
    }
}
