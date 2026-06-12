package com.yash.internSetuBe.modules.interview.service;

import com.yash.internSetuBe.modules.identity.service.UserService;
import com.yash.internSetuBe.modules.application.entity.InternshipApplication;
import com.yash.internSetuBe.modules.application.repo.InternshipApplicationRepo;
import com.yash.internSetuBe.modules.employer.repo.EmployerRepo;
import com.yash.internSetuBe.modules.interview.dto.request.EmployerInterviewScheduleRequest;
import com.yash.internSetuBe.modules.interview.dto.response.EmployerInterviewScheduleResponse;
import com.yash.internSetuBe.modules.interview.entity.InterviewSchedule;
import com.yash.internSetuBe.modules.interview.enums.ScheduleStatus;
import com.yash.internSetuBe.modules.interview.mapper.InterviewScheduleMapper;
import com.yash.internSetuBe.modules.interview.repo.InterviewScheduleRepo;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class InterviewScheduleService {

    private final UserService userService;

    private final InterviewScheduleRepo interviewScheduleRepo;
    private final InternshipApplicationRepo internshipApplicationRepo;
    private final EmployerRepo employerRepo;

    private final InterviewScheduleMapper interviewScheduleMapper;

    public List<EmployerInterviewScheduleResponse> getEmployerInterviewSchedules() {
        Long userId = userService.getCurrentUserId();
        List<InterviewSchedule> interviewSchedules =  interviewScheduleRepo.findByEmployerUserId(userId);
        return interviewScheduleMapper.toEmployerInterviewScheduleResponseList(interviewSchedules);
    }

    @Transactional
    public EmployerInterviewScheduleResponse scheduleInterview(Long applicationId, EmployerInterviewScheduleRequest request) {
        Long userId = userService.getCurrentUserId();
        InternshipApplication application = internshipApplicationRepo.findByIdAndEmployerUserId(applicationId, userId)
                .orElseThrow(() -> new EntityNotFoundException("Application not found"));

        InterviewSchedule interviewSchedule = interviewScheduleRepo.save(
                InterviewSchedule.builder()
                        .application(application)
                        .interviewer(employerRepo.getReferenceById(userId))
                        .title(request.title())
                        .interviewType(request.interviewType())
                        .startTime(request.startTime())
                        .endTime(request.endTime())
                        .meetingLink(request.meetingLink())
                        .scheduleStatus(ScheduleStatus.SCHEDULED)
                        .build()
        );

        return interviewScheduleMapper.toEmployerInterviewScheduleResponse(interviewSchedule);
    }
}
