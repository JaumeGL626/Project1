package com.example.demo.dto;

import java.util.List;

public record ForumResponse(
        Long id,
        String name,
        String description,
        List<SubForumResponse> subForums
) {
}
