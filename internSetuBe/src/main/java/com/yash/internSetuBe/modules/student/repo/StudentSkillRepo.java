package com.yash.internSetuBe.modules.student.repo;

import com.yash.internSetuBe.modules.student.entity.Student;
import com.yash.internSetuBe.modules.student.entity.StudentSkill;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface StudentSkillRepo extends JpaRepository<StudentSkill, Long> {

    @Transactional
    void deleteByIdAndStudent(Long studentSkillId, Student referenceById);
}
