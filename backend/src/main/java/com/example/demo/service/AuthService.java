package com.example.demo.service;

import com.example.demo.dto.LoginRequest;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService (UserRepository userRepository, PasswordEncoder passwordEncoder){
        this.userRepository=userRepository;
        this.passwordEncoder=passwordEncoder;
    }

    @Transactional
    public LoginResponse login (LoginRequest request){
        User user= userRepository.findByEmail(request.email())
                .orElseThrow(()-> new RuntimeException("Email inexistent"));
        if( passwordEncoder.matches( request.password(),user.getPassword())){
            throw new RuntimeException("Contrasenya Erronea");
        }
        return new LoginResponse(
                user.getUsername(),
                user.getEmail(),
                user.getRole()
        );
    }
}
