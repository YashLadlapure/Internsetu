package com.yash.internSetuBe.modules.student.mapper;


import com.yash.internSetuBe.modules.student.dto.response.SocialMediaPlatformResponse;
import com.yash.internSetuBe.modules.student.entity.SocialMediaPlatform;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface SocialMediaMapper {

    // entity -> dto (SocialMediaPlatform -> SocialMediaPlatformResponse)
    SocialMediaPlatformResponse toResponse(SocialMediaPlatform socialMediaPlatform);
    List<SocialMediaPlatformResponse> toResponseList(List<SocialMediaPlatform> socialMediaPlatforms);
}
