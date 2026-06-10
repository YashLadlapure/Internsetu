package com.yash.internSetuBe.modules.placementCell.dto.request;

import com.yash.internSetuBe.modules.employer.enums.CompanyCollegeVerificationStatus;
import jakarta.validation.constraints.NotNull;


public record CollegeCompanyVerifyPostRequest(
        @NotNull(message = "Verification status is required")
        CompanyCollegeVerificationStatus status,

        String text
) {}