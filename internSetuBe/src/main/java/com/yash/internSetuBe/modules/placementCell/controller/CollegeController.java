package com.yash.internSetuBe.modules.placementCell.controller;

import com.yash.internSetuBe.modules.placementCell.dto.response.CollegeResponse;
import com.yash.internSetuBe.modules.placementCell.service.CollegeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CollegeController {
    private final CollegeService collegeService;

    @GetMapping("/public/college")
    public ResponseEntity<List<CollegeResponse>> getAllColleges() {
        return ResponseEntity.status(HttpStatus.OK).body(collegeService.retrieveAllColleges());
    }

}
