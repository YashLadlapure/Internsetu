package com.yash.internSetuBe.modules.employer.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CompanyRegisterRequest(
        @Email(message = "Please enter a valid email address")
        @NotBlank(message = "Email is required")
        String email,

        @Size(min = 6, max = 20, message = "Password must be between 6 and 20 characters")
        @NotBlank(message = "Password is required")
        String password,

        @NotBlank(message = "Company name is required")
        String companyName,

        @NotBlank(message = "Website URL is required")
        String websiteUrl
) {}