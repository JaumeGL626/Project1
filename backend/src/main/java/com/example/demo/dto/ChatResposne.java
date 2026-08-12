package com.example.demo.dto;

import com.example.demo.enums.ChatType;

import java.util.List;

public record ChatResposne(
        Long id,
        ChatType chatType,
        String name,
        List<UserProfileDto> participants,
        Long subForumId,
        MessageResponse lastMessag

) {
}
