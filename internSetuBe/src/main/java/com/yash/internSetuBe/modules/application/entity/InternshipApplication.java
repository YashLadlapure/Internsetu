package com.yash.internSetuBe.modules.application.entity;


import com.yash.internSetuBe.modules.interview.entity.InterviewSchedule;
import com.yash.internSetuBe.modules.student.entity.Student;
import com.yash.internSetuBe.modules.application.enums.ApplicationStatus;
import com.yash.internSetuBe.modules.internship.entity.InternshipPosting;
import com.yash.internSetuBe.modules.teacher.entity.Teacher;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(
        uniqueConstraints = {
                @UniqueConstraint(name = "uk-internship_student", columnNames = {"internship_id", "student_id"})
        }
)
public class InternshipApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, name = "internship_id")
    private InternshipPosting internshipPosting;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    private LocalDateTime appliedAt;

    private ApplicationStatus status;

    @Column(columnDefinition = "TEXT")
    private String coverLetter;

    private String appliedWithResumeUrl; // snapshot of resume at the time of application

    @ElementCollection
    @CollectionTable(name = "application_responses", joinColumns = @JoinColumn(name = "application_id"))
    @MapKeyColumn(name = "question")
    @Column(name = "answer", columnDefinition = "TEXT")
    private Map<String, String> questionResponses;


    //  teacher review

    private Boolean isApproved;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "approved_By_Teacher_id")
    private Teacher approvedByTeacher;

    private String reviewNote;

    private LocalDateTime reviewedAt;

    @PrePersist
    public void prePersist() {
        if(isApproved == null) {
            isApproved = false;
        }
    }

    @OneToMany(mappedBy = "application", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<InterviewSchedule> interviewSchedules;

}
