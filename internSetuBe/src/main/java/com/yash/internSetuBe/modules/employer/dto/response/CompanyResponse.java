package com.yash.internSetuBe.modules.employer.dto.response;

import com.yash.internSetuBe.modules.employer.enums.IndustryType;

public record CompanyResponse(
        Long id,
        String name,
        String websiteUrl,
        String location,
        String description,
        IndustryType industryType,
        Boolean isVerified,
        String hrEmail,
        String linkedinProfile
) {}
