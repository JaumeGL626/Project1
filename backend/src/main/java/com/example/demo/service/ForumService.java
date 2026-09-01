package com.example.demo.service;

import com.example.demo.dto.ForumRequest;
import com.example.demo.dto.ForumResponse;
import com.example.demo.entity.Forum;
import com.example.demo.entity.User;
import com.example.demo.mapper.ForumMapper;
import com.example.demo.repository.ForumRepository;
import com.example.demo.repository.SubForumRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ForumService {
    private final ForumMapper forumMapper;
    private final ForumRepository forumRepository;
    private final SubForumRepository subForumRepository;
    private final UserRepository userRepository;



    public ForumService(ForumRepository forumRepository, SubForumRepository subForumRepository, ForumMapper forumMapper, UserRepository userRepository){
        this.forumRepository=forumRepository;
        this.subForumRepository=subForumRepository;
        this.forumMapper=forumMapper;
        this.userRepository=userRepository;
    }
    @Transactional
    public ForumResponse createForum(ForumRequest request, String email){

        User user= userRepository.findByEmail(email).orElseThrow(()-> new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "User not found"
        ));

        Forum forum=new Forum();
        forum.setDescription(request.description());
        forum.setName(request.name());
        forum.setSubForums(null);
        forum.setCreatedAt(LocalDateTime.now());
        forum.setCreatedBy(user);
        forumRepository.save(forum);
        return forumMapper.forumToForumResponse(forum);
    }
    @Transactional(readOnly = true)
    public List<ForumResponse> getAllForums() {
        List<Forum> forums = forumRepository.findAllByOrderByNameAsc();
        return forumMapper.listForumToListForumResponse(forums);
    }
    @Transactional(readOnly = true)
    public ForumResponse getForumById(Long id){
        Forum forum=forumRepository.findById(id).orElseThrow(()-> new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "Forum not found"
        ));
        return forumMapper.forumToForumResponse(forum);
    }
}
