package com.yash.internSetuBe.modules.teacher.entity;


import com.yash.internSetuBe.modules.application.entity.InternshipApplication;
import com.yash.internSetuBe.modules.identity.entity.User;
import com.yash.internSetuBe.modules.placementCell.entity.College;
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
public class Teacher {

    @Id
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "college_id", nullable = false)
    private College college;

    private String employeeId;

    private String designation;

    private String department;

    private String qualification;

    private String specialization; // os, aies, ...

    private String phoneNumber;

    private String cabinLocation;



    @OneToMany(mappedBy = "approvedByTeacher", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<InternshipApplication> applications;



}
