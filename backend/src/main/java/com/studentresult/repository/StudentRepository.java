package com.studentresult.repository;

import com.studentresult.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByRollNo(String rollNo);
    Optional<Student> findByEmail(String email);
    List<Student> findByClassName(String className);
    List<Student> findByClassNameAndSection(String className, String section);
    boolean existsByRollNo(String rollNo);
    boolean existsByEmail(String email);
}
