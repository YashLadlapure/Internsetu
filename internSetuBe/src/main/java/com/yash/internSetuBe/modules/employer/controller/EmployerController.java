package com.yash.internSetuBe.modules.employer.controller;


import com.yash.internSetuBe.modules.application.enums.ApplicationStatus;
import com.yash.internSetuBe.modules.interview.dto.request.EmployerInterviewScheduleRequest;
import com.yash.internSetuBe.modules.internship.dto.request.EmployerInternshipPostRequest;
import com.yash.internSetuBe.modules.employer.dto.response.EmployerApplicationGetResponse;
import com.yash.internSetuBe.modules.employer.dto.response.EmployerCollegeGetResponse;
import com.yash.internSetuBe.modules.internship.dto.response.EmployerInternshipGetResponse;
import com.yash.internSetuBe.modules.employer.service.EmployerService;
import com.yash.internSetuBe.modules.interview.dto.response.EmployerInterviewScheduleResponse;
import com.yash.internSetuBe.modules.interview.service.InterviewScheduleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employer")
@RequiredArgsConstructor
public class EmployerController {


    private final EmployerService employerService;
    private final InterviewScheduleService interviewScheduleService;

    @GetMapping("/college")
    public ResponseEntity<List<EmployerCollegeGetResponse>> getColleges() {
        return ResponseEntity.status(HttpStatus.OK).body(employerService.getColleges());
    }

    @PostMapping("/internship")
    public ResponseEntity<EmployerInternshipGetResponse> postInternship(@Valid @RequestBody EmployerInternshipPostRequest employerInternshipPostRequest) {
        return ResponseEntity.status(HttpStatus.OK).body(employerService.postInternship(employerInternshipPostRequest));
    }

    @GetMapping("/internship")
    public ResponseEntity<List<EmployerInternshipGetResponse>> getInternships() {
        return ResponseEntity.status(HttpStatus.OK).body(employerService.getInternships());
    }

    @GetMapping("/application")
    public ResponseEntity<List<EmployerApplicationGetResponse>> getApplications() {
        return ResponseEntity.status(HttpStatus.OK).body(employerService.getApplications());
    }

    @PutMapping("/application/{applicationId}/status")
    public String updateApplicationStatus(@PathVariable Long applicationId, @RequestParam ApplicationStatus status) {
        employerService.updateApplicationStatus(applicationId, status);
        return "Application status updated successfully";
    }

    @GetMapping("/application/{applicationId}/schedule-interview")
    public ResponseEntity<List<EmployerInterviewScheduleResponse>> getInterviewSchedule(@PathVariable Long applicationId) {
        return ResponseEntity.status(HttpStatus.OK).body(interviewScheduleService.getEmployerInterviewSchedule(applicationId));
    }

}
