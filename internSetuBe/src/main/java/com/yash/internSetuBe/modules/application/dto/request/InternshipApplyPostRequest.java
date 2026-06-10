package com.yash.internSetuBe.modules.application.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.Map;

public record InternshipApplyPostRequest(
        @NotNull(message = "Internship ID cannot be null")
        Long internshipId,
        @NotBlank(message = "Cover letter cannot be blank")
        String coverLetter,
        @NotBlank(message = "Resume URL cannot be blank")
        String appliedWithResumeUrl,
        Map<String, String> questionResponses
){}

