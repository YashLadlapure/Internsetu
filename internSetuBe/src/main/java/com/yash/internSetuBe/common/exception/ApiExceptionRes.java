package com.yash.internSetuBe.common.exception;

import lombok.Builder;
import lombok.Data;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

@Data
@Builder
public class ApiExceptionRes {
    private LocalDateTime timeStamp;
    private HttpStatus status;
    private String message;
    private Object details;
}