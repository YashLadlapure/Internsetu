package com.yash.internSetuBe.modules.placementCell.dto.response;

import com.yash.internSetuBe.modules.internship.enums.InternshipLocationType;
import com.yash.internSetuBe.modules.internship.enums.InternshipStatus;
import com.yash.internSetuBe.modules.employer.dto.response.CompanyResponse;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record TpoInternshipGetResponse(
        Long id,
        CompanyResponse company,
        String title,
        String description,
        Double salary,
        InternshipLocationType location,
        String duration,
        LocalDate startDate,
        LocalDateTime deadline,
        InternshipStatus status
) {}
