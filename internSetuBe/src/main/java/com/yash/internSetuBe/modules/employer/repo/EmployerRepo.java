package com.yash.internSetuBe.modules.employer.repo;

import com.yash.internSetuBe.modules.employer.entity.Employer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface EmployerRepo extends JpaRepository<Employer, Long> {
}
