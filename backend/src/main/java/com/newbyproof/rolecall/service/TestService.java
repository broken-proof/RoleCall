package com.newbyproof.rolecall.service;

import com.newbyproof.rolecall.entity.Test;
import com.newbyproof.rolecall.repository.TestRepository;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class TestService {

    @Autowired
    private TestRepository testRepository;

    public ResponseEntity<?> addTest(Test test){
        try {
            System.out.println(test);
            Test saved = testRepository.save(test);
            return ResponseEntity.ok().body(saved);
        } catch (Exception e){
            return ResponseEntity.badRequest().body(Map.of("Saved", false));
        }
    }

    public List<Test> getTests(){
        return testRepository.findAll();
    }
}
