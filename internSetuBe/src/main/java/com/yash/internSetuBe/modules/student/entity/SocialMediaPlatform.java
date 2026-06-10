package com.yash.internSetuBe.modules.student.entity;


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
public class SocialMediaPlatform {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String iconUrl;

    @OneToMany(mappedBy = "socialMediaPlatform", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<StudentSocialLink> studentSocialLinks;


}
