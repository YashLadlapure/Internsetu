package com.yash.internSetuBe.modules.interview.service;

import com.yash.internSetuBe.modules.identity.service.UserService;
import com.yash.internSetuBe.modules.interview.dto.response.EmployerInterviewScheduleResponse;
import com.yash.internSetuBe.modules.interview.entity.InterviewSchedule;
import com.yash.internSetuBe.modules.interview.mapper.InterviewScheduleMapper;
import com.yash.internSetuBe.modules.interview.repo.InterviewScheduleRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class InterviewScheduleService {

    private final UserService userService;

    private final InterviewScheduleRepo interviewScheduleRepo;

    private final InterviewScheduleMapper interviewScheduleMapper;

    public List<EmployerInterviewScheduleResponse> getEmployerInterviewSchedule(Long applicationId) {
        Long userId = userService.getCurrentUserId();
        List<InterviewSchedule> interviewSchedules =  interviewScheduleRepo.findByEmployerUserId(userId);
        return interviewScheduleMapper.toEmployerInterviewScheduleResponseList(interviewSchedules);
    }
}
