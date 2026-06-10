package com.yash.internSetuBe.modules.student.dto.request;

import com.yash.internSetuBe.modules.student.enums.Gender;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDate;

public record StudentIdentityUpdateRequest(
        @NotBlank(message = "prn is required")
        String prn,
        String phoneNumber,
        Gender gender,
        LocalDate dateOfBirth,
        String graduationYear,
        String course,
        String branch,
        String panel,
        String resumeLink
) {}
