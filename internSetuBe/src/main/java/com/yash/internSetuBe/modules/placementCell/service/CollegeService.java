package com.yash.internSetuBe.modules.placementCell.service;

import com.yash.internSetuBe.modules.placementCell.dto.request.CollegeRegisterRequest;
import com.yash.internSetuBe.modules.placementCell.dto.response.CollegeResponse;
import com.yash.internSetuBe.modules.placementCell.mapper.CollegeMapper;
import com.yash.internSetuBe.modules.placementCell.repo.CollegeRepo;
import lombok.RequiredArgsConstructor;
import org.hibernate.DuplicateMappingException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CollegeService {

    private final CollegeRepo collegeRepo;

    private final CollegeMapper collegeMapper;

    public CollegeResponse createCollege(CollegeRegisterRequest collegeRegisterRequest) {
        if(collegeRepo.existsByEmailDomain(collegeRegisterRequest.emailDomain())){
            throw new DuplicateMappingException(DuplicateMappingException.Type.ENTITY, "college with domain already exists");
        }

        return collegeMapper.toResponse(
                collegeRepo.save(
                        collegeMapper.toEntity(collegeRegisterRequest)
                )
        );
    }

    public List<CollegeResponse> retrieveAllColleges() {
        return collegeMapper.toResponse(
                collegeRepo.findAll()
        );
    }

}
