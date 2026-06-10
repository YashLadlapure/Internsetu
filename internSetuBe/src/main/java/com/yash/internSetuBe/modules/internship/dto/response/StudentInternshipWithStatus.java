package com.yash.internSetuBe.modules.internship.dto.response;

import com.yash.internSetuBe.modules.internship.entity.InternshipPosting;

public record StudentInternshipWithStatus(
        InternshipPosting internshipPosting,
        Boolean hasApplied
){ }
