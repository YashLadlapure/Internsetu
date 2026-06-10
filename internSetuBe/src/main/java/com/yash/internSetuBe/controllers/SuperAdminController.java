package com.yash.internSetuBe.controllers;


import com.yash.internSetuBe.modules.placementCell.dto.request.CollegeRegisterRequest;
import com.yash.internSetuBe.modules.identity.dto.request.InviteRequest;
import com.yash.internSetuBe.modules.identity.enums.Role;
import com.yash.internSetuBe.modules.placementCell.dto.response.CollegeResponse;
import com.yash.internSetuBe.modules.identity.service.AuthService;
import com.yash.internSetuBe.modules.placementCell.service.CollegeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/super-admin")
public class SuperAdminController {

    private final AuthService authService;
    private final CollegeService collegeService;

    @PostMapping("/register-college")
    public ResponseEntity<CollegeResponse> registerCollege(@Valid @RequestBody CollegeRegisterRequest collegeRegisterRequest){
        return ResponseEntity.status(HttpStatus.CREATED).body(collegeService.createCollege(collegeRegisterRequest));
    }

    @PostMapping("/invite/college-admin")
    public ResponseEntity<String> inviteCollegeAdmin(@Valid @RequestBody InviteRequest inviteRequest){
        authService.inviteStaff(inviteRequest, Role.COLLEGE_ADMIN);
        return ResponseEntity.ok("invitation sent to head of college's email");
    }

}
