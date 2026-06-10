package com.yash.internSetuBe.modules.employer.dto.response;

import com.yash.internSetuBe.modules.identity.enums.Role;
import java.time.LocalDateTime;

public record EmployerRegisterResponse(
        Long id,
        String email,
        Role role,
        Boolean isActive,
        LocalDateTime createdAt
) {}
