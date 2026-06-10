package com.yash.internSetuBe.common.exception;

import com.yash.internSetuBe.common.exception.custom.AccountNotActiveException;
import jakarta.persistence.EntityNotFoundException;
import org.hibernate.DuplicateMappingException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.CredentialsExpiredException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    //----------------------------

    @ExceptionHandler(AccountNotActiveException.class)
    public ResponseEntity<ApiExceptionRes> handleAccountNotActive(AccountNotActiveException ex) {
        return buildResponse(ex.getMessage(), HttpStatus.FORBIDDEN);
    }

    //-----------------------------

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ApiExceptionRes> handleDataIntegrityViolation(DataIntegrityViolationException ex) {
        String message = "Database error: Value already exists or constraint violated.";
        return buildResponse(message, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ApiExceptionRes> handleEntityNotFound(EntityNotFoundException ex) {
        return buildResponse(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    // ------------------------------------------------------

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ApiExceptionRes> handleBadCredentials(BadCredentialsException ex) {
        return buildResponse("Invalid Email or Password", HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ApiExceptionRes> handleAuthenticationException(AuthenticationException ex) {
        return buildResponse(ex.getMessage(), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(CredentialsExpiredException.class)
    public ResponseEntity<ApiExceptionRes> handleCredentialsExpiredException(CredentialsExpiredException ex){
        return buildResponse(ex.getMessage(), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(DuplicateMappingException.class)
    public ResponseEntity<ApiExceptionRes> handleDuplicateMappingException(DuplicateMappingException ex) {
        return buildResponse(ex.getMessage(), HttpStatus.CONFLICT);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiExceptionRes> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage())
        );

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                ApiExceptionRes.builder()
                        .timeStamp(LocalDateTime.now())
                        .status(HttpStatus.BAD_REQUEST)
                        .message("Validation Failed")
                        .details(errors)
                        .build()
        );
    }

    //----------------------------------------

    @ExceptionHandler(MailException.class)
    public ResponseEntity<ApiExceptionRes> handleMailException(MailException ex) {
        return buildResponse("Failed to send email. Please try again later.", HttpStatus.INTERNAL_SERVER_ERROR);
    }


    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiExceptionRes> handleGlobalException(Exception ex) {
        return buildResponse("An internal server error occurred. Please contact support.", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    //--------------------------------------------

    private ResponseEntity<ApiExceptionRes> buildResponse(String message, HttpStatus status) {
        ApiExceptionRes response = ApiExceptionRes.builder()
                .timeStamp(LocalDateTime.now())
                .status(status)
                .message(message)
                .build();

        return ResponseEntity.status(status).body(response);
    }
}