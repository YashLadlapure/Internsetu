package com.yash.internSetuBe.modules.application.dto.response;

import com.yash.internSetuBe.modules.internship.dto.response.StudentInternshipGetResponse;
import com.yash.internSetuBe.modules.application.enums.ApplicationStatus;


import java.time.LocalDateTime;
import java.util.Map;

public record StudentApplicationGetResponse(
    Long id,
    StudentInternshipGetResponse internshipPosting,
    LocalDateTime appliedAt,
    ApplicationStatus status,
    String coverLetter,
    String appliedWithResumeUrl, // snapshot of resume at the time of application
    Map<String, String> questionResponses,

    //  teacher review

    Boolean isApproved,
    Long approvedByTeacherId,
    String approvedByTeacherEmail,
    String reviewNote,
    LocalDateTime reviewedAt
) {}