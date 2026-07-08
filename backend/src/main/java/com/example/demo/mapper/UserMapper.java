package com.example.demo.mapper;

import com.example.demo.dto.UserProfileDto;
import com.example.demo.entity.User;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Mapper(componentModel ="spring")
public interface UserMapper {
    UserProfileDto userToUserProfileDto (User user);

}
