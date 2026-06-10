package com.yash.internSetuBe.modules.employer.service;


import com.yash.internSetuBe.modules.application.entity.InternshipApplication;
import com.yash.internSetuBe.modules.application.enums.ApplicationStatus;
import com.yash.internSetuBe.modules.application.repo.InternshipApplicationRepo;
import com.yash.internSetuBe.modules.internship.dto.request.EmployerInternshipPostRequest;
import com.yash.internSetuBe.modules.employer.dto.response.EmployerApplicationGetResponse;
import com.yash.internSetuBe.modules.employer.dto.response.EmployerCollegeGetResponse;
import com.yash.internSetuBe.modules.internship.entity.InternshipPosting;
import com.yash.internSetuBe.modules.employer.enums.CompanyCollegeVerificationStatus;
import com.yash.internSetuBe.modules.employer.mapper.CompanyCollegeVerificationMapper;
import com.yash.internSetuBe.modules.internship.mapper.InternshipMapper;
import com.yash.internSetuBe.modules.employer.repo.CompanyCollegeVerificationRepo;
import com.yash.internSetuBe.modules.employer.mapper.EmployerMapper;
import com.yash.internSetuBe.modules.employer.repo.CompanyRepo;
import com.yash.internSetuBe.modules.internship.dto.response.EmployerInternshipGetResponse;
import com.yash.internSetuBe.modules.employer.entity.CompanyCollegeVerification;
import com.yash.internSetuBe.modules.identity.service.UserService;
import com.yash.internSetuBe.modules.placementCell.entity.College;
import com.yash.internSetuBe.modules.placementCell.repo.CollegeRepo;
import com.yash.internSetuBe.modules.internship.mapper.InternshipPostingRepo;
import com.yash.internSetuBe.modules.student.entity.Skill;
import com.yash.internSetuBe.modules.student.repo.SkillRepo;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployerService {

    private final UserService userService;

    private final InternshipPostingRepo internshipPostingRepo;
    private final CollegeRepo collegeRepo;
    private final CompanyRepo companyRepo;
    private final CompanyCollegeVerificationRepo companyCollegeVerificationRepo;
    private final SkillRepo skillRepo;
    private final InternshipApplicationRepo internshipApplicationRepo;


    private final EmployerMapper employerMapper;
    private final InternshipMapper internshipMapper;
    private final CompanyCollegeVerificationMapper companyCollegeVerificationMapper;


    public List<EmployerCollegeGetResponse> getColleges() {
        Long userId =  userService.getCurrentUserId();
        List<CompanyCollegeVerification> companyCollegeVerifications = companyCollegeVerificationRepo.findByEmployerUserId(userId, CompanyCollegeVerificationStatus.APPROVED);
        return companyCollegeVerificationMapper.toEmployerCollegeGetResponseList(companyCollegeVerifications);
    }

    public EmployerInternshipGetResponse postInternship(EmployerInternshipPostRequest employerInternshipPostRequest) {
        Long userId = userService.getCurrentUserId();

        College college = collegeRepo.findById(employerInternshipPostRequest.collegeId())
                .orElseThrow(() -> new EntityNotFoundException("college not found"));

        Long companyId = companyRepo.findIdByUserId(userId)
                .orElseThrow(()-> new EntityNotFoundException("company not found"));

        List<Skill> requiredSkills = skillRepo.findAllById(employerInternshipPostRequest.requiredSkills());

        InternshipPosting internshipPosting = internshipPostingRepo.save(
                internshipMapper.toInternshipPosting(
                        employerInternshipPostRequest,
                        college,
                        companyRepo.getReferenceById(companyId),
                        requiredSkills
                )
        );
        return internshipMapper.toEmployerInternshipGetResponse(internshipPosting);
    }

    public List<EmployerInternshipGetResponse> getInternships() {
        Long userId = userService.getCurrentUserId();
        List<InternshipPosting> internshipPostings = internshipPostingRepo.findByEmployerUserId(userId);
        return internshipMapper.toEmployerInternshipGetResponseList(internshipPostings);
    }

    public List<EmployerApplicationGetResponse> getApplications() {
        Long userId = userService.getCurrentUserId();
        List<InternshipApplication> applications = internshipApplicationRepo.findByEmployerUserIdAndIsApproved(userId, true);
        return internshipMapper.toEmployerApplicationGetResponseList(applications);

    }


    @Transactional
    public void updateApplicationStatus(Long applicationId, ApplicationStatus status) {
        Long userId = userService.getCurrentUserId();
        InternshipApplication application = internshipApplicationRepo.findByIdAndEmployerUserId(applicationId, userId)
                .orElseThrow(() -> new EntityNotFoundException("Application not found"));
        application.setStatus(status);
        return;
    }
}
