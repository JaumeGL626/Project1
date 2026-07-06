package com.example.demo.service;

import com.example.demo.dto.UserProfileDto;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import org.hibernate.service.spi.ServiceException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    private final UserRepository userRepository;


    public UserService (UserRepository userRepository){

        this.userRepository=userRepository;
    }
    @Transactional (readOnly = true)
    public UserProfileDto getProfile (Long userId){
        User user= userRepository.findById(userId).orElseThrow(()-> new ServiceException("Usuari inexistent"));
        return new UserProfileDto(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getDescription(),
                user.getRole()
        );

    }


}
