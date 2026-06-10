package com.yash.internSetuBe.modules.teacher.repo;

import com.yash.internSetuBe.modules.teacher.entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface TeacherRepo extends JpaRepository<Teacher, Long> {
}
