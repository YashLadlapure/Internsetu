package com.yash.internSetuBe.modules.employer.controller;


import com.yash.internSetuBe.modules.employer.dto.request.CompanyCollegeVerificationPostRequest;
import com.yash.internSetuBe.modules.employer.dto.response.EmployerCollegeGetResponse;
import com.yash.internSetuBe.modules.employer.service.HrService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/hr")
@RequiredArgsConstructor
public class HrController {

    private final HrService hrService;

    @PostMapping("/verification-request-to-college")
    public ResponseEntity<EmployerCollegeGetResponse> verificationRequestToCollege(@Valid @RequestBody CompanyCollegeVerificationPostRequest companyCollegeVerificationPostRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(hrService.verificationRequestToCollege(companyCollegeVerificationPostRequest));
    }

}
