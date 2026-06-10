package com.yash.internSetuBe.modules.student.repo;

import com.yash.internSetuBe.modules.student.entity.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface SkillRepo extends JpaRepository<Skill, Long> {
}
