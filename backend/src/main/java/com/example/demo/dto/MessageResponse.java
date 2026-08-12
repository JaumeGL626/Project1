package com.example.demo.dto;

import com.example.demo.entity.Chat;

import java.time.LocalDateTime;
import java.util.List;

public record MessageResponse(
         Long id,
         String content,
         LocalDateTime dateCreated,
         Long userId,
         String userName,
         String userProfilePhoto,
         Long chatId,
         List<String> filesUrl
) {
}
