package com.yash.internSetuBe.modules.identity.dto.response;

import com.yash.internSetuBe.modules.student.dto.response.CertificateResponse;
import com.yash.internSetuBe.modules.student.dto.response.ProjectResponse;
import com.yash.internSetuBe.modules.student.dto.response.SkillResponse;
import com.yash.internSetuBe.modules.student.dto.response.StudentSocialLinksResponse;

import java.time.LocalDate;
import java.util.List;

public record StudentResponse(
        Long id,
        String prn,
        String phoneNumber,
        String gender,
        LocalDate dateOfBirth,
        String graduationYear,
        String course,
        String branch,
        String panel,
        String about,
        String resumeLink,
        List<SkillResponse> skills,
        List<ProjectResponse> projects,
        List<CertificateResponse> certificates,
        List<StudentSocialLinksResponse> socials
) implements UserProfile {}
