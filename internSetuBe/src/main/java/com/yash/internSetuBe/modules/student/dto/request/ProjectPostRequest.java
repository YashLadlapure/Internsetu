package com.yash.internSetuBe.modules.student.dto.request;

import jakarta.validation.constraints.NotBlank;

public record ProjectPostRequest(
    @NotBlank(message = "name is required")
    String name,
    String description
) {}
