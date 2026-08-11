package com.example.demo.dto;

import java.util.List;

public record MessageRequest(
        String content,
        List<String> urlPhotos
) {

}
