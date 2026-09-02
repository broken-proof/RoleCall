package com.newbyproof.rolecall.controller;

import com.newbyproof.rolecall.entity.Test;
import com.newbyproof.rolecall.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/test")
public class TestController {

    @Autowired
    private TestService testService;

    @PostMapping
    private ResponseEntity<?> addTest(@RequestBody Test test){
        return testService.addTest(test);
    }

    @GetMapping
    private List<Test> getTests(){
        return testService.getTests();
    }
}
