package com.example.demo.mapper;


import com.example.demo.dto.MessageRequest;
import com.example.demo.entity.Message;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel ="spring")
public interface MessageMapper {

    MessageRequest messageToMessageRequest(Message message);

    List<MessageRequest> listMessageToListMessageRequest(List<Message> messageList);
}
