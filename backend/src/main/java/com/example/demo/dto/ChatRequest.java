package com.example.demo.dto;

import com.example.demo.enums.ChatType;

import java.util.List;

public record ChatRequest(
        String name,
        String description,
        List<Long> participantIds,
        ChatType chatType,
        Long subForumId
) {

}
