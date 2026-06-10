package com.yash.internSetuBe.modules.identity.dto.response;

public record EmployerResponse(
        Long id,
        String linkedinProfile
) implements UserProfile {}
