package com.example.demo.service;

import com.example.demo.dto.MessageRequest;
import com.example.demo.dto.MessageResponse;
import com.example.demo.entity.Chat;
import com.example.demo.entity.Message;
import com.example.demo.entity.User;
import com.example.demo.mapper.MessageMapper;
import com.example.demo.repository.ChatRepository;
import com.example.demo.repository.MessageRepository;
import com.example.demo.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MessageService {

    private final UserRepository userRepository;

    private final MessageRepository messageRepository;

    private final MessageMapper messageMapper;

    private final ChatRepository chatRepository;

    public MessageService (UserRepository userRepository, MessageRepository messageRepository, MessageMapper messageMapper, ChatRepository chatRepository){
        this.userRepository=userRepository;
        this.messageMapper=messageMapper;
        this.messageRepository=messageRepository;
        this.chatRepository=chatRepository;
    }
    @Transactional
    public MessageResponse postMessage (String email, MessageRequest messageRequest, Long idChat){
        User user= userRepository.findByEmail(email).orElseThrow(()-> new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "User not found"
        ));
        Chat chat=chatRepository.findById(idChat).orElseThrow(()-> new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "Chat not found"
        ));
        Message message = new Message();
        message.setContent(messageRequest.content());
        message.setFilesUrl(messageRequest.filesUrl());
        message.setDateCreated(LocalDateTime.now());
        message.setUser(user);
        message.setChat(chat);
        messageRepository.save(message);
        return  messageMapper.messageToMessageResponse(message);

    }
    @Transactional
    public List<MessageResponse> getMessagebyChat  (String email,Long idChat){
        User user= userRepository.findByEmail(email).orElseThrow(()-> new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "User not found"
        ));

        Chat chat=chatRepository.findById(idChat).orElseThrow(()-> new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "Chat not found"
        ));

        List<Message> messageList=messageRepository.findByChatIdOrderByDateCreatedAsc(idChat);
        return messageMapper.listMessageToListMessageResonse(messageList);

    }
}
