package com.yash.internSetuBe.modules.application.repo;

import com.yash.internSetuBe.modules.internship.entity.InternshipPosting;
import com.yash.internSetuBe.modules.application.entity.InternshipApplication;
import com.yash.internSetuBe.modules.student.entity.Student;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface InternshipApplicationRepo extends JpaRepository<InternshipApplication, Long> {

    boolean existsByInternshipPostingAndStudent(@NotNull(message = "Internship ID cannot be null") InternshipPosting posting, Student referenceById);


    @Query("""
        SELECT a
        FROM InternshipApplication a
        LEFT JOIN FETCH a.approvedByTeacher t
        LEFT JOIN FETCH t.user u
        LEFT JOIN FETCH a.internshipPosting
        WHERE a.student.id = :userId
    """)
    List<InternshipApplication> findByStudentUserId(Long userId);

    Optional<InternshipApplication> findByIdAndStudent(Long id, Student referenceById);

    @Query("""
        SELECT a
        FROM InternshipApplication a
        LEFT JOIN FETCH a.student s
        LEFT JOIN FETCH s.user u
        LEFT JOIN FETCH a.internshipPosting i
        JOIN i.college c
        JOIN Teacher t ON c.id = t.college.id
        WHERE t.id = :userId
    """)
    List<InternshipApplication> findByTeacherUserId(Long userId);

    @Query("""
        SELECT a
        FROM InternshipApplication a
        LEFT JOIN FETCH a.student s
        LEFT JOIN FETCH a.internshipPosting i
        JOIN i.college c
        JOIN Teacher t ON c.id = t.college.id
        WHERE t.id = :userId
        AND a.id = :id
    """)
    InternshipApplication findByIdAndTeacherUserId(Long id, Long userId);

    @Query("""
        SELECT a
        FROM InternshipApplication a
        LEFT JOIN FETCH a.student s
        LEFT JOIN FETCH s.user u
        LEFT JOIN FETCH a.internshipPosting i
        LEFT JOIN FETCH i.college c
        JOIN i.company comp
        JOIN Employer e ON comp.id = e.company.id
        WHERE e.id = :userId
        AND a.isApproved = :b
    """)
    List<InternshipApplication> findByEmployerUserIdAndIsApproved(Long userId, boolean b);


    @Query("""
        SELECT a
        FROM InternshipApplication a
        JOIN a.internshipPosting i
        JOIN i.company comp
        JOIN Employer e ON comp.id = e.company.id
        WHERE e.id = :userId
        AND a.id = :applicationId
    """)
    Optional<InternshipApplication> findByIdAndEmployerUserId(Long applicationId, Long userId);
}
