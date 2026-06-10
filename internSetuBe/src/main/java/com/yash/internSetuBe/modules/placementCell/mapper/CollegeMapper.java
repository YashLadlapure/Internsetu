package com.yash.internSetuBe.modules.placementCell.mapper;


import com.yash.internSetuBe.modules.placementCell.dto.request.CollegeRegisterRequest;
import com.yash.internSetuBe.modules.placementCell.dto.response.CollegeResponse;
import com.yash.internSetuBe.modules.placementCell.entity.College;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CollegeMapper {

    // entity -> dto (College -> CollegeResponse)
    CollegeResponse toResponse(College college);
    List<CollegeResponse> toResponse(List<College> colleges);

    // dto -> entity (CollegeRegisterRequest -> College)
    @Mapping(target = "id" , ignore = true)
    College toEntity(CollegeRegisterRequest request);

}
