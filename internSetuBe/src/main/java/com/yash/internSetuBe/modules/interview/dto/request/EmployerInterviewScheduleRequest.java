package com.yash.internSetuBe.modules.interview.dto.request;

import com.yash.internSetuBe.modules.interview.enums.InterviewType;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record EmployerInterviewScheduleRequest(
        @NotBlank(message = "title is required")
        String title,

        @NotNull(message = "interview type is required")
        InterviewType interviewType,

        @NotNull(message = "start time is required")
        @Future(message = "start time must be in the future")
        LocalDateTime startTime,

        @NotNull(message = "end time is required")
        @Future(message = "end time must be in the future")
        LocalDateTime endTime,

        @NotBlank(message = "meeting link is required")
        String meetingLink
) {
}
