package com.yash.internSetuBe.modules.placementCell.service;


import com.yash.internSetuBe.modules.placementCell.dto.request.CollegeAdminIdentityPutRequest;
import com.yash.internSetuBe.modules.placementCell.entity.PlacementCell;
import com.yash.internSetuBe.modules.identity.service.UserService;
import com.yash.internSetuBe.modules.placementCell.repo.PlacementCellRepo;
import com.yash.internSetuBe.modules.placementCell.mapper.PlacementCellMapper;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CollegeAdminService {

    private final UserService userService;

    private final PlacementCellRepo placementCellRepo;

    private final PlacementCellMapper placementCellMapper;

    public void updateIdentity(CollegeAdminIdentityPutRequest collegeAdminIdentityPutRequest) {
        PlacementCell admin = placementCellRepo.findById(
                userService.getCurrentUserId()
                )
                .orElseThrow(()-> new EntityNotFoundException("college admin not found"));

        placementCellMapper.update(collegeAdminIdentityPutRequest, admin);
        placementCellRepo.save(admin);

    }
}
