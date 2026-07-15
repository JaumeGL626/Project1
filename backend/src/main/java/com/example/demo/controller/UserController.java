
package com.example.demo.controller;

import com.example.demo.dto.UserEditProfileDto;
import com.example.demo.dto.UserProfileDto;
import com.example.demo.entity.User;
import com.example.demo.security.JwtService;
import com.example.demo.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/users")
public class UserController {

    private final UserService userService;
    private final JwtService jwtService;

    public UserController(UserService userService,JwtService jwtService){
        this.userService=userService;
        this.jwtService=jwtService;
    }



    @GetMapping(path = "/{id}")
    public ResponseEntity<UserProfileDto> getPublicProfile(@PathVariable Long id){
        UserProfileDto userProfileDto= userService.getPublicProfile(id);
        return ResponseEntity.ok(userProfileDto);
    }
    @GetMapping(path="/me")
    public ResponseEntity<UserProfileDto>getProfile( @RequestHeader("Authorization") String authHeader){
        String token = authHeader.replace("Bearer ", "");
        String email= jwtService.extractUsername(token);
        UserProfileDto userProfileDto =userService.getProfile(email);
        return ResponseEntity.ok(userProfileDto);
    }

    @PutMapping(path = "/me")
    public ResponseEntity<UserProfileDto> editProfile(@RequestHeader ("Authorization") String authHeader, @Valid @RequestBody UserEditProfileDto request){
        String token= authHeader.replace("Bearer ","");
        String email= jwtService.extractUsername(token);
        UserProfileDto userProfileDto=userService.editProfile(email, request);
        return ResponseEntity.ok(userProfileDto);

    }




}
