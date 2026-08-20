package com.example.demo.dto;

public record SubForumRequest(
        String name,
        String description,
        Long forumId
) {
}
