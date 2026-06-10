package com.yash.internSetuBe.modules.employer.dto.response;

import com.yash.internSetuBe.modules.application.enums.ApplicationStatus;
import com.yash.internSetuBe.modules.identity.dto.response.StudentResponse;
import com.yash.internSetuBe.modules.internship.dto.response.EmployerInternshipGetResponse;
import com.yash.internSetuBe.modules.placementCell.dto.response.CollegeResponse;

import java.time.LocalDateTime;
import java.util.Map;

public record EmployerApplicationGetResponse(
    Long id,
    EmployerInternshipGetResponse internship,
    StudentResponse student,
    String studentEmail,
    LocalDateTime appliedAt,
    ApplicationStatus status,
    String coverLetter,
    String appliedWithResumeUrl,
    Map<String, String> questionResponses,
    String reviewNote,
    LocalDateTime reviewedAt
) {
}
