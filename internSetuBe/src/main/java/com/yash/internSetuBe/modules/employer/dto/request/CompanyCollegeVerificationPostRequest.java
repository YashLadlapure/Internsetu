package com.yash.internSetuBe.modules.employer.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;


public record CompanyCollegeVerificationPostRequest(
        @NotNull(message = "College ID is required")
        Long collegeId,

        @NotBlank(message = "Verification documents URL or data is required")
        String docs
) {}