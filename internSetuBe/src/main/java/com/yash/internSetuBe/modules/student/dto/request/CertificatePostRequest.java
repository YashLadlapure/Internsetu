package com.yash.internSetuBe.modules.student.dto.request;


import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;

public record CertificatePostRequest (
    @NotBlank(message = "name is required")
    String name,

    LocalDate issuedDate,

    String issuedBy,
    @NotBlank(message = "url is required")
    String url

) {}


