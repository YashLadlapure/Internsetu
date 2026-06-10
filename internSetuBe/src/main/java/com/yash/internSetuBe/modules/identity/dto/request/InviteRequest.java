package com.yash.internSetuBe.modules.identity.dto.request;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;


public record InviteRequest (
    @Min(1)
    Long collegeId,

    @NotBlank(message = "the email is required")
    @Email(message = "provide a valid email")
    String email

){}
