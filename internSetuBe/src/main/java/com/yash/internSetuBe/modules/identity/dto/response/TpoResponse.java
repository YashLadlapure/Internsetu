package com.yash.internSetuBe.modules.identity.dto.response;

public record TpoResponse(
        Long id,
        String employeeId,
        String designation,
        String phoneNumber,
        String cabinLocation
) implements UserProfile {}
