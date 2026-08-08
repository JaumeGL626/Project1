package com.example.demo.controller;

import com.example.demo.dto.AnnouncementRequest;
import com.example.demo.dto.AnnouncementResponse;
import com.example.demo.security.JwtService;
import com.example.demo.service.AnnouncementService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/announcements")
public class AnnouncementController {
    private final AnnouncementService announcementService;
    private final JwtService jwtService;

    public AnnouncementController(AnnouncementService announcementService,JwtService jwtService){
        this.announcementService=announcementService;
        this.jwtService=jwtService;
    }
    @GetMapping
    ResponseEntity<List<AnnouncementResponse>> getAllAnnouncements(){
        List<AnnouncementResponse> announcementResponseList =announcementService.getAllAnnnouncements();
        return ResponseEntity.ok(announcementResponseList);

    }
    @PostMapping
    ResponseEntity<AnnouncementResponse>postAnnouncement(@RequestHeader("Authorization") String authHeader, @Valid @RequestBody AnnouncementRequest request){
        String token= authHeader.replace("Bearer ","");
        String email= jwtService.extractUsername(token);
        AnnouncementResponse announcementResponse=announcementService.postAnnouncement(email,request);
        return ResponseEntity.status(HttpStatus.CREATED).body(announcementResponse);
    }
    @GetMapping(path = "/my")
    ResponseEntity<List<AnnouncementResponse>> getAllMyAnnouncements(@RequestHeader("Authorization") String authHeader){
        String token= authHeader.replace("Bearer ","");
        String email= jwtService.extractUsername(token);
        List<AnnouncementResponse> announcementRequestList=announcementService.getAllMyAnnouncements(email);
        return ResponseEntity.ok(announcementRequestList);

    }
}
