package com.yash.internSetuBe.modules.placementCell.repo;

import com.yash.internSetuBe.modules.placementCell.entity.College;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface CollegeRepo extends JpaRepository<College, Long> {

    boolean existsByEmailDomain(String emailDomain);

    boolean existsById(Long id);


    <T> List<T> findBy(Class<T> type);

    @Query("SELECT c.id FROM PlacementCell p JOIN p.college c WHERE p.id = :userId")
    Optional<Long> findIdByPlacementCellUserId(Long userId);


    @Query("SELECT c.emailDomain FROM College c WHERE c.id = :id")
    Optional<String> findEmailDomainById(Long id);
}
