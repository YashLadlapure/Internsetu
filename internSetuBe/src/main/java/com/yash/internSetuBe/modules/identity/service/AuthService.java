package com.yash.internSetuBe.modules.identity.service;


import com.yash.internSetuBe.modules.employer.dto.response.EmployerRegisterResponse;
import com.yash.internSetuBe.modules.employer.dto.request.CompanyRegisterRequest;
import com.yash.internSetuBe.modules.employer.entity.Company;
import com.yash.internSetuBe.modules.employer.entity.Employer;
import com.yash.internSetuBe.modules.employer.repo.CompanyRepo;
import com.yash.internSetuBe.modules.employer.repo.EmployerRepo;
import com.yash.internSetuBe.modules.identity.dto.request.AcceptInviteRequest;
import com.yash.internSetuBe.modules.identity.dto.response.LoginResponse;
import com.yash.internSetuBe.modules.identity.entity.*;
import com.yash.internSetuBe.modules.identity.enums.Role;
import com.yash.internSetuBe.modules.identity.mapper.UserMapper;
import com.yash.internSetuBe.modules.identity.repo.InvitationRepo;
import com.yash.internSetuBe.modules.identity.repo.UserRepo;
import com.yash.internSetuBe.modules.placementCell.repo.CollegeRepo;
import com.yash.internSetuBe.modules.placementCell.entity.PlacementCell;
import com.yash.internSetuBe.modules.placementCell.repo.PlacementCellRepo;
import com.yash.internSetuBe.modules.student.dto.response.StudentRegisterResponse;
import com.yash.internSetuBe.common.exception.custom.AccountNotActiveException;
import com.yash.internSetuBe.modules.identity.dto.request.InviteRequest;
import com.yash.internSetuBe.modules.identity.dto.request.LoginRequest;
import com.yash.internSetuBe.modules.identity.dto.request.ResetPasswordRequest;
import com.yash.internSetuBe.modules.student.dto.request.StudentRegisterRequest;
import com.yash.internSetuBe.modules.student.entity.Student;
import com.yash.internSetuBe.modules.student.repo.StudentRepo;
import com.yash.internSetuBe.modules.teacher.entity.Teacher;
import com.yash.internSetuBe.modules.teacher.repo.TeacherRepo;
import com.yash.internSetuBe.common.utils.JwtUtils;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.hibernate.DuplicateMappingException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.CredentialsExpiredException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    // repos
    private final UserRepo userRepo;
    private final StudentRepo studentRepo;
    private final CollegeRepo collegeRepo;
    private final EmployerRepo employerRepo;
    private final InvitationRepo invitationRepo;
    private final PlacementCellRepo placementCellRepo;
    private final CompanyRepo companyRepo;
    private final TeacherRepo teacherRepo;

    // services
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;


    // mappers
    private final UserMapper userMapper;


    @Value("${frontend.url}")
    private String frontendUrl;

    @Value("${backend.url}")
    private String backendUrl;



    @Transactional
    public StudentRegisterResponse registerStudent(StudentRegisterRequest studentRegisterRequest) {

        if(userRepo.existsByEmail(studentRegisterRequest.email())) {
            throw new DuplicateMappingException(DuplicateMappingException.Type.ENTITY, "user with this email already exists");
        }

        String collegeEmailDomain = collegeRepo.findEmailDomainById(studentRegisterRequest.collegeId())
                .orElseThrow(()-> new EntityNotFoundException("college with college id: " + studentRegisterRequest.collegeId() + " not found"));

        if(!studentRegisterRequest.email().endsWith(collegeEmailDomain)){
            throw new BadCredentialsException("The email does not belong to selected college");
        }

        User user = userMapper.toEntity(studentRegisterRequest);
        user.setPassword(passwordEncoder.encode(studentRegisterRequest.password()));
        user.setActivationToken(UUID.randomUUID().toString());

        user = userRepo.save(user);

        Student student = studentRepo.save(Student.builder()
                        .user(user)
                        .college(collegeRepo.getReferenceById(studentRegisterRequest.collegeId()))
                        .prn(studentRegisterRequest.prn())
                        .build()
        );

        String activationLink = backendUrl + "/auth/activate?token=" + user.getActivationToken();
        String subject = "Activate your intern setu account";
        String body = "click on the link to activate your account: " + activationLink;


        emailService.sendMail(user.getEmail(), subject, body);

        return userMapper.toStudentRegisterResponse(user);
    }

    public boolean activateAccount(String token) {
        return userRepo.findByActivationToken(token).map(profile -> {
            profile.setIsActive(true);
            userRepo.save(profile);
            return true;
        }).orElse(false);
    }


    public LoginResponse login(LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.email(), loginRequest.password()));

        if(!userRepo.findIsActiveByEmail(loginRequest.email())){
            throw new AccountNotActiveException();
        }

        User user = (User) authentication.getPrincipal();

        assert user != null;

        String token = jwtUtils.generateJwtToken(user);

        return userMapper.toLoginResponse(token);
    }

    public void sendResetPassLink(String email) {

        if(!userRepo.existsByEmail(email)) {
            throw new EntityNotFoundException("user with email not found");
        }

        String resetPassToken = UUID.randomUUID().toString();

        userRepo.updatePassTokenByEmail(resetPassToken, LocalDateTime.now().plusMinutes(5), email);

        String link  = frontendUrl + "/reset-password?token=" + resetPassToken;

        String subject = "Password Reset OTP for Intern Setu";
        String body = "Reset password Click here " + link  + "\nValid for 5 minutes.";
        emailService.sendMail(email, subject, body);

    }

    public void resetPass(@Valid ResetPasswordRequest resetPasswordRequest) {
        User user = userRepo.findByResetPassToken(resetPasswordRequest.resetToken()).orElseThrow(()-> new EntityNotFoundException("user not found with token"));
        userRepo.updatePasswordByEmail(passwordEncoder.encode(resetPasswordRequest.password()), user.getEmail());
    }

    @Transactional
    public EmployerRegisterResponse registerCompany(CompanyRegisterRequest companyRegisterRequest) {

        if(userRepo.existsByEmail(companyRegisterRequest.email())){
            throw new DuplicateMappingException(DuplicateMappingException.Type.ENTITY, "user with this email already exists");
        }

        User user = userMapper.toEntity(companyRegisterRequest);
        user.setPassword(passwordEncoder.encode(companyRegisterRequest.password()));
        user.setActivationToken(UUID.randomUUID().toString());
        user = userRepo.save(user);

        Company company = companyRepo.save(
                Company
                        .builder()
                        .name(companyRegisterRequest.companyName())
                        .hrEmail(user.getEmail())
                        .build()
        );

        Employer employer = employerRepo.save(
                Employer
                        .builder()
                        .company(company)
                        .user(user)
                        .build()
                );

        String activationLink = backendUrl + "/auth/activate?token=" + user.getActivationToken();
        String subject = "Activate your intern setu account";
        String body = "click on the link to activate your account: " + activationLink;

        emailService.sendMail(user.getEmail(), subject, body);

        return userMapper.toEmployerRegisterResponse(user);
    }

    @Transactional
    public void inviteStaff(InviteRequest inviteRequest, Role role) {
        if(userRepo.existsByEmail(inviteRequest.email())){
            throw new DuplicateMappingException(DuplicateMappingException.Type.ENTITY, "user with email already exists");
        }

        if(invitationRepo.existsByCollegeIdAndEmail(inviteRequest.collegeId(), inviteRequest.email())){
            throw new DuplicateMappingException(DuplicateMappingException.Type.ENTITY, "invitation with email and college already exists");
        }

        String token = UUID.randomUUID().toString();
        LocalDateTime expiresAt = LocalDateTime.now().plusHours(48);

        Invitation invitation = invitationRepo.save(
                Invitation
                        .builder()
                        .email(inviteRequest.email())
                        .token(token)
                        .expiresAt(expiresAt)
                        .role(role)
                        .college(collegeRepo.getReferenceById(inviteRequest.collegeId()))
                        .build()
        );

        String link = frontendUrl + "/accept-invite?token=" + token;
        String subject = "Invitation for inter setu";
        String body = "invite link to join intern setu "  + link;

        emailService.sendMail(inviteRequest.email(), subject, body);
    }

    public void inviteTpoOrTeacher(String email, Role role) {
        Long userId = userService.getCurrentUserId();
        Long collegeId = collegeRepo.findIdByPlacementCellUserId(userId).orElseThrow(()-> new EntityNotFoundException("placement cell not found for user"));
        inviteStaff(new InviteRequest(collegeId, email), role);
    }


    public void inviteRecruiter(String email) {
        Long userId = userService.getCurrentUserId();

        if(userRepo.existsByEmail(email)){
            throw new DuplicateMappingException(DuplicateMappingException.Type.ENTITY, "user with email already exists");
        }

        Long companyId = companyRepo.findIdByUserId(userId).orElseThrow(()-> new EntityNotFoundException("can't find company with hrEmail"));

        if(invitationRepo.existsByCompanyIdAndEmail(companyId , email)){
            throw new DuplicateMappingException(DuplicateMappingException.Type.ENTITY, "invitation with email and college already exists");
        }

        String token = UUID.randomUUID().toString();
        LocalDateTime expiresAt = LocalDateTime.now().plusHours(48);

        Invitation invitation = invitationRepo.save(
                Invitation
                        .builder()
                        .email(email)
                        .token(token)
                        .expiresAt(expiresAt)
                        .role(Role.RECRUITER)
                        .company(companyRepo.getReferenceById(companyId))
                        .build()
        );

        String link = frontendUrl + "/accept-invite?token=" + token;
        String subject = "Invitation for inter setu";
        String body = "invite link to join intern setu "  + link;

        emailService.sendMail(email, subject, body);

    }

    @Transactional
    public void acceptInvite(AcceptInviteRequest acceptInviteRequest)  {
        Invitation invitation = invitationRepo.findByToken(acceptInviteRequest.token()).orElseThrow(()-> new EntityNotFoundException("invitation not found with token"));
        if(invitation.isExpired()){
            throw new CredentialsExpiredException("the token is expired");
        }
        User user = userRepo.save(
                userMapper.toEntity(
                        invitation,
                        passwordEncoder.encode(acceptInviteRequest.password())
                )
        );
        if(invitation.getRole() == Role.COLLEGE_ADMIN || invitation.getRole() == Role.TPO) {
            PlacementCell tpo = placementCellRepo.save(
                    PlacementCell
                            .builder()
                            .user(user)
                            .college(invitation.getCollege())
                            .build()
            );
        }
        else if(invitation.getRole() == Role.TEACHER) {
            Teacher teacher = teacherRepo.save(
                    Teacher
                            .builder()
                            .user(user)
                            .college(invitation.getCollege())
                            .build()
            );
        } else if (invitation.getRole() == Role.RECRUITER) {
            Employer employer = employerRepo.save(
              Employer
                      .builder()
                      .user(user)
                      .company(invitation.getCompany())
                      .build()
            );
        }

        invitationRepo.delete(invitation);

    }
}
