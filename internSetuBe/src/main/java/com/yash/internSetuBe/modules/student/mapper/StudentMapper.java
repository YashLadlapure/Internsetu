package com.yash.internSetuBe.modules.student.mapper;


import com.yash.internSetuBe.modules.application.entity.InternshipApplication;
import com.yash.internSetuBe.modules.internship.entity.InternshipPosting;
import com.yash.internSetuBe.modules.student.dto.request.CertificatePostRequest;
import com.yash.internSetuBe.modules.application.dto.request.InternshipApplyPostRequest;
import com.yash.internSetuBe.modules.student.dto.request.ProjectPostRequest;
import com.yash.internSetuBe.modules.student.dto.request.StudentIdentityUpdateRequest;
import com.yash.internSetuBe.modules.student.dto.response.CertificateResponse;
import com.yash.internSetuBe.modules.student.entity.Certificate;
import com.yash.internSetuBe.modules.identity.dto.response.StudentResponse;
import com.yash.internSetuBe.modules.student.dto.response.ProjectResponse;
import com.yash.internSetuBe.modules.student.dto.response.SkillResponse;
import com.yash.internSetuBe.modules.student.dto.response.SocialMediaPlatformResponse;
import com.yash.internSetuBe.modules.student.dto.response.StudentSocialLinksResponse;
import com.yash.internSetuBe.modules.student.entity.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface StudentMapper {

    // Entity -> dto (Student -> StudentResponse)
    @Mapping(target = "socials", source = "studentSocialLinks")
    StudentResponse toStudentResponse(Student student);


    @Mapping(target = "id", source = "skill.id")
    @Mapping(target = "name", source = "skill.name")
    SkillResponse toSkillResponse(StudentSkill studentSkill);

    @Mapping(target = "skill", source = "skill")
    @Mapping(target = "student", source = "student")
    @Mapping(target = "id", ignore = true)
    StudentSkill toStudentSkillEntity(Skill skill, Student student);

    @Mapping(target = "socialMediaPlatform", source = "socialMediaPlatform")
    StudentSocialLinksResponse toSocialResponse(StudentSocialLink entity);

    @Mapping(target = "student", source = "student")
    @Mapping(target = "socialMediaPlatform", source = "socialMediaPlatform")
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "link", source = "link")
    StudentSocialLink toStudentSocialLinkEntity(Student student, SocialMediaPlatform socialMediaPlatform, String link);

    ProjectResponse toProjectResponse(Project project);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "student", source = "student")
    Project toProjectEntity(ProjectPostRequest request, Student student);

    CertificateResponse toCertificateResponse(Certificate certificate);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "student", source = "student")
    Certificate toCertificateEntity(CertificatePostRequest request, Student student);

    SocialMediaPlatformResponse toPlatformDto(SocialMediaPlatform entity);

    void updateStudentFromStudentIdentityUpdateRequest(StudentIdentityUpdateRequest request, @MappingTarget Student student);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "internshipPosting", source = "internshipPosting")
    @Mapping(target = "student", source = "referenceById")
    @Mapping(target = "appliedAt", expression = "java(java.time.LocalDateTime.now())")
    @Mapping(target = "status", expression = "java(com.yash.internSetuBe.modules.application.enums.ApplicationStatus.APPLIED)")
    InternshipApplication toInternshipApplication(InternshipApplyPostRequest internshipApplyPostRequest, InternshipPosting internshipPosting, Student referenceById);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "internshipPosting", ignore = true)
    @Mapping(target = "student", ignore = true)
    @Mapping(target = "appliedAt", ignore = true)
    @Mapping(target = "status", ignore = true)
    void updateInternshipApplication(@MappingTarget InternshipApplication entity, InternshipApplyPostRequest request);
}
