package com.yash.internSetuBe.modules.placementCell.repo;


import com.yash.internSetuBe.modules.placementCell.entity.PlacementCell;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface PlacementCellRepo extends JpaRepository<PlacementCell, Long> {
    Optional<PlacementCell> findByUserId(Long id);
}
