package com.yash.internSetuBe.modules.placementCell.dto.response;

import com.yash.internSetuBe.modules.employer.dto.response.CompanyResponse;
import com.yash.internSetuBe.modules.employer.enums.CompanyCollegeVerificationStatus;

public record TpoCompanyCollegeVerificationResponse(
        CompanyResponse company,
        String docs,
        CompanyCollegeVerificationStatus status,
        String text
) {}
