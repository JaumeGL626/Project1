package com.example.demo.dto;

import com.example.demo.entity.User;

import java.time.LocalDateTime;
import java.util.List;

public record AnnouncementDto(
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
