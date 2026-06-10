package com.yash.internSetuBe.modules.interview.dto.response;

import com.yash.internSetuBe.modules.employer.dto.response.EmployerApplicationGetResponse;
import com.yash.internSetuBe.modules.interview.enums.InterviewType;
import com.yash.internSetuBe.modules.interview.enums.ScheduleStatus;

import java.time.LocalDateTime;

public record EmployerInterviewScheduleResponse(
    Long id,
    EmployerApplicationGetResponse application,
    String title,
    InterviewType interviewType,
    LocalDateTime startTime,
    LocalDateTime endTime,
    String meetingLink,
    String meetingNotes,
    ScheduleStatus scheduleStatus,
    LocalDateTime createdAt
) {
}
