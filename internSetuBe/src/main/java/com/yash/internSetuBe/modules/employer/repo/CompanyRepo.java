package com.yash.internSetuBe.modules.employer.repo;


import com.yash.internSetuBe.modules.employer.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CompanyRepo extends JpaRepository<Company, Long> {
    Optional<Company> findByHrEmail(String email);


    @Query("SELECT e.company.id FROM Employer e WHERE e.id = :userId")
    Optional<Long> findIdByUserId(Long userId);

}
