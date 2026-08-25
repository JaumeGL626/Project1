package com.example.demo.controller;

import com.example.demo.dto.ChatRequest;
import com.example.demo.dto.ChatResponse;
import com.example.demo.entity.Chat;
import com.example.demo.security.JwtService;
import com.example.demo.service.ChatService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/chats")
public class ChatController {

    private final ChatService chatService;
    private final JwtService jwtService;

    public ChatController (ChatService chatService, JwtService jwtService){
        this.chatService=chatService;
        this.jwtService=jwtService;
    }
    @PostMapping
    public  ResponseEntity<ChatResponse> postChat(@RequestHeader("Authorization") String authHeader, @Valid @RequestBody ChatRequest request){
        String token= authHeader.replace("Bearer ","");
        String email= jwtService.extractUsername(token);

        ChatResponse chatResponse= chatService.createChat(email, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(chatResponse);
    }
    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> deleteChat(@PathVariable Long id){
        chatService.deleteChat(id);
        return ResponseEntity.noContent().build();

    }

    @GetMapping(path = "/me")
    public ResponseEntity<List<ChatResponse>> getAllMyChats(@RequestHeader("Authorization") String authHeader){
        String token= authHeader.replace("Bearer ","");
        String email= jwtService.extractUsername(token);

        List<ChatResponse> chatResponseList=chatService.getAllMyChats(email);
        return ResponseEntity.status(HttpStatus.OK).body(chatResponseList);

    }
    @GetMapping(path = "/subforum/{subforumId}")
    public ResponseEntity<List<ChatResponse>> getAllChatsBySubForumId(@RequestHeader("Authorization") String authHeader, @PathVariable Long subforumId){
        String token= authHeader.replace("Bearer ","");
        String email= jwtService.extractUsername(token);

        List<ChatResponse> chatResponseList=chatService.getAllChatsBySubForumId(subforumId);
        return ResponseEntity.status(HttpStatus.OK).body(chatResponseList);

    }





}
