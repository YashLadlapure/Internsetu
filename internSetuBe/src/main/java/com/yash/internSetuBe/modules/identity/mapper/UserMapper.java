package com.yash.internSetuBe.modules.identity.mapper;


import com.yash.internSetuBe.modules.employer.dto.request.CompanyRegisterRequest;
import com.yash.internSetuBe.modules.employer.dto.response.EmployerRegisterResponse;
import com.yash.internSetuBe.modules.employer.mapper.EmployerMapper;
import com.yash.internSetuBe.modules.identity.dto.response.LoginResponse;
import com.yash.internSetuBe.modules.identity.dto.response.MeResponse;
import com.yash.internSetuBe.modules.identity.dto.response.UserProfile;
import com.yash.internSetuBe.modules.identity.entity.Invitation;
import com.yash.internSetuBe.modules.identity.entity.User;
import com.yash.internSetuBe.modules.placementCell.mapper.PlacementCellMapper;
import com.yash.internSetuBe.modules.student.dto.request.StudentRegisterRequest;
import com.yash.internSetuBe.modules.student.dto.response.StudentRegisterResponse;
import com.yash.internSetuBe.modules.student.mapper.StudentMapper;
import com.yash.internSetuBe.modules.teacher.mapper.TeacherMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface UserMapper {


    //  dto -> entity (StudentRegisterRequest -> User)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "activationToken", ignore = true)
    @Mapping(target = "role", constant = "STUDENT")
    @Mapping(target = "isActive", constant = "false")
    User toEntity(StudentRegisterRequest request);

    //  dto -> entity (CompanyRegisterRequest -> User)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "activationToken", ignore = true)
    @Mapping(target = "role", constant = "HR")
    @Mapping(target = "isActive", constant = "false")
    User toEntity(CompanyRegisterRequest request);

    // dto -> entity (Invitation -> User)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "email", source = "invitation.email")
    @Mapping(target = "role", source = "invitation.role")
    @Mapping(target = "password", source = "encodedPassword")
    @Mapping(target = "isActive", constant = "true")
    User toEntity(Invitation invitation, String encodedPassword);

    //  entity -> dto (User -> StudentRegisterResponse)
    StudentRegisterResponse toStudentRegisterResponse(User user);

    // entity -> dto (User -> EmployerRegisterResponse)
    EmployerRegisterResponse toEmployerRegisterResponse(User user);

    //  entity -> dto (User -> LoginResponse)
    LoginResponse toLoginResponse(String token);

    // entity -> dto (User -> MeResponse)
    @Mapping(target = "profile", expression = "java( mapProfile(user) )")
    MeResponse toMeResponse(User user);

    default UserProfile mapProfile(User user) {
        if(user == null || user.getRole() == null) {
            return null;
        }
        return switch (user.getRole()) {
            case STUDENT -> Mappers.getMapper(StudentMapper.class).toStudentResponse(user.getStudentProfile());
            case HR, RECRUITER -> Mappers.getMapper(EmployerMapper.class).toEmployerResponse(user.getEmployerProfile());
            case TEACHER -> Mappers.getMapper(TeacherMapper.class).toTeacherResponse(user.getTeacherProfile());
            case COLLEGE_ADMIN, TPO ->  Mappers.getMapper(PlacementCellMapper.class).toTpoResponse(user.getPlacementCellProfile());
            default -> null;
        };

    }

}
