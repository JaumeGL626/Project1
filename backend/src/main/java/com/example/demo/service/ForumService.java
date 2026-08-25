package com.example.demo.service;

import com.example.demo.dto.ForumRequest;
import com.example.demo.dto.ForumResponse;
import com.example.demo.entity.Forum;
import com.example.demo.mapper.ForumMapper;
import com.example.demo.repository.ForumRepository;
import com.example.demo.repository.SubForumRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ForumService {
    private final ForumMapper forumMapper;
    private final ForumRepository forumRepository;
    private final SubForumRepository subForumRepository;



    public ForumService(ForumRepository forumRepository, SubForumRepository subForumRepository, ForumMapper forumMapper){
        this.forumRepository=forumRepository;
        this.subForumRepository=subForumRepository;
        this.forumMapper=forumMapper;
    }
    @Transactional
    public ForumResponse createForum(ForumRequest request){
        Forum forum=new Forum();
        forum.setDescription(request.description());
        forum.setName(request.name());
        forum.setSubForums(null);
        forumRepository.save(forum);
        return forumMapper.forumToForumResponse(forum);
    }
    @Transactional(readOnly = true)
    public List<ForumResponse> getAllForums() {
        List<Forum> forums = forumRepository.findAllByOrderByNameAsc();
        return forumMapper.listForumToListForumResponse(forums);
    }
}
