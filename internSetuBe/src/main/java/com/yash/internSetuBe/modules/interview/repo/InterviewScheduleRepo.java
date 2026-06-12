package com.yash.internSetuBe.modules.interview.repo;

import com.yash.internSetuBe.modules.interview.entity.InterviewSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface InterviewScheduleRepo extends JpaRepository<InterviewSchedule, Long> {

    @Query("""
            SELECT schedule
            FROM InterviewSchedule schedule
            JOIN FETCH schedule.application application
            JOIN FETCH application.internshipPosting posting
            JOIN FETCH application.student student
            JOIN FETCH student.user user
            JOIN FETCH posting.company company
            JOIN FETCH posting.college college
            JOIN Employer employer ON company.id = employer.company.id
            WHERE employer.id = :userId
        """)
    List<InterviewSchedule> findByEmployerUserId(Long userId);
}
