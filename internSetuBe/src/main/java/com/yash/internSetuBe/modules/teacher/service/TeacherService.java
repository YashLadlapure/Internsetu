package com.yash.internSetuBe.modules.teacher.service;


import com.yash.internSetuBe.modules.internship.entity.InternshipPosting;
import com.yash.internSetuBe.modules.internship.enums.InternshipStatus;
import com.yash.internSetuBe.modules.internship.mapper.InternshipMapper;
import com.yash.internSetuBe.modules.internship.mapper.InternshipPostingRepo;
import com.yash.internSetuBe.modules.application.entity.InternshipApplication;
import com.yash.internSetuBe.modules.application.repo.InternshipApplicationRepo;
import com.yash.internSetuBe.modules.teacher.dto.request.TeacherIdentityPutRequest;
import com.yash.internSetuBe.modules.teacher.dto.response.TeacherApplicationGetResponse;
import com.yash.internSetuBe.modules.internship.dto.response.TeacherInternshipGetResponse;
import com.yash.internSetuBe.modules.teacher.entity.Teacher;
import com.yash.internSetuBe.modules.identity.service.UserService;
import com.yash.internSetuBe.modules.teacher.repo.TeacherRepo;
import com.yash.internSetuBe.modules.teacher.mapper.TeacherMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TeacherService {

    private final TeacherRepo teacherRepo;
    private final InternshipPostingRepo internshipPostingRepo;
    private final InternshipApplicationRepo internshipApplicationRepo;

    private final UserService userService;

    private final TeacherMapper teacherMapper;
    private final InternshipMapper internshipMapper;


    public void updateIdentity(TeacherIdentityPutRequest teacherIdentityPutRequest) {
        Long userId = userService.getCurrentUserId();

        Teacher teacher = teacherRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("Teacher not found with id: " + userId));

        teacherMapper.updateTeacherFromTeacherIdentityPutRequest(teacherIdentityPutRequest, teacher);
        teacherRepo.save(teacher);
    }

    public List<TeacherInternshipGetResponse> getAllInternships() {
        Long userId = userService.getCurrentUserId();
        List<InternshipPosting> internshipPostings = internshipPostingRepo.findByTeacherIdAndStatus(userId, InternshipStatus.LIVE);
        return internshipMapper.toTeacherInternshipGetResponseList(internshipPostings);
    }

    public List<TeacherApplicationGetResponse> getAllApplications() {
        Long userId = userService.getCurrentUserId();
        List<InternshipApplication> applications = internshipApplicationRepo.findByTeacherUserId(userId);
        return internshipMapper.toTeacherApplicationGetResponseList(applications);
    }


    @Transactional
    public TeacherApplicationGetResponse approveApplication(Long id, String reviewNote) {
        Long userId = userService.getCurrentUserId();
        InternshipApplication application = internshipApplicationRepo.findByIdAndTeacherUserId(id, userId);
        application.setIsApproved(true);
        application.setReviewNote(reviewNote);
        application.setAppliedAt(LocalDateTime.now());
        return internshipMapper.toTeacherApplicationGetResponse(internshipApplicationRepo.save(application));
    }

    public TeacherApplicationGetResponse disapproveApplication(Long id, String reviewNote) {
        Long userId = userService.getCurrentUserId();
        InternshipApplication application = internshipApplicationRepo.findByIdAndTeacherUserId(id, userId);
        application.setIsApproved(false);
        application.setReviewNote(reviewNote);
        return internshipMapper.toTeacherApplicationGetResponse(internshipApplicationRepo.save(application));
    }
}
