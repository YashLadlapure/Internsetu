package com.yash.internSetuBe.modules.student.repo;

import com.yash.internSetuBe.modules.student.entity.Student;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface StudentRepo extends JpaRepository<Student, Long> {
    Optional<Student> findByUserId(Long id);

    @Modifying
    @Transactional
    @Query("UPDATE Student s SET s.about =:about WHERE s.id = :userId")
    void updateAboutById(String about, Long userId);


}
