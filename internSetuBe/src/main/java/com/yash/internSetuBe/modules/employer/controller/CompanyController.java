package com.yash.internSetuBe.modules.employer.controller;


import com.yash.internSetuBe.modules.identity.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/company")
public class CompanyController {

    private final AuthService authService;

    @GetMapping("/invite/recruiter")
    public String inviteRecruiter(@RequestParam String email) {
        authService.inviteRecruiter(email);
        return "invitation sent to the recruiter";
    }

}
