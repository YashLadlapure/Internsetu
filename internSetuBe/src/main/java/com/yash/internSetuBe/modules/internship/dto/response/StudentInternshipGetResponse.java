package com.yash.internSetuBe.modules.internship.dto.response;

import com.yash.internSetuBe.modules.employer.dto.response.CompanyResponse;
import com.yash.internSetuBe.modules.internship.enums.InternshipLocationType;
import com.yash.internSetuBe.modules.student.dto.response.SkillResponse;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public record StudentInternshipGetResponse(
        Long id,
        CompanyResponse company,
        String title,
        String description,
        Double salary,
        InternshipLocationType location,
        String duration,
        LocalDate startDate,
        LocalDateTime deadline,
        List<SkillResponse> requiredSkills,
        List<String> applicationQuestions,
        Boolean hasApplied
) {}
