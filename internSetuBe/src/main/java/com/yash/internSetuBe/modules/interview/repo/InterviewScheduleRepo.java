package com.yash.internSetuBe.modules.interview.repo;

import com.yash.internSetuBe.modules.interview.entity.InterviewSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface InterviewScheduleRepo extends JpaRepository<InterviewSchedule, Long> {

    @Query("""
            SELECT is
            FROM InterviewSchedule is
            JOIN FETCH is.application a
            JOIN FETCh a.internship i
            JOIN FETCH i.student s
            JOIN FETCH s.user u
            JOIN FETCH i.college c
            WHERE i.employer.user.id = :userId
        """)
    List<InterviewSchedule> findByEmployerUserId(Long userId);
}
