package com.yash.internSetuBe.modules.student.controller;


import com.yash.internSetuBe.modules.application.dto.response.StudentApplicationGetResponse;
import com.yash.internSetuBe.modules.internship.dto.response.StudentInternshipGetResponse;
import com.yash.internSetuBe.modules.student.dto.request.CertificatePostRequest;
import com.yash.internSetuBe.modules.application.dto.request.InternshipApplyPostRequest;
import com.yash.internSetuBe.modules.student.dto.request.ProjectPostRequest;
import com.yash.internSetuBe.modules.student.dto.request.StudentIdentityUpdateRequest;
import com.yash.internSetuBe.modules.student.dto.response.*;
import com.yash.internSetuBe.modules.student.service.StudentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/student")
public class StudentController {

    private final StudentService studentService;


    // profile --------------------------------------------------------------------------------------------------------

    @PutMapping("/profile/identity")
    public String updateProfile(@Valid @RequestBody StudentIdentityUpdateRequest studentIdentityUpdateReqDto){
        studentService.updateProfileIdentity(studentIdentityUpdateReqDto);
        return "profile updated";
    }

    @PostMapping("/profile/skill/{id}")
    public String addSkill(@PathVariable Long id ){
        studentService.addSkill(id);
        return "skill Added";
    }

    @DeleteMapping("/profile/skill/{id}")
    public String deleteSkill(@PathVariable Long id) {
        studentService.removeSkill(id);
        return "skilled removed";
    }


    @PostMapping("/profile/social/{id}")
    public ResponseEntity<StudentSocialLinksResponse> addSocial(@RequestParam String link, @PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.CREATED).body(studentService.addSocial(id, link));

    }


    @PutMapping("/profile/social/{id}")
    public String updateSocial(@RequestParam String link, @PathVariable Long id) {
        studentService.updateSocial(id, link);
        return "updated";

    }

    @DeleteMapping("/profile/social/{id}")
    public String deleteSocial(@PathVariable Long id) {
        studentService.removeSocial(id);
        return "link deleted";
    }

    @PutMapping("/profile/about")
    public String updateAbout(@RequestParam String about) {
        studentService.updateAbout(about);
        return "about updated";
    }

    @PostMapping("/profile/project")
    public ResponseEntity<ProjectResponse> addProject(@Valid @RequestBody ProjectPostRequest projectPostRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(studentService.addProject(projectPostRequest));
    }

    @DeleteMapping("/profile/project/{id}")
    public String deleteProject(@PathVariable Long id){
        studentService.deleteProject(id);
        return "project deleted";
    }

    @PostMapping("/profile/certificate")
    public ResponseEntity<CertificateResponse> addCertificate(@Valid @RequestBody CertificatePostRequest certificatePostReqDto) {
        return  ResponseEntity.status(HttpStatus.CREATED).body(studentService.addCertificate(certificatePostReqDto));
    }

    @DeleteMapping("/profile/certificate/{id}")
    public String deleteCertificate(@PathVariable Long id) {
        studentService.deleteCertificate(id);
        return "certificate deleted";
    }

    // internships -----------------------------------------------------------------------------------------------------

    @GetMapping("/internship")
    public ResponseEntity<List<StudentInternshipGetResponse>> getInternships() {
        return ResponseEntity.status(HttpStatus.OK).body(studentService.getInternships());
    }

    @PostMapping("/internship/{id}/apply")
    public String applyForInternship(@RequestBody InternshipApplyPostRequest internshipApplyPostRequest) {
        studentService.applyForInternship(internshipApplyPostRequest);
        return "applied";
    }

    @PutMapping("/application/{id}")
    public ResponseEntity<StudentApplicationGetResponse> updateApplication(@PathVariable Long id, @RequestBody InternshipApplyPostRequest internshipApplyPostRequest ) {
        return ResponseEntity.status(HttpStatus.OK).body(studentService.updateApplication(id, internshipApplyPostRequest));
    }

    @GetMapping("/applications")
    public ResponseEntity<List<StudentApplicationGetResponse>> getApplications() {
        return ResponseEntity.status(HttpStatus.OK).body(studentService.getApplications());
    }




}
