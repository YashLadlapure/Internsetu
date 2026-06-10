package com.yash.internSetuBe.modules.internship.mapper;

import com.yash.internSetuBe.modules.internship.enums.InternshipStatus;
import com.yash.internSetuBe.modules.placementCell.entity.College;
import com.yash.internSetuBe.modules.internship.entity.InternshipPosting;
import com.yash.internSetuBe.modules.internship.dto.response.StudentInternshipWithStatus;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface InternshipPostingRepo extends JpaRepository<InternshipPosting, Long> {

    @Modifying
    @Transactional
    @Query("UPDATE InternshipPosting i SET i.status = :status WHERE i.id = :id AND i.college = :college")
    void updateStatusByIdAndTpo(InternshipStatus status, Long id, College college);

    List<InternshipPosting> findByCollege(College college);

    List<InternshipPosting> findByCollegeAndStatus(College college, InternshipStatus status);


    @Query("""
           SELECT i
           FROM InternshipPosting i
           JOIN FETCH i.college
           JOIN i.company c
           JOIN Employer e ON e.company = c
           WHERE e.id = :userId
           """)
    List<InternshipPosting> findByEmployerUserId(Long userId);

    @Query("""
           SELECT i
           FROM InternshipPosting i
           JOIN FETCH i.company
           JOIN i.college c
           JOIN PlacementCell p ON p.college = c
           WHERE p.id = :userId
           """)
    List<InternshipPosting> findByTpoUserId(Long userId);

    @Modifying
    @Transactional
    @Query("UPDATE InternshipPosting i SET i.status = :status WHERE i.id = :id AND i.college IN (SELECT p.college FROM PlacementCell p WHERE p.id = :userId)")
    void updateStatusByIdAndTpoUserId(InternshipStatus status, Long id, Long userId);

    @Query("""
       SELECT
           i as internship,
           (CASE WHEN (
               SELECT COUNT(app)
               FROM InternshipApplication app
               WHERE app.internshipPosting = i
               AND app.student.id = :userId
           ) > 0 THEN true ELSE false END) as isApplied
       FROM InternshipPosting i
       JOIN FETCH i.company
       JOIN i.college c
       JOIN Student s ON s.college = c
       WHERE s.id = :userId
       AND i.status = :internshipStatus
       """)
    List<StudentInternshipWithStatus> findByStudentUserIdAndStatus(Long userId, InternshipStatus internshipStatus);

    @Query("""
        SELECT i
        FROM InternshipPosting i
        JOIN FETCH i.company
        JOIN i.college c
        JOIN Teacher t ON t.college = c
        WHERE t.id = :teacherId
        AND i.status = :status
    """)
    List<InternshipPosting> findByTeacherIdAndStatus(Long teacherId, InternshipStatus status);


}
