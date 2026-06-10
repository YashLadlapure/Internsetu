package com.yash.internSetuBe.modules.student.repo;

import com.yash.internSetuBe.modules.student.entity.Project;
import com.yash.internSetuBe.modules.student.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ProjectRepo extends JpaRepository<Project, Long> {

    
    void deleteByIdAndStudent(Long id, Student studentProfile);
}
