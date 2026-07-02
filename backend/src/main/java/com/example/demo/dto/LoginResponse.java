package com.example.demo.dto;

import com.example.demo.enums.Role;

public record LoginResponse(
        String username,
        String email,
        Role role

) {
}
