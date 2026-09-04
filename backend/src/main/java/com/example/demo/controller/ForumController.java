package com.example.demo.controller;

import com.example.demo.dto.ForumRequest;
import com.example.demo.dto.ForumResponse;
import com.example.demo.security.JwtService;
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
    private final JwtService jwtService;

    public ForumController(ForumService forumService, JwtService jwtService){
        this.forumService=forumService;
        this.jwtService=jwtService;

    }

    @PostMapping
    ResponseEntity<ForumResponse> postForum(@RequestHeader("Authorization") String authHeader,@Valid @RequestBody ForumRequest request){
        String token = authHeader.replace("Bearer ", "");
        String email= jwtService.extractUsername(token);
        ForumResponse forumResponse=forumService.createForum(request, email);
        return ResponseEntity.status(HttpStatus.CREATED).body(forumResponse);

    }
    @GetMapping
    ResponseEntity<List<ForumResponse>> getAlllForums(){
        List<ForumResponse> forumResponseList=forumService.getAllForums();
        return ResponseEntity.status(HttpStatus.OK).body(forumResponseList);
    }
    @GetMapping("/{id}")
    public ResponseEntity<ForumResponse> getForumById(@PathVariable Long id) {
        ForumResponse forumResponse = forumService.getForumById(id);
        return ResponseEntity.status(HttpStatus.OK).body(forumResponse);
    }

}
