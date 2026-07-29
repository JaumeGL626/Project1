package com.example.demo.dto;

import java.time.LocalDateTime;
import java.util.List;

public record AnnouncementResponse(
        List<String> urlPhotos,
        LocalDateTime date,
        String description,
        String owner,
        String ownerProfilePicture,
        Long ownerId,
        String title,
        Long id
) {
}
