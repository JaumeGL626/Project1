package com.example.demo.controller;

import com.example.demo.dto.MessageRequest;
import com.example.demo.dto.MessageResponse;
import com.example.demo.entity.Message;
import com.example.demo.security.JwtService;
import com.example.demo.service.MessageService;
import com.example.demo.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/{idChat}/messages")
public class MessageController {

    private final JwtService jwtService;
    private final MessageService messageService;
    private final UserService userService;

    public MessageController(JwtService jwtService, MessageService messageService, UserService userService){
        this.jwtService=jwtService;
        this.messageService=messageService;
        this.userService=userService;
    }
    @PostMapping
    ResponseEntity<MessageResponse> sendMessage(@RequestHeader("Authorization") String authHeader, @Valid @RequestBody MessageRequest request, @PathVariable Long idChat){
        String token= authHeader.replace("Bearer ","");
        String email= jwtService.extractUsername(token);

        MessageResponse messageResponse =messageService.postMessage(email,request,idChat);
        return ResponseEntity.status(HttpStatus.CREATED).body(messageResponse);

    }
    @GetMapping
    ResponseEntity<List<MessageResponse>> getMessagesByCaht(@RequestHeader("Authorization") String authHeader, @PathVariable Long idChat){
        String token= authHeader.replace("Bearer ","");
        String email= jwtService.extractUsername(token);

        List<MessageResponse> messageResponseList= messageService.getMessagebyChat(email,idChat);
        return ResponseEntity.status(HttpStatus.OK).body(messageResponseList);

    }

}
