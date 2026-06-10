package com.yash.internSetuBe.modules.employer.entity;


import com.yash.internSetuBe.modules.employer.enums.IndustryType;
import com.yash.internSetuBe.modules.internship.entity.InternshipPosting;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String websiteUrl;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    private String location;

    private String description;

    @Enumerated(EnumType.STRING)
    private IndustryType industryType;

    private Boolean isVerified; // ill use it somewhere idk yet, might use it to give a blue tick to companies

    private String hrEmail;

    private String linkedinProfile;


    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<InternshipPosting> internshipPostings;

    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<CompanyCollegeVerification> companyCollegeVerifications;

    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Employer> employers;


}
