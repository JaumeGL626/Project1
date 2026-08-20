package com.example.demo.mapper;

import com.example.demo.dto.ForumResponse;
import com.example.demo.entity.Forum;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel ="spring",uses = {SubForumMapper.class})
public interface ForumMapper {
    ForumResponse forumToForumResponse(Forum forum);
    List<ForumResponse> listForumToListForumResponse(List<Forum> forumList);

}
