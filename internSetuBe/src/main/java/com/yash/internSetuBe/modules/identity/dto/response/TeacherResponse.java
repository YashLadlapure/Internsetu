package com.yash.internSetuBe.modules.identity.dto.response;

public record TeacherResponse(
        Long id,
        String employeeId,
        String designation,
        String department,
        String qualification,
        String specialization,
        String phoneNumber,
        String cabinLocation
) implements UserProfile {}
