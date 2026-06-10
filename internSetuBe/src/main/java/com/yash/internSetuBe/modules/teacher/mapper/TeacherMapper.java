package com.yash.internSetuBe.modules.teacher.mapper;


import com.yash.internSetuBe.modules.teacher.dto.request.TeacherIdentityPutRequest;
import com.yash.internSetuBe.modules.teacher.entity.Teacher;
import com.yash.internSetuBe.modules.identity.dto.response.TeacherResponse;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface TeacherMapper {

    // entity -> dto (Teacher -> TeacherResponse)
    TeacherResponse toTeacherResponse(Teacher teacher);

    // update
    void updateTeacherFromTeacherIdentityPutRequest(TeacherIdentityPutRequest request, @MappingTarget Teacher teacher);
}
