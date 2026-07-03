package com.example.demo.service;

import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.LoginResponse;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.CustomUserDetails;
import com.example.demo.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;


    public AuthService (UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService){
        this.userRepository=userRepository;
        this.passwordEncoder=passwordEncoder;
        this.jwtService=jwtService;
    }

    @Transactional (readOnly = true)
    public LoginResponse login (LoginRequest request){
        User user= userRepository.findByEmail(request.email())
                .orElseThrow(()-> new RuntimeException("Email inexistent"));
        if(! passwordEncoder.matches( request.password(),user.getPassword())){
            throw new RuntimeException("Contrasenya Erronea");

        }
        String token = jwtService.generateToken(new CustomUserDetails(user));
        return new LoginResponse(
                user.getUsername(),
                token,
                user.getEmail(),
                user.getRole()
        );
    }
}
