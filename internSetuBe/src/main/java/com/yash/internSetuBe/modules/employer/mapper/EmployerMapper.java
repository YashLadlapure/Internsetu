package com.yash.internSetuBe.modules.employer.mapper;


import com.yash.internSetuBe.modules.employer.dto.response.EmployerCollegeGetResponse;
import com.yash.internSetuBe.modules.employer.entity.CompanyCollegeVerification;
import com.yash.internSetuBe.modules.employer.entity.Employer;
import com.yash.internSetuBe.modules.identity.dto.response.EmployerResponse;
import com.yash.internSetuBe.modules.placementCell.mapper.CollegeMapper;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(
        componentModel = "spring",
        uses = {
                CompanyCollegeVerificationMapper.class
        }
)
public interface EmployerMapper {

    // entity -> dto (Employer -> EmployerResponse)
    EmployerResponse toEmployerResponse(Employer employer);

}
