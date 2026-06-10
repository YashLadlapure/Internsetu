package com.yash.internSetuBe.modules.student.dto.response;

import java.time.LocalDate;

public record CertificateResponse(
        Long id,
        String name,
        String issuedBy,
        LocalDate issuedDate,
        String url
) {}
