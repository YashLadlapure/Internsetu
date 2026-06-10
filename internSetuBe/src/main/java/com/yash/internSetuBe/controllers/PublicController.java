package com.yash.internSetuBe.controllers;


import com.yash.internSetuBe.modules.student.dto.response.SkillResponse;
import com.yash.internSetuBe.modules.student.dto.response.SocialMediaPlatformResponse;
import com.yash.internSetuBe.modules.student.service.SkillService;
import com.yash.internSetuBe.modules.student.service.SocialMediaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/public")
@RequiredArgsConstructor
public class PublicController {
    private final SocialMediaService socialMediaService;
    private final SkillService skillService;


    @GetMapping("/social-media")
    public ResponseEntity<List<SocialMediaPlatformResponse>> getSocialMedia() {
        return ResponseEntity.ok(socialMediaService.getSocialMedia());
    }

    @GetMapping("/skill")
    public ResponseEntity<List<SkillResponse>> getSkills() {
        return ResponseEntity.ok(skillService.getSkills());
    }
}
