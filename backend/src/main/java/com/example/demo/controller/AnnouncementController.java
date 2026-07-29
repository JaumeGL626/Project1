package com.example.demo.controller;

import com.example.demo.dto.AnnouncementResponse;
import com.example.demo.service.AnnouncementService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/api/announcements")
public class AnnouncementController {
    private final AnnouncementService announcementService;

    public AnnouncementController(AnnouncementService announcementService){
        this.announcementService=announcementService;
    }
    @GetMapping
    ResponseEntity<List<AnnouncementResponse>> getAllAnnouncements(){
        List<AnnouncementResponse> announcementResponseList =announcementService.getAllAnnnouncements();
        return ResponseEntity.ok(announcementResponseList);

    }
}
