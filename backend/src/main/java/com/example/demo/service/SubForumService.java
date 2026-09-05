package com.example.demo.service;

import com.example.demo.dto.SubForumRequest;
import com.example.demo.dto.SubForumResponse;
import com.example.demo.entity.Forum;
import com.example.demo.entity.SubForum;
import com.example.demo.entity.User;
import com.example.demo.mapper.SubForumMapper;
import com.example.demo.repository.ForumRepository;
import com.example.demo.repository.SubForumRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@Service
public class SubForumService {

    private final SubForumRepository subForumRepository;
    private final ForumRepository forumRepository;
    private final SubForumMapper subForumMapper;
    private final UserRepository userRepository;

    public SubForumService (SubForumRepository subForumRepository, SubForumMapper subForumMapper, ForumRepository forumRepository, UserRepository userRepository){
        this.subForumMapper=subForumMapper;
        this.forumRepository=forumRepository;
        this.subForumRepository=subForumRepository;
        this.userRepository=userRepository;
    }

    @Transactional(readOnly=true)
    public List<SubForumResponse> getSubForumsByForumId(Long forumId) {
        List<SubForum> subForums = subForumRepository.findByForumIdOrderByNameAsc(forumId);
        return subForumMapper.listSubForumToListSubForumResponse(subForums);
    }
    @Transactional
    public SubForumResponse editSubForum(Long id, SubForumRequest request){

        SubForum subForum= subForumRepository.findById(id).orElseThrow(()-> new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "SubFOrum not found"
        ));
        subForum.setDescription(request.description());
        subForum.setName(request.name());
        return subForumMapper.subForumToSubForumResponse(subForum);
    }
    @Transactional
    public SubForumResponse addSubForumToForum(Long forumId, SubForumRequest request, String email){
        Forum forum= forumRepository.findById(forumId).orElseThrow(()-> new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "Forum not found"
        ));
        User user= userRepository.findByEmail(email).orElseThrow(()-> new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "User not found"
        ));
        SubForum subForum= new SubForum();
        subForum.setName(request.name());
        subForum.setDescription(request.description());
        subForum.setCreatedBy(user);
        subForum.setSubChats(new ArrayList<>());
        subForum.setForum(forum);
        subForumRepository.save(subForum);
        return subForumMapper.subForumToSubForumResponse(subForum);

    }




}
