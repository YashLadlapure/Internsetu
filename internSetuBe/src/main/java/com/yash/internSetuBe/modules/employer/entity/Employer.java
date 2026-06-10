package com.yash.internSetuBe.modules.employer.entity;


import com.yash.internSetuBe.modules.identity.entity.User;
import com.yash.internSetuBe.modules.interview.entity.InterviewSchedule;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Employer {

    @Id
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, name = "company_id")
    private Company company;

    private String linkedinProfile;

    @OneToMany(mappedBy = "interviewer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<InterviewSchedule> interviewSchedules;

}
