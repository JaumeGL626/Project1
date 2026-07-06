package com.example.demo.service;

import com.example.demo.dto.UserProfileDto;
import com.example.demo.entity.User;
import com.example.demo.mapper.UserMapper;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.JwtService;
import org.hibernate.service.spi.ServiceException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {


    private final UserRepository userRepository;
    private final UserMapper userMapper;


    public UserService (UserRepository userRepository,UserMapper userMapper){
        this.userMapper=userMapper;
        this.userRepository=userRepository;
    }
    @Transactional (readOnly = true)
    public UserProfileDto getPublicProfile (Long userId){
        User user= userRepository.findById(userId).orElseThrow(()-> new ServiceException("Usuari inexistent"));
        return userMapper.userToUserProfileDto(user);
    }

    @Transactional(readOnly = true)
    public UserProfileDto getProfile(String email){
        User user= userRepository.findByEmail(email).orElseThrow(()-> new RuntimeException("usari inexistent"));
        return userMapper.userToUserProfileDto(user);


    }


}
