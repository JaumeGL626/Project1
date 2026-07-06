package com.example.demo.service;

import com.example.demo.dto.UserProfileDto;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.JwtService;
import org.hibernate.service.spi.ServiceException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    private final JwtService jwtService;
    private final UserRepository userRepository;


    public UserService (UserRepository userRepository, JwtService jwtService){
        this.jwtService=jwtService;
        this.userRepository=userRepository;
    }
    @Transactional (readOnly = true)
    public UserProfileDto getPublicProfile (Long userId){
        User user= userRepository.findById(userId).orElseThrow(()-> new ServiceException("Usuari inexistent"));
        return userMapper.userToUserProfileDto(user);
    }

    public UserProfileDto getProfile(String token){
        String username =jwtService.extractUsername(token);
        User user= userRepository.findByEmail(username).orElseThrow(()-> new RuntimeException("usari inexistent"));
        return new userMapper.userToUserProfileDto(user);


    }


}
