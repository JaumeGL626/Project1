package com.example.demo.dto;

import java.util.List;

public record AnnouncementRequest(
        String title,
        String description,
        List<String> urlPhotos
) {

}
