package com.yash.internSetuBe.modules.interview.entity;


import com.yash.internSetuBe.modules.application.entity.InternshipApplication;
import com.yash.internSetuBe.modules.employer.entity.Employer;
import com.yash.internSetuBe.modules.identity.entity.User;
import com.yash.internSetuBe.modules.interview.enums.InterviewType;
import com.yash.internSetuBe.modules.interview.enums.ScheduleStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class InterviewSchedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "application_id", nullable = false)
    private InternshipApplication application;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "interviewer_id", nullable = false)
    private Employer interviewer;

    private String title;

    private InterviewType interviewType;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private String meetingLink;

    private String meetingNotes;

    private ScheduleStatus scheduleStatus;

    @CreationTimestamp
    private LocalDateTime createdAt;

}
