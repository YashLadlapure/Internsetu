package com.yash.internSetuBe.modules.student.dto.response;

import com.yash.internSetuBe.modules.identity.enums.Role;
import java.time.LocalDateTime;

public record StudentRegisterResponse(
        Long id,
        String email,
        Role role,
        Boolean isActive,
        LocalDateTime createdAt
) {}
