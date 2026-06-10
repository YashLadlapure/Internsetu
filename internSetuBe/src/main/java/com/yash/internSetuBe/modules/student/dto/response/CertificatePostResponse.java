package com.yash.internSetuBe.modules.student.dto.response;

import java.time.LocalDate;

public record CertificatePostResponse(
        Long id,
        String name,
        LocalDate issuedDate,
        String issuedBy,
        String url
) {}
