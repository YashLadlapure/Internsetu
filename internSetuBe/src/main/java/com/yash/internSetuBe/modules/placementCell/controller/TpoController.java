package com.yash.internSetuBe.modules.placementCell.controller;


import com.yash.internSetuBe.modules.placementCell.dto.request.CollegeCompanyVerifyPostRequest;
import com.yash.internSetuBe.modules.placementCell.dto.request.TpoIdentityPutRequest;
import com.yash.internSetuBe.modules.placementCell.dto.response.TpoCompanyCollegeVerificationResponse;
import com.yash.internSetuBe.modules.placementCell.dto.response.TpoInternshipGetResponse;
import com.yash.internSetuBe.modules.internship.enums.InternshipStatus;
import com.yash.internSetuBe.modules.placementCell.service.TpoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tpo")
@RequiredArgsConstructor
public class TpoController {

    private final TpoService tpoService;

    @PutMapping("/profile/identity")
    public String updateIdentity(@Valid @RequestBody TpoIdentityPutRequest tpoIdentityPutRequest) {
        tpoService.updateIdentity(tpoIdentityPutRequest);
        return "identity updated";
    }

    @GetMapping("/company")
    public ResponseEntity<List<TpoCompanyCollegeVerificationResponse>> getCompanies() {
        return ResponseEntity.status(HttpStatus.OK).body(tpoService.getCompanies());
    }

    @PostMapping("/company/{id}/verify")
    public String verifyCompany(@Valid @RequestBody CollegeCompanyVerifyPostRequest collegeCompanyVerifyPostRequest, @PathVariable Long id) {
        tpoService.verifyCompany(id, collegeCompanyVerifyPostRequest);
        return "verification done";
    }

    @GetMapping("/internship")
    public ResponseEntity<List<TpoInternshipGetResponse>> getInternships(){
        return ResponseEntity.status(HttpStatus.OK).body(tpoService.getInternships());
    }

    @PostMapping("/internship/{id}/status")
    public String updateInternshipStatus(@RequestParam InternshipStatus status, @PathVariable Long id) {
        tpoService.updateInternshipStatus(id, status);
        return "status updated";
    }
}
