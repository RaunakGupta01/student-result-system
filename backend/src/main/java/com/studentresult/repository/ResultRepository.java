package com.studentresult.repository;

import com.studentresult.model.Result;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ResultRepository extends JpaRepository<Result, Long> {
    List<Result> findByStudentId(Long studentId);
    List<Result> findBySubjectId(Long subjectId);
    List<Result> findByStudentIdAndSemesterAndYear(Long studentId, String semester, Integer year);
    Optional<Result> findByStudentIdAndSubjectIdAndExamTypeAndSemesterAndYear(
        Long studentId, Long subjectId, String examType, String semester, Integer year);
    
    @Query("SELECT r FROM Result r WHERE r.student.className = ?1 AND r.semester = ?2 AND r.year = ?3")
    List<Result> findByClassAndSemesterAndYear(String className, String semester, Integer year);
}
