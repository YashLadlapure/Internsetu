package com.yash.internSetuBe.modules.employer.mapper;


import com.yash.internSetuBe.modules.employer.dto.request.CompanyCollegeVerificationPostRequest;
import com.yash.internSetuBe.modules.employer.dto.response.EmployerCollegeGetResponse;
import com.yash.internSetuBe.modules.employer.entity.Company;
import com.yash.internSetuBe.modules.employer.entity.CompanyCollegeVerification;
import com.yash.internSetuBe.modules.placementCell.dto.response.TpoCompanyCollegeVerificationResponse;
import com.yash.internSetuBe.modules.placementCell.entity.College;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(
        componentModel = "spring",
        uses = {
                CompanyMapper.class
        }
)
public interface CompanyCollegeVerificationMapper {

    // dto -> entity (CompanyCollegeVerificationPostRequest -> CompanyCollegeVerification)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "college", source = "college")
    @Mapping(target = "company", source = "company")
    @Mapping(target = "status", constant = "PENDING")
    @Mapping(target = "text", ignore = true)
    @Mapping(target = "verifiedByUser", ignore = true)
    CompanyCollegeVerification toEntity(CompanyCollegeVerificationPostRequest request, College college, Company company);


    // entity -> dto (CompanyCollegeVerification -> CompanyCollegeVerificationGetResponse)
    EmployerCollegeGetResponse toEmployerCollegesGetResponse(CompanyCollegeVerification entity);
    List<EmployerCollegeGetResponse> toEmployerCollegeGetResponseList(List<CompanyCollegeVerification> entities);


    // entity -> dto(CompanyCollegeVerification -> TpoCompanyCollegeVerificationResponse)
    TpoCompanyCollegeVerificationResponse toTpoCompanyCollegeVerificationResponse(CompanyCollegeVerification entity);
    List<TpoCompanyCollegeVerificationResponse> toTpoCompanyCollegeVerificationResponse(List<CompanyCollegeVerification> entities);



}
