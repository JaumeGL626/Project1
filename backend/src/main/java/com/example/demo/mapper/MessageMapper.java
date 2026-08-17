package com.example.demo.mapper;


import com.example.demo.dto.MessageRequest;
import com.example.demo.dto.MessageResponse;
import com.example.demo.entity.Message;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel ="spring")
public interface MessageMapper {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.username", target = "userName")
    @Mapping(source = "user.profilePicture", target = "userProfilePhoto")
    @Mapping(source = "chat.id", target = "chatId")
    MessageResponse messageToMessageResponse(Message message);

    List<MessageResponse> listMessageToListMessageResonse(List<Message> messageList);
}
