package com.yash.internSetuBe.modules.identity.dto.request;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;



public record ResetPasswordRequest (
    @NotBlank(message = "the reset token is required")
    String resetToken,

    @Size(min=6, max = 20, message = "password must be of 6 to 20 character long")
    String password
){}
