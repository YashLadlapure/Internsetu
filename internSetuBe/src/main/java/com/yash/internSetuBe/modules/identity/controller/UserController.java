package com.yash.internSetuBe.modules.identity.controller;


import com.yash.internSetuBe.modules.identity.dto.response.MeResponse;
import com.yash.internSetuBe.modules.identity.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<MeResponse> me() {
        return ResponseEntity.status(HttpStatus.OK).body(userService.getProfile());
    }
}
