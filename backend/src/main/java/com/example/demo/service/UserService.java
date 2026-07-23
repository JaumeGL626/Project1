package com.example.demo.service;

import com.example.demo.dto.UserEditProfileDto;
import com.example.demo.dto.UserProfileDto;
import com.example.demo.entity.User;
import com.example.demo.mapper.UserMapper;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.JwtService;
import org.hibernate.service.spi.ServiceException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

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
        User user= userRepository.findById(userId).orElseThrow(()-> new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "User not found"
        ));
        return userMapper.userToUserProfileDto(user);
    }

    @Transactional(readOnly = true)
    public UserProfileDto getProfile(String email){
        User user= userRepository.findByEmail(email).orElseThrow(()-> new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "User not found"
        ));
        return userMapper.userToUserProfileDto(user);


    }

    @Transactional
    public UserProfileDto editProfile(String email, UserEditProfileDto request){
        User user= userRepository.findByEmail(email).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,
                "User not found"
        ));

        if(request.description()!=null){
            user.setDescription(request.description());
        }
        if (request.username()!=null) {
            user.setUsername(request.username());
        }
        return userMapper.userToUserProfileDto(user);

    }

    @Transactional
    public UserProfileDto setUserProfilePicture(String email,String profilePictureUrl){
        User user= userRepository.findByEmail(email).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,
                "User not found"
        ));
        user.setProfilePicture(profilePictureUrl);
        return userMapper.userToUserProfileDto(user);
    }


}
