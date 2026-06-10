package com.yash.internSetuBe.modules.employer.service;


import com.yash.internSetuBe.modules.employer.dto.request.CompanyCollegeVerificationPostRequest;
import com.yash.internSetuBe.modules.employer.dto.response.EmployerCollegeGetResponse;
import com.yash.internSetuBe.modules.employer.mapper.CompanyCollegeVerificationMapper;
import com.yash.internSetuBe.modules.placementCell.entity.College;
import com.yash.internSetuBe.modules.employer.entity.CompanyCollegeVerification;
import com.yash.internSetuBe.modules.identity.service.UserService;
import com.yash.internSetuBe.modules.placementCell.repo.CollegeRepo;
import com.yash.internSetuBe.modules.employer.repo.CompanyCollegeVerificationRepo;
import com.yash.internSetuBe.modules.employer.repo.CompanyRepo;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class HrService {

    private final UserService userService;
    private final CompanyRepo companyRepo;
    private final CollegeRepo collegeRepo;
    private final CompanyCollegeVerificationRepo companyCollegeVerificationRepo;

    private final CompanyCollegeVerificationMapper companyCollegeVerificationMapper;

    public EmployerCollegeGetResponse verificationRequestToCollege(CompanyCollegeVerificationPostRequest companyCollegeVerificationPostRequest) {
        Long userId = userService.getCurrentUserId();

        Long companyId = companyRepo.findIdByUserId(userId).orElseThrow(()-> new EntityNotFoundException("company not found"));
        College college = collegeRepo.findById(companyCollegeVerificationPostRequest.collegeId()).orElseThrow(()-> new EntityNotFoundException("college not found"));

        CompanyCollegeVerification companyCollegeVerification = companyCollegeVerificationMapper.toEntity(companyCollegeVerificationPostRequest, college, companyRepo.getReferenceById(companyId));
        companyCollegeVerificationRepo.save(companyCollegeVerification);

        return companyCollegeVerificationMapper.toEmployerCollegesGetResponse(companyCollegeVerification);

    }
}
