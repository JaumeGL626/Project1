package com.example.demo.controller;

import com.example.demo.dto.ForumRequest;
import com.example.demo.dto.ForumResponse;
import com.example.demo.service.ForumService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/forums")
public class ForumController {
    private final ForumService forumService;

    public ForumController(ForumService forumService){
        this.forumService=forumService;
    }

    @PostMapping
    ResponseEntity<ForumResponse> postForum(@RequestHeader("Authorization") String authHeader,@Valid @RequestBody ForumRequest request){

        ForumResponse forumResponse=forumService.createForum(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(forumResponse);

    }
    @GetMapping
    ResponseEntity<List<ForumResponse>> getAlllForums(){
        List<ForumResponse> forumResponseList=forumService.getAllForums();
        return ResponseEntity.status(HttpStatus.OK).body(forumResponseList);
    }

}
