package com.yash.internSetuBe.modules.employer.mapper;


import com.yash.internSetuBe.modules.employer.dto.response.CompanyResponse;
import com.yash.internSetuBe.modules.employer.entity.Company;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CompanyMapper {

    // entity -> dto (Company -> CompanyResponse)
    CompanyResponse toResponse(Company company);

}
