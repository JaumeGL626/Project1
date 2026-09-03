package com.example.demo.mapper;

import com.example.demo.dto.ChatRequest;
import com.example.demo.dto.ChatResponse;
import com.example.demo.entity.Chat;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel ="spring",uses = {UserMapper.class, MessageMapper.class})
public interface ChatMapper {
    @Mapping(source = "subForum.id", target = "subForumId")
    @Mapping(source = "messages", target = "listMessages")
    ChatResponse chatToChatResponse(Chat chat);

    List<ChatResponse> listChatToListChatResponse(List<Chat> chatList);

}
