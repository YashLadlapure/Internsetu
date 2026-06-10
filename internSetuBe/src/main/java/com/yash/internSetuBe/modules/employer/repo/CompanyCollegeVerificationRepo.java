package com.yash.internSetuBe.modules.employer.repo;

import com.yash.internSetuBe.modules.employer.entity.Company;
import com.yash.internSetuBe.modules.employer.entity.CompanyCollegeVerification;
import com.yash.internSetuBe.modules.employer.enums.CompanyCollegeVerificationStatus;
import com.yash.internSetuBe.modules.placementCell.entity.College;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface CompanyCollegeVerificationRepo extends JpaRepository<CompanyCollegeVerification, Long> {


    Optional<CompanyCollegeVerification> findByCollegeAndCompany(College college, Company company);

    @Query("""
            SELECT v
            FROM CompanyCollegeVerification v
            JOIN FETCH v.college
            JOIN v.company c
            JOIN Employer e ON e.company = c
            WHERE e.id = :userId and v.status = :status
    """)
    List<CompanyCollegeVerification> findByEmployerUserId(Long userId, CompanyCollegeVerificationStatus status);


    @Query("""
        SELECT v
        FROM CompanyCollegeVerification v
        JOIN FETCH v.company
        JOIN v.college c
        JOIN PlacementCell p ON p.college = c
        WHERE p.id = :userId
    """)
    List<CompanyCollegeVerification> findByPlacementCellUserId(Long userId);

//    @Query("SELECT v FROM PlacementCell p JOIN p.college c JOIN c.companyCollegeVerification v WHERE p.id = :userId AND v.company.id = :companyId ")
    @Query("""
        SELECT v
        FROM CompanyCollegeVerification v
        JOIN v.college c
        JOIN PlacementCell p ON p.college = c
        WHERE p.id = :userId AND v.company.id = :companyId
    """)
    Optional<CompanyCollegeVerification> findByTpoUserIdAndCompanyId(Long userId, Long companyId);

}
