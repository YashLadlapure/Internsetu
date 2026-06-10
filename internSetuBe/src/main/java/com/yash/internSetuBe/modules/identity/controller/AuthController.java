package com.yash.internSetuBe.modules.identity.controller;


import com.yash.internSetuBe.modules.employer.dto.response.EmployerRegisterResponse;
import com.yash.internSetuBe.modules.employer.dto.request.CompanyRegisterRequest;
import com.yash.internSetuBe.modules.identity.dto.request.AcceptInviteRequest;
import com.yash.internSetuBe.modules.identity.dto.response.LoginResponse;
import com.yash.internSetuBe.modules.student.dto.response.StudentRegisterResponse;
import com.yash.internSetuBe.modules.identity.dto.request.ForgotPassEmailRequest;
import com.yash.internSetuBe.modules.identity.dto.request.LoginRequest;
import com.yash.internSetuBe.modules.identity.dto.request.ResetPasswordRequest;
import com.yash.internSetuBe.modules.identity.service.AuthService;
import com.yash.internSetuBe.modules.student.dto.request.StudentRegisterRequest;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private AuthService authService;

    @PostMapping("/register/student")
    public ResponseEntity<StudentRegisterResponse> registerStudent(@Valid @RequestBody StudentRegisterRequest studentRegisterRequest){
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.registerStudent(studentRegisterRequest));
    }

    @PostMapping("/register/company")
    public ResponseEntity<EmployerRegisterResponse> registerCompany(@Valid @RequestBody CompanyRegisterRequest companyRegisterRequest){
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.registerCompany(companyRegisterRequest));
    }

    @GetMapping("/activate")
    public ResponseEntity<String> activateAccount(@RequestParam  String token) {
        boolean isActivated = authService.activateAccount(token);
        if(isActivated){
            return ResponseEntity.ok("your profile is activated");
        }
        else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("token not found or already used");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(authService.login(loginRequest));
    }


    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@Valid @RequestBody ForgotPassEmailRequest forgotPassEmailReqDto) {
        authService.sendResetPassLink(forgotPassEmailReqDto.email());
        return ResponseEntity.ok("link sent");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@Valid @RequestBody ResetPasswordRequest resetPasswordRequest){

        authService.resetPass(resetPasswordRequest);
        return ResponseEntity.ok("password is changed");
    }

    @PostMapping("/accept-invite")
    public ResponseEntity<String> acceptInvite(@Valid @RequestBody AcceptInviteRequest acceptInviteRequest) {
        authService.acceptInvite(acceptInviteRequest);
        return ResponseEntity.ok("created");
    }

}
