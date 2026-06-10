package com.yash.internSetuBe.modules.placementCell.mapper;


import com.yash.internSetuBe.modules.placementCell.dto.request.CollegeAdminIdentityPutRequest;
import com.yash.internSetuBe.modules.placementCell.dto.request.TpoIdentityPutRequest;
import com.yash.internSetuBe.modules.placementCell.entity.PlacementCell;
import com.yash.internSetuBe.modules.identity.dto.response.TpoResponse;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface PlacementCellMapper {

    // entity -> dto (PlacementCell -> TpoResponse)
    TpoResponse toTpoResponse(PlacementCell placementCell);

    // update dto -> entity (CollegeAdminIdentityPutRequest -> PlacementCell)
    void update(CollegeAdminIdentityPutRequest request, @MappingTarget PlacementCell placementCell);

    // update dto -> entity (TpoIdentityPutRequest -> PlacementCell)
    void update(TpoIdentityPutRequest request, @MappingTarget PlacementCell placementCell);

}
