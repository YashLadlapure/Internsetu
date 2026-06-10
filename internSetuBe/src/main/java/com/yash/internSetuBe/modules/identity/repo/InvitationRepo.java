package com.yash.internSetuBe.modules.identity.repo;

import com.yash.internSetuBe.modules.identity.entity.Invitation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface InvitationRepo extends JpaRepository<Invitation, Long> {

    boolean existsByCollegeIdAndEmail(Long collegeId, String email);

    boolean existsByCompanyIdAndEmail(Long companyId, String email);

    Optional<Invitation> findByToken(String token);
}
