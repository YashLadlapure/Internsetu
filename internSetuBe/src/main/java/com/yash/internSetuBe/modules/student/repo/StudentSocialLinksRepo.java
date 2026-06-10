package com.yash.internSetuBe.modules.student.repo;

import com.yash.internSetuBe.modules.student.entity.Student;
import com.yash.internSetuBe.modules.student.entity.StudentSocialLink;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import java.util.Optional;



@Repository
public interface StudentSocialLinksRepo extends JpaRepository<StudentSocialLink, Long> {

    @Transactional
    @Modifying
    void deleteByIdAndStudent(Long id, Student studentProfile);

    Optional<StudentSocialLink> findByIdAndStudent(Long id, Student studentProfile);
}
