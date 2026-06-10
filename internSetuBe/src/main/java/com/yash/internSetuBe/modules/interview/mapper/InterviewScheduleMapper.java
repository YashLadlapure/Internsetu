package com.yash.internSetuBe.modules.interview.mapper;


import com.yash.internSetuBe.modules.internship.dto.response.EmployerInternshipGetResponse;
import com.yash.internSetuBe.modules.internship.mapper.InternshipMapper;
import com.yash.internSetuBe.modules.interview.dto.response.EmployerInterviewScheduleResponse;
import com.yash.internSetuBe.modules.interview.entity.InterviewSchedule;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(
        componentModel = "spring",
        uses = {
            InternshipMapper.class
        }
)
public interface InterviewScheduleMapper {


    @Mapping(target = "application", source = "interviewSchedule.application")
    EmployerInterviewScheduleResponse toEmployerInterviewScheduleResponse(InterviewSchedule interviewSchedule);
    List<EmployerInterviewScheduleResponse> toEmployerInterviewScheduleResponseList(List<InterviewSchedule> interviewSchedules);
}
