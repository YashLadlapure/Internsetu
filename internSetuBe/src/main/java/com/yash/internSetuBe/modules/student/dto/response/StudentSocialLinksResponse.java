package com.yash.internSetuBe.modules.student.dto.response;

public record StudentSocialLinksResponse(
        Long id,
        SocialMediaPlatformResponse socialMediaPlatform,
        String link
) {}
