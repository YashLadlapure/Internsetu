package com.yash.internSetuBe.modules.student.service;


import com.yash.internSetuBe.modules.student.dto.response.SkillResponse;
import com.yash.internSetuBe.modules.student.repo.SkillRepo;
import com.yash.internSetuBe.modules.student.mapper.SkillMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SkillService {

    private final SkillRepo skillRepo;

    private final SkillMapper skillMapper;

    public List<SkillResponse> getSkills() {
        return skillMapper.toResponse(skillRepo.findAll());
    }

}
