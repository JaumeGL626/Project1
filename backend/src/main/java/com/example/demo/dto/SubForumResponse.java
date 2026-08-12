package com.example.demo.dto;

import java.util.List;

public record SubForumResponse(
    Long id,
    String name,
    String description,
    List<ChatResponse> subChats

) {
}
