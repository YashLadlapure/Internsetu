package com.yash.internSetuBe.modules.student.service;


import com.yash.internSetuBe.modules.student.dto.response.SocialMediaPlatformResponse;
import com.yash.internSetuBe.modules.student.entity.SocialMediaPlatform;
import com.yash.internSetuBe.modules.student.repo.SocialMediaPlatformRepo;
import com.yash.internSetuBe.modules.student.mapper.SocialMediaMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SocialMediaService {

    private final SocialMediaPlatformRepo socialMediaPlatformRepo;

    private final SocialMediaMapper socialMediaMapper;

    public List<SocialMediaPlatformResponse> getSocialMedia() {

        List<SocialMediaPlatform> socials = socialMediaPlatformRepo.findAll();
        return socialMediaMapper.toResponseList(socials);

    }

}
