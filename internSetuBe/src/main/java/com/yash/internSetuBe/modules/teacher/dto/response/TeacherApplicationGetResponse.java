package com.yash.internSetuBe.modules.teacher.dto.response;

import com.yash.internSetuBe.modules.identity.dto.response.StudentResponse;
import com.yash.internSetuBe.modules.placementCell.dto.response.TpoInternshipGetResponse;
import com.yash.internSetuBe.modules.application.enums.ApplicationStatus;

import java.time.LocalDateTime;
import java.util.Map;

public record TeacherApplicationGetResponse(
        Long id,
        TpoInternshipGetResponse internship,
        StudentResponse student,
        String studentEmail,
        LocalDateTime appliedAt,
        ApplicationStatus status,
        String coverLetter,
        String appliedWithResumeUrl,
        Map<String, String> questionResponses,
        Boolean isApproved,
        String reviewNote,
        LocalDateTime reviewedAt
) {
}
