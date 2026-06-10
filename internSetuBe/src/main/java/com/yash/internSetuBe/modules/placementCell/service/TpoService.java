package com.yash.internSetuBe.modules.placementCell.service;


import com.yash.internSetuBe.modules.employer.mapper.CompanyCollegeVerificationMapper;
import com.yash.internSetuBe.modules.internship.mapper.InternshipMapper;
import com.yash.internSetuBe.modules.identity.repo.UserRepo;
import com.yash.internSetuBe.modules.placementCell.dto.request.CollegeCompanyVerifyPostRequest;
import com.yash.internSetuBe.modules.placementCell.dto.request.TpoIdentityPutRequest;
import com.yash.internSetuBe.modules.placementCell.dto.response.TpoCompanyCollegeVerificationResponse;
import com.yash.internSetuBe.modules.placementCell.dto.response.TpoInternshipGetResponse;
import com.yash.internSetuBe.modules.internship.enums.InternshipStatus;
import com.yash.internSetuBe.modules.employer.entity.CompanyCollegeVerification;
import com.yash.internSetuBe.modules.internship.entity.InternshipPosting;
import com.yash.internSetuBe.modules.placementCell.entity.PlacementCell;
import com.yash.internSetuBe.modules.identity.service.UserService;
import com.yash.internSetuBe.modules.employer.repo.CompanyCollegeVerificationRepo;
import com.yash.internSetuBe.modules.employer.repo.CompanyRepo;
import com.yash.internSetuBe.modules.internship.mapper.InternshipPostingRepo;
import com.yash.internSetuBe.modules.placementCell.repo.PlacementCellRepo;
import com.yash.internSetuBe.modules.placementCell.mapper.PlacementCellMapper;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TpoService {

    // services
    private final UserService userService;


    // repos
    private final PlacementCellRepo placementCellRepo;
    private final CompanyCollegeVerificationRepo companyCollegeVerificationRepo;
    private final CompanyRepo companyRepo;
    private final InternshipPostingRepo internshipPostingRepo;
    private final UserRepo userRepo;

    // mappers
    private final PlacementCellMapper placementCellMapper;
    private final CompanyCollegeVerificationMapper companyCollegeVerificationMapper;
    private final InternshipMapper internshipMapper;


    public void updateIdentity(TpoIdentityPutRequest tpoIdentityPutRequest) {
        Long userId = userService.getCurrentUserId();
        PlacementCell tpo = placementCellRepo.findById(userId)
                .orElseThrow(()-> new EntityNotFoundException("TPO not found"));

        placementCellMapper.update(tpoIdentityPutRequest, tpo);
        placementCellRepo.save(tpo);
        return;

    }

    public List<TpoCompanyCollegeVerificationResponse> getCompanies() {

        Long userId = userService.getCurrentUserId();
        List<CompanyCollegeVerification> verifications = companyCollegeVerificationRepo.findByPlacementCellUserId(userId);

        return companyCollegeVerificationMapper.toTpoCompanyCollegeVerificationResponse(verifications);
    }

    public void verifyCompany(Long id, @Valid CollegeCompanyVerifyPostRequest collegeCompanyVerifyPostRequest) {

        Long userId = userService.getCurrentUserId();
        CompanyCollegeVerification companyCollegeVerification = companyCollegeVerificationRepo.findByTpoUserIdAndCompanyId(
                userId, id
        ).orElseThrow(()-> new EntityNotFoundException("company verification not found"));

        companyCollegeVerification.setStatus(collegeCompanyVerifyPostRequest.status());
        companyCollegeVerification.setText(collegeCompanyVerifyPostRequest.text());
        companyCollegeVerification.setVerifiedByUser(userRepo.getReferenceById(userId));

        companyCollegeVerificationRepo.save(companyCollegeVerification);
    }

    public List<TpoInternshipGetResponse> getInternships() {
        Long userId = userService.getCurrentUserId();

        List<InternshipPosting> internshipPostings = internshipPostingRepo.findByTpoUserId(userId);

        return internshipMapper.toTpoInternshipGetResponseList(internshipPostings);

    }

    public void updateInternshipStatus(Long id, InternshipStatus status) {
        Long UserId = userService.getCurrentUserId();
        internshipPostingRepo.updateStatusByIdAndTpoUserId(status, id, UserId);
    }
}
