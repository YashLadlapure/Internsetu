package com.yash.internSetuBe.modules.internship.mapper;


import com.yash.internSetuBe.modules.employer.dto.response.EmployerApplicationGetResponse;
import com.yash.internSetuBe.modules.employer.mapper.CompanyMapper;
import com.yash.internSetuBe.modules.internship.dto.request.EmployerInternshipPostRequest;
import com.yash.internSetuBe.modules.internship.dto.response.EmployerInternshipGetResponse;
import com.yash.internSetuBe.modules.employer.entity.Company;
import com.yash.internSetuBe.modules.internship.entity.InternshipPosting;
import com.yash.internSetuBe.modules.placementCell.dto.response.TpoInternshipGetResponse;
import com.yash.internSetuBe.modules.placementCell.entity.College;
import com.yash.internSetuBe.modules.placementCell.mapper.CollegeMapper;
import com.yash.internSetuBe.modules.application.dto.response.StudentApplicationGetResponse;
import com.yash.internSetuBe.modules.internship.dto.response.StudentInternshipGetResponse;
import com.yash.internSetuBe.modules.internship.dto.response.StudentInternshipWithStatus;
import com.yash.internSetuBe.modules.application.entity.InternshipApplication;
import com.yash.internSetuBe.modules.student.entity.Skill;
import com.yash.internSetuBe.modules.student.mapper.StudentMapper;
import com.yash.internSetuBe.modules.teacher.dto.response.TeacherApplicationGetResponse;
import com.yash.internSetuBe.modules.internship.dto.response.TeacherInternshipGetResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(
        componentModel = "spring",
        uses = {
                CollegeMapper.class,
                CompanyMapper.class,
                StudentMapper.class
        }
)
public interface InternshipMapper {

    // dto -> entity (InternshipRequestDto -> Internship)

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "status", constant = "PENDING")
    @Mapping(target = "company", source = "company")
    @Mapping(target = "college", source = "college")
    @Mapping(target = "description", source = "request.description")
    @Mapping(target = "location", source = "request.location")
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "applications", ignore = true)
    @Mapping(target = "requiredSkills", source = "requiredSkills")
    InternshipPosting toInternshipPosting(EmployerInternshipPostRequest request, College college, Company company, List<Skill> requiredSkills);


    // entity -> dto (Internship -> EmployerInternshipGetResponse)
    @Mapping(target = "college", source = "college")
    EmployerInternshipGetResponse toEmployerInternshipGetResponse(InternshipPosting internshipPosting);
    List<EmployerInternshipGetResponse> toEmployerInternshipGetResponseList(List<InternshipPosting> internshipPostings);

    // entity -> dto (Internship -> TpoInternshipGetResponse)
    @Mapping(target = "company", source = "company")
    TpoInternshipGetResponse toTpoInternshipGetResponse(InternshipPosting internshipPosting);
    List<TpoInternshipGetResponse> toTpoInternshipGetResponseList(List<InternshipPosting> internshipPostings);

//    // entity -> dto (Internship -> StudentInternshipGetResponse)
    @Mapping(target = "id", source = "internshipPosting.id")
    @Mapping(target = "title", source = "internshipPosting.title")
    @Mapping(target = "description", source = "internshipPosting.description")
    @Mapping(target = "salary", source = "internshipPosting.salary")
    @Mapping(target = "location", source = "internshipPosting.location")
    @Mapping(target = "duration", source = "internshipPosting.duration")
    @Mapping(target = "startDate", source = "internshipPosting.startDate")
    @Mapping(target = "deadline", source = "internshipPosting.deadline")
    @Mapping(target = "company", source = "internshipPosting.company")
    @Mapping(target = "requiredSkills", source = "internshipPosting.requiredSkills")
    @Mapping(target = "applicationQuestions", source = "internshipPosting.applicationQuestions")
    @Mapping(target = "hasApplied", source = "hasApplied")
    StudentInternshipGetResponse toStudentInternshipGetResponse(StudentInternshipWithStatus studentInternshipWithStatus);
    List<StudentInternshipGetResponse> toStudentInternshipGetResponseList(List<StudentInternshipWithStatus> studentInternshipWithStatuses);


    TeacherInternshipGetResponse toTeacherInternshipGetResponse(InternshipPosting internshipPosting);
    List<TeacherInternshipGetResponse> toTeacherInternshipGetResponseList(List<InternshipPosting> internshipPostings);

    @Mapping(target = "approvedByTeacherId", source = "approvedByTeacher.id")
    @Mapping(target = "approvedByTeacherEmail", source = "approvedByTeacher.user.email")
    @Mapping(target = "internshipPosting", source = "internshipPosting")
    StudentApplicationGetResponse toStudentApplicationGetResponse(InternshipApplication internshipApplication);
    List<StudentApplicationGetResponse> toStudentApplicationGetResponseList(List<InternshipApplication> internshipApplications);


    @Mapping(target = "internship", source = "internshipPosting")
    @Mapping(target = "student", source = "student")
    @Mapping(target = "studentEmail", source = "student.user.email")
    TeacherApplicationGetResponse toTeacherApplicationGetResponse(InternshipApplication internshipApplication);
    List<TeacherApplicationGetResponse> toTeacherApplicationGetResponseList(List<InternshipApplication> applications);


    @Mapping(target = "internship", source = "internshipPosting")
    @Mapping(target = "student", source = "student")
    @Mapping(target = "studentEmail", source = "student.user.email")
    EmployerApplicationGetResponse toEmployerApplicationGetResponse(InternshipApplication internshipApplication);
    List<EmployerApplicationGetResponse> toEmployerApplicationGetResponseList(List<InternshipApplication> applications);
}
