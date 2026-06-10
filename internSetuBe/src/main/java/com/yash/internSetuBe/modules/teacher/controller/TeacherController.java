package com.yash.internSetuBe.modules.teacher.controller;


import com.yash.internSetuBe.modules.teacher.dto.request.TeacherIdentityPutRequest;
import com.yash.internSetuBe.modules.teacher.dto.response.TeacherApplicationGetResponse;
import com.yash.internSetuBe.modules.internship.dto.response.TeacherInternshipGetResponse;
import com.yash.internSetuBe.modules.teacher.service.TeacherService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/teacher")
public class TeacherController {

    private final TeacherService teacherService;

    @PutMapping("/profile/identity")
    public String updateIdentity(@Valid @RequestBody TeacherIdentityPutRequest teacherIdentityPutRequest) {
        teacherService.updateIdentity(teacherIdentityPutRequest);
        return "identity updated";
    }

    @GetMapping("/internship")
    public ResponseEntity<List<TeacherInternshipGetResponse>> getAllInternships() {
        return ResponseEntity.status(HttpStatus.OK).body(teacherService.getAllInternships());
    }

    @GetMapping("/application")
    public ResponseEntity<List<TeacherApplicationGetResponse>> getAllApplications() {
        return ResponseEntity.status(HttpStatus.OK).body(teacherService.getAllApplications());
    }

    @PutMapping("/application/{id}/approve")
    public ResponseEntity<TeacherApplicationGetResponse> approveApplication(@PathVariable Long id, @RequestParam(required = false) String reviewNote) {
        return ResponseEntity.ok(teacherService.approveApplication(id, reviewNote));
    }

    @PutMapping("/application/{id}/disapprove")
    public ResponseEntity<TeacherApplicationGetResponse> disapproveApplication(@PathVariable Long id, @RequestParam(required = false) String reviewNote) {
        return ResponseEntity.ok(teacherService.disapproveApplication(id, reviewNote));
    }
}
