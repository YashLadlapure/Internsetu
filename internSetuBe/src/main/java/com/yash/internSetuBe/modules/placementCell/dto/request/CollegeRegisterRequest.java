package com.yash.internSetuBe.modules.placementCell.dto.request;

import jakarta.validation.constraints.NotBlank;


public record CollegeRegisterRequest(
        @NotBlank(message = "college name is required")
        String name,

        String address,

        String website,

        @NotBlank(message = "college domain is required")
        String emailDomain
) {}