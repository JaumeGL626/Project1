package com.example.demo.mapper;

import com.example.demo.dto.ChatRequest;
import com.example.demo.entity.Chat;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel ="spring")
public interface ChatMapper {
    ChatRequest chatToChatRequest(Chat chat);

    List<ChatRequest> listChatToListChatRequest(List<Chat> chatList);
}
