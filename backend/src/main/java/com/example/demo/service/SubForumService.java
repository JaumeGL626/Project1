package com.example.demo.service;

import com.example.demo.dto.SubForumRequest;
import com.example.demo.dto.SubForumResponse;
import com.example.demo.entity.Forum;
import com.example.demo.entity.SubForum;
import com.example.demo.entity.User;
import com.example.demo.mapper.SubForumMapper;
import com.example.demo.repository.ForumRepository;
import com.example.demo.repository.SubForumRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class SubForumService {

    private final SubForumRepository subForumRepository;
    private final ForumRepository forumRepository;
    private final SubForumMapper subForumMapper;

    public SubForumService (SubForumRepository subForumRepository, SubForumMapper subForumMapper, ForumRepository forumRepository){
        this.subForumMapper=subForumMapper;
        this.forumRepository=forumRepository;
        this.subForumRepository=subForumRepository;
    }
    @Transactional
    public SubForumResponse createSubForum(SubForumRequest request){
        SubForum subForum=new SubForum();
        subForum.setDescription(request.description());
        Forum forum= forumRepository.findById(request.forumId()).orElseThrow(()-> new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "Forum not found"
        ));

        subForum.setName(request.name());
        subForum.setSubChats(null);
        subForum.setForum(forum);
        subForumRepository.save(subForum);
        return subForumMapper.subForumToSubForumResponse(subForum);
    }
    @Transactional(readOnly=true)
    public List<SubForumResponse> getSubForumsByForumId(Long forumId) {
        List<SubForum> subForums = subForumRepository.findByForumIdOrderByNameAsc(forumId);
        return subForumMapper.listSubForumToListSubForumResponse(subForums);
    }




}
