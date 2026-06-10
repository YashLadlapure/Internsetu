package com.yash.internSetuBe.modules.placementCell.controller;

import com.yash.internSetuBe.modules.placementCell.dto.request.CollegeAdminIdentityPutRequest;
import com.yash.internSetuBe.modules.identity.enums.Role;
import com.yash.internSetuBe.modules.identity.service.AuthService;
import com.yash.internSetuBe.modules.placementCell.service.CollegeAdminService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/college-admin")
public class CollegeAdminController {

    private final AuthService authService;
    private final CollegeAdminService collegeAdminService;


    @GetMapping("/invite/teacher")
    public ResponseEntity<String> inviteTeacher(@Valid @RequestParam String email ){
        authService.inviteTpoOrTeacher(email, Role.TEACHER);
        return ResponseEntity.ok("invitation sent to teacher's email");
    }

    @GetMapping("/invite/tpo")
    public ResponseEntity<String> inviteTpo(@Valid @RequestParam String email){
        authService.inviteTpoOrTeacher(email, Role.TPO);
        return ResponseEntity.ok("invitation sent to tpo's email");
    }

    @PutMapping("/profile/identity")
    public String updateIdentity(@Valid @RequestBody CollegeAdminIdentityPutRequest collegeAdminIdentityPutRequest) {
        collegeAdminService.updateIdentity(collegeAdminIdentityPutRequest);
        return "updated identity";
    }

}
