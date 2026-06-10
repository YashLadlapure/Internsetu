package com.yash.internSetuBe.modules.identity.dto.response;



public record MeResponse (
    Long id,
    String email,
    String role,
    Boolean isActive,
    UserProfile profile
){}