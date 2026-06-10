package com.yash.internSetuBe.modules.identity.dto.request;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record ForgotPassEmailRequest(
    @Email(message = "email is not valid")
    @NotBlank(message = "email is required")
    String email
){}
