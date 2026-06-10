package com.yash.internSetuBe.modules.student.service;


import com.yash.internSetuBe.modules.application.dto.response.StudentApplicationGetResponse;
import com.yash.internSetuBe.modules.application.entity.InternshipApplication;
import com.yash.internSetuBe.modules.application.repo.InternshipApplicationRepo;
import com.yash.internSetuBe.modules.internship.dto.response.StudentInternshipGetResponse;
import com.yash.internSetuBe.modules.internship.dto.response.StudentInternshipWithStatus;
import com.yash.internSetuBe.modules.internship.entity.InternshipPosting;
import com.yash.internSetuBe.modules.internship.mapper.InternshipMapper;
import com.yash.internSetuBe.modules.internship.mapper.InternshipPostingRepo;
import com.yash.internSetuBe.modules.student.dto.request.CertificatePostRequest;
import com.yash.internSetuBe.modules.application.dto.request.InternshipApplyPostRequest;
import com.yash.internSetuBe.modules.student.dto.request.ProjectPostRequest;
import com.yash.internSetuBe.modules.student.dto.request.StudentIdentityUpdateRequest;
import com.yash.internSetuBe.modules.student.dto.response.*;
import com.yash.internSetuBe.modules.internship.enums.InternshipStatus;
import com.yash.internSetuBe.modules.identity.service.UserService;
import com.yash.internSetuBe.modules.student.entity.*;
import com.yash.internSetuBe.modules.student.mapper.StudentMapper;
import com.yash.internSetuBe.modules.student.repo.*;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentService {

    // services
    private final UserService userService;

    // repos
    private final StudentRepo studentRepo;
    private final SkillRepo skillRepo;
    private final StudentSkillRepo studentSkillRepo;
    private final StudentSocialLinksRepo studentSocialLinksRepo;
    private final SocialMediaPlatformRepo socialMediaPlatformRepo;
    private final ProjectRepo projectRepo;
    private final CertificateRepo certificateRepo;
    private final InternshipPostingRepo internshipPostingRepo;
    private final InternshipApplicationRepo internshipApplicationRepo;

    // mappers
    private final StudentMapper studentMapper;
    private final InternshipMapper internshipMapper;

    public void updateProfileIdentity(StudentIdentityUpdateRequest studentIdentityUpdateRequest){

        Long userId = userService.getCurrentUserId();
        Student student = studentRepo.findById(userId).orElseThrow(() -> new EntityNotFoundException("student not found"));

        studentMapper.updateStudentFromStudentIdentityUpdateRequest(studentIdentityUpdateRequest, student);
        studentRepo.save(student);

    }
     public void addSkill(Long skillId) {
        Long userId = userService.getCurrentUserId();

        if(!skillRepo.existsById(skillId)) {
            throw new EntityNotFoundException("skill not found");
        }

        studentSkillRepo.save(
                studentMapper.toStudentSkillEntity(
                        skillRepo.getReferenceById(skillId),
                        studentRepo.getReferenceById(userId)
                )
        );

     }

     public void removeSkill(Long studentSkillId) {
         Long userId = userService.getCurrentUserId();
         studentSkillRepo.deleteByIdAndStudent(studentSkillId, studentRepo.getReferenceById(userId));
     }

     public StudentSocialLinksResponse addSocial(Long id, String link) {
        Long userId = userService.getCurrentUserId();

        SocialMediaPlatform socialMediaPlatform = socialMediaPlatformRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Social Media Platform not found"));

         StudentSocialLink studentSocialLink = studentSocialLinksRepo.save(
            studentMapper.toStudentSocialLinkEntity(
                    studentRepo.getReferenceById(userId),
                    socialMediaPlatform,
                    link
            )
        );

        return studentMapper.toSocialResponse(studentSocialLink);
     }


     public void removeSocial(Long id) {
        Long userId = userService.getCurrentUserId();
        studentSocialLinksRepo.deleteByIdAndStudent(id, studentRepo.getReferenceById(userId));
     }

    public void updateSocial(Long id, String link) {
        Long userId = userService.getCurrentUserId();
        StudentSocialLink studentSocialLink =  studentSocialLinksRepo.findByIdAndStudent(id, studentRepo.getReferenceById(userId))
                .orElseThrow(()-> new EntityNotFoundException("cant find link"));

        studentSocialLink.setLink(link);
        studentSocialLinksRepo.save(studentSocialLink);
    }

    public void updateAbout(String about) {
        Long userId = userService.getCurrentUserId();
        studentRepo.updateAboutById(about, userId);
    }

    public ProjectResponse addProject(@Valid ProjectPostRequest projectPostRequest) {
        Long userId = userService.getCurrentUserId();
        return studentMapper.toProjectResponse(
                projectRepo.save(
                        studentMapper.toProjectEntity(
                                projectPostRequest,
                                studentRepo.getReferenceById(userId)
                        )
                )
        );
    }

    @Transactional
    public void deleteProject(Long id) {
        Long userId = userService.getCurrentUserId();
        projectRepo.deleteByIdAndStudent(id, studentRepo.getReferenceById(userId));
    }

    public CertificateResponse addCertificate(@Valid CertificatePostRequest certificatePostRequest) {
        Long userId = userService.getCurrentUserId();

        Certificate certificate = certificateRepo.save(
                studentMapper.toCertificateEntity(
                        certificatePostRequest,
                        studentRepo.getReferenceById(userId)
                )
        );
        return studentMapper.toCertificateResponse(certificate);
    }

    @Transactional
    public void deleteCertificate(Long id){
        Long userId = userService.getCurrentUserId();
        certificateRepo.deleteByIdAndStudent(id, studentRepo.getReferenceById(userId));
    }

    public List<StudentInternshipGetResponse> getInternships() {
        Long userId = userService.getCurrentUserId();
        List<StudentInternshipWithStatus> internshipWithStatuses = internshipPostingRepo.findByStudentUserIdAndStatus(userId, InternshipStatus.LIVE);

        return internshipMapper.toStudentInternshipGetResponseList(internshipWithStatuses);
    }

    public void applyForInternship(InternshipApplyPostRequest internshipApplyPostRequest) {
        Long userId = userService.getCurrentUserId();

        InternshipPosting internshipPosting = internshipPostingRepo.findById(internshipApplyPostRequest.internshipId())
                .orElseThrow(() -> new EntityNotFoundException("Internship posting not found"));

        if(internshipApplicationRepo.existsByInternshipPostingAndStudent(
                internshipPosting,
                studentRepo.getReferenceById(userId)
        )) {
            throw new IllegalStateException("You have already applied for this internship");
        }

        InternshipApplication internshipApplication = studentMapper.toInternshipApplication(
                internshipApplyPostRequest,
                internshipPosting,
                studentRepo.getReferenceById(userId)
        );
        internshipApplicationRepo.save(internshipApplication);
    }

    public List<StudentApplicationGetResponse> getApplications() {
        Long userId = userService.getCurrentUserId();
        List<InternshipApplication> internshipApplications = internshipApplicationRepo.findByStudentUserId(userId);
        return internshipMapper.toStudentApplicationGetResponseList(internshipApplications);

    }

    @Transactional
    public StudentApplicationGetResponse updateApplication(Long id, InternshipApplyPostRequest internshipApplyPostRequest) {
        Long userId = userService.getCurrentUserId();
        InternshipApplication internshipApplication = internshipApplicationRepo.findByIdAndStudent(id, studentRepo.getReferenceById(userId))
                .orElseThrow(() -> new EntityNotFoundException("Internship application not found"));
        studentMapper.updateInternshipApplication(internshipApplication, internshipApplyPostRequest);
        return internshipMapper.toStudentApplicationGetResponse(internshipApplication);
    }

}
