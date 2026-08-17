package com.example.demo.mapper;


import com.example.demo.dto.SubForumResponse;
import com.example.demo.entity.SubForum;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel ="spring", uses = {ChatMapper.class})
public interface SubForumMapper {
    SubForumResponse subForumToSubForumResponse(SubForum subForum);

    List<SubForumResponse> listSubForumToListSubForumResponse(List<SubForum> subForumList);


}
