package com.example.demo.service;

import com.example.demo.dto.ChatRequest;
import com.example.demo.dto.ChatResponse;
import com.example.demo.entity.Chat;
import com.example.demo.entity.SubForum;
import com.example.demo.entity.User;
import com.example.demo.mapper.ChatMapper;
import com.example.demo.repository.ChatRepository;
import com.example.demo.repository.SubForumRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ChatService {

    private final ChatRepository chatRepository;
    private final UserRepository userRepository;
    private final ChatMapper chatMapper;
    private  final SubForumRepository subForumRepository;

    public ChatService(ChatRepository chatRepository, UserRepository userRepository, ChatMapper chatMapper, SubForumRepository subForumRepository){
        this.userRepository=userRepository;
        this.chatMapper=chatMapper;
        this.chatRepository=chatRepository;
        this.subForumRepository=subForumRepository;
    }

    @Transactional
    public ChatResponse createChat(String email, ChatRequest request){
        User user= userRepository.findByEmail(email).orElseThrow(()-> new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "User not found"
        ));

        SubForum subForum = null;
        if (request.subForumId() != null) {
            subForum = subForumRepository.findById(request.subForumId()).orElseThrow(() ->
                    new ResponseStatusException(HttpStatus.NOT_FOUND, "SubForum not found"));
        }


        Chat chat=new Chat();
        chat.setChatType(request.chatType());
        chat.setMessages(null);
        chat.setName(request.name());


        List<User> participants = userRepository.findAllById(request.participantIds());
        if (!participants.contains(user)) {
            participants.add(user);
        }
        chat.setParticipants(participants);
        chat.setName(request.name());
        chat.setSubForum(subForum);
        return chatMapper.chatToChatResponse(chat);
    }
    @Transactional
    public void deleteChat(Long id){
        Chat chat=chatRepository.findById(id).orElseThrow(()-> new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "Chat not found"
        ));
        chatRepository.delete(chat);
    }

    @Transactional
    public List<ChatResponse> getAllMyChats(String email){
        User user= userRepository.findByEmail(email).orElseThrow(()-> new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "User not found"
        ));
        List <Chat> chatList=chatRepository.findByParticipantsId(user.getId());
        return  chatMapper.listChatToListChatResponse(chatList);
    }

    @Transactional
    public List<ChatResponse> getAllChatsBySubForumId(Long id){
        SubForum subForum= subForumRepository.findById(id).orElseThrow(()-> new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "SubForum not found"
        ));
        List <Chat> chatList=chatRepository.findBySubForumIdOrderByNameAsc(id);
        return  chatMapper.listChatToListChatResponse(chatList);
    }



}
