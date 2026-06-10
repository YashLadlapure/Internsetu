package com.yash.internSetuBe.modules.employer.dto.response;

import com.yash.internSetuBe.modules.employer.enums.CompanyCollegeVerificationStatus;
import com.yash.internSetuBe.modules.placementCell.dto.response.CollegeResponse;

public record EmployerCollegeGetResponse(
        CollegeResponse college,
        String docs,
        CompanyCollegeVerificationStatus status,
        String text
) {}
