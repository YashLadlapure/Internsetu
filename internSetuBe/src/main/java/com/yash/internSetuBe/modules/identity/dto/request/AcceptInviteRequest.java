package com.yash.internSetuBe.modules.identity.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record AcceptInviteRequest(
        @NotBlank(message = "token is required")
        @Size(max = 300)
        String token,

        @Size(min = 6, max = 20, message = "the password should be of 6 to 20 characters long")
        String password
) {}
