package com.example.demo.mapper;

import com.example.demo.dto.UserEditProfileDto;
import com.example.demo.dto.UserProfileDto;
import com.example.demo.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

@Mapper(componentModel ="spring")
public interface UserMapper {
    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.username", target = "username")
    UserProfileDto userToUserProfileDto (User user);
    UserEditProfileDto userToUserEditProfileDto (User user);

}
