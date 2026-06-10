package com.yash.internSetuBe.modules.internship.dto.request;

import com.yash.internSetuBe.modules.internship.enums.InternshipLocationType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public record EmployerInternshipPostRequest(
        @NotNull(message = "college is required")
        Long collegeId,

        @NotBlank(message = "title is required")
        String title,

        String description,

        Double salary,

        InternshipLocationType location,

        String duration,

        LocalDate startDate,

        LocalDateTime deadline,

        List<Long> requiredSkills,

        List<String> applicationQuestions


) {}