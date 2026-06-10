package com.yash.internSetuBe.modules.internship.dto.response;

import com.yash.internSetuBe.modules.placementCell.dto.response.CollegeResponse;
import com.yash.internSetuBe.modules.internship.enums.InternshipLocationType;
import com.yash.internSetuBe.modules.internship.enums.InternshipStatus;
import java.time.LocalDate;
import java.time.LocalDateTime;

public record EmployerInternshipGetResponse(
        Long id,
        CollegeResponse college,
        String title,
        String description,
        Double salary,
        InternshipLocationType location,
        String duration,
        LocalDate startDate,
        LocalDateTime deadline,
        InternshipStatus status
) {}

