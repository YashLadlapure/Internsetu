package com.yash.internSetuBe.modules.student.mapper;


import com.yash.internSetuBe.modules.student.dto.response.SkillResponse;
import com.yash.internSetuBe.modules.student.entity.Skill;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface SkillMapper {


    // entity -> dto (Skill -> SkillResponse)
    SkillResponse toResponse(Skill skill);
    List<SkillResponse> toResponse(List<Skill> skills);
}
