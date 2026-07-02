package com.example.demo.controller;

import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.LoginResponse;
import com.example.demo.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(path = "/api/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController (AuthService authService){
        this.authService=authService;
    }

    @PostMapping(path = "/login")
    public ResponseEntity <LoginResponse> login(@Valid @RequestBody LoginRequest request){
        LoginResponse loginResponse = authService.login(request);
        return  ResponseEntity.ok(loginResponse);
    }


}
