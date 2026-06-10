package com.yash.internSetuBe.modules.identity.dto.response;


public sealed interface UserProfile
        permits StudentResponse, TeacherResponse, TpoResponse, EmployerResponse {}
