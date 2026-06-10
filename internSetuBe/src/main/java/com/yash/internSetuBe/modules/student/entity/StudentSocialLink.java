package com.yash.internSetuBe.modules.student.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Table(
        uniqueConstraints = @UniqueConstraint(columnNames =  {"student_id", "social_media_platform_id" })
)
public class StudentSocialLink {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, name = "student_id")
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "social_media_platform_id", nullable = false)
    private SocialMediaPlatform socialMediaPlatform;

    private String link;

}
