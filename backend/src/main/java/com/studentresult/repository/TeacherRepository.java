package com.studentresult.repository;

import com.studentresult.model.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher, Long> {
    Optional<Teacher> findByTeacherId(String teacherId);
    Optional<Teacher> findByEmail(String email);
    boolean existsByTeacherId(String teacherId);
    boolean existsByEmail(String email);
}
