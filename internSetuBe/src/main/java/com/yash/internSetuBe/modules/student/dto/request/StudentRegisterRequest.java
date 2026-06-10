package com.yash.internSetuBe.modules.student.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record StudentRegisterRequest(
        @Email(message = "please enter a valid email")
        @NotBlank(message = "email is required")
        String email,

        @NotBlank(message = "password is required")
        @Size(min = 6, max = 20, message = "password must be of 6 to 20 character long")
        String password,

        @NotNull(message = "collegeId is required")
        @Min(value = 1, message = "collegeId must be greater than 0")
        Long collegeId,

        @NotBlank(message = "PRN is required")
        String prn
) {}
