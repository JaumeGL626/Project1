package com.example.demo.dto;

import com.example.demo.enums.Role;

public record UserProfileDto(
         Long id,
         String username,
         String email,
         String description,
         Role role,
         String profilePicture
) {

}
