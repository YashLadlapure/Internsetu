package com.yash.internSetuBe.modules.internship.entity;


import com.yash.internSetuBe.modules.employer.entity.Company;
import com.yash.internSetuBe.modules.application.entity.InternshipApplication;
import com.yash.internSetuBe.modules.internship.enums.InternshipStatus;
import com.yash.internSetuBe.modules.internship.enums.InternshipLocationType;
import com.yash.internSetuBe.modules.placementCell.entity.College;
import com.yash.internSetuBe.modules.student.entity.Skill;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InternshipPosting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, name = "college_id")
    private College college;

    private String title;

    private String description;

    private Double salary;

    private InternshipLocationType location;

    private String duration;

    private LocalDate startDate;

    private LocalDateTime deadline;

    private InternshipStatus status;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @ManyToMany
    @JoinTable(
            name = "posting_required_skills",
            joinColumns = @JoinColumn(name = "posting_id"),
            inverseJoinColumns = @JoinColumn(name = "skill_id")
    )
    private List<Skill> requiredSkills;

    @ElementCollection
    @CollectionTable(name = "internship_questions", joinColumns = @JoinColumn(name = "internship_id"))
    @Column(name = "question_text")
    private List<String> applicationQuestions;

    @OneToMany(mappedBy = "internshipPosting", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<InternshipApplication> applications;

}
