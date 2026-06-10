package com.yash.internSetuBe.modules.student.entity;


import com.yash.internSetuBe.modules.application.entity.InternshipApplication;
import com.yash.internSetuBe.modules.placementCell.entity.College;
import com.yash.internSetuBe.modules.identity.entity.User;
import com.yash.internSetuBe.modules.student.enums.Gender;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Student {

    @Id
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "college_id", nullable = false)
    private College college;

    @Column(unique = true, nullable = false)
    private String prn;

    private String phoneNumber;

    private Gender gender;

    private LocalDate dateOfBirth;

    private String graduationYear;

    private String course;

    private String branch;

    private String panel;

    private String about;

    private String resumeLink;

//    public boolean addSkill(Skill skill) {
//        if(skill == null || skill.getId() == null) {
//            return false;
//        }
//        return true
//    }
//
//    public void removeSkill(Skill skill){
//        if(skill != null) {
//            skills.remove(skill);
//        }
//    }

    @OneToMany(mappedBy = "student", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<StudentSkill> skills;

    @OneToMany(mappedBy = "student", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Project> projects;


    @OneToMany(mappedBy = "student", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Certificate> certificates;


    @OneToMany(mappedBy = "student", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<StudentSocialLink> studentSocialLinks;

    @OneToMany(mappedBy = "student", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<InternshipApplication> applications;



}
