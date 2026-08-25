package com.example.demo.controller;

import com.example.demo.dto.SubForumRequest;
import com.example.demo.dto.SubForumResponse;
import com.example.demo.entity.SubForum;
import com.example.demo.service.SubForumService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/subForums")
public class SubForumController {
    private final SubForumService subForumService;
    public SubForumController(SubForumService subForumService){
        this.subForumService=subForumService;
    }

    @PostMapping
    ResponseEntity<SubForumResponse> postSubForumId(@RequestHeader("Authorization") String authHeader, @Valid @RequestBody SubForumRequest request){
        SubForumResponse subForumResponse=subForumService.createSubForum(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(subForumResponse);

    }
    @GetMapping(path = "/forum/{forumId}")
    ResponseEntity<List<SubForumResponse>> getAllSUbForumsbyForum(@RequestHeader("Authorization") String authHeader, @PathVariable Long forumId){
        List<SubForumResponse> subForumResponseList=subForumService.getSubForumsByForumId(forumId);
        return ResponseEntity.status(HttpStatus.OK).body(subForumResponseList);

    }


}
