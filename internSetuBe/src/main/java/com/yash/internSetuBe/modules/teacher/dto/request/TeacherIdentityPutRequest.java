package com.yash.internSetuBe.modules.teacher.dto.request;

public record TeacherIdentityPutRequest(
        String employeeId,
        String designation,
        String department,
        String qualification,
        String specialization,
        String phoneNumber,
        String cabinLocation
) {}
