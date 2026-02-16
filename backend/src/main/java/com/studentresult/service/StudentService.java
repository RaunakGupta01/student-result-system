package com.studentresult.service;

import com.studentresult.model.Student;
import com.studentresult.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {
    
    @Autowired
    private StudentRepository studentRepository;
    
    @Autowired
    private EmailService emailService;
    
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }
    
    public Optional<Student> getStudentById(Long id) {
        return studentRepository.findById(id);
    }
    
    public Optional<Student> getStudentByRollNo(String rollNo) {
        return studentRepository.findByRollNo(rollNo);
    }
    
    public List<Student> getStudentsByClass(String className) {
        return studentRepository.findByClassName(className);
    }
    
    public Student createStudent(Student student) {
        if (studentRepository.existsByRollNo(student.getRollNo())) {
            throw new RuntimeException("Roll number already exists");
        }
        if (studentRepository.existsByEmail(student.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        
        Student savedStudent = studentRepository.save(student);
        
        // Send credentials email
        try {
            emailService.sendStudentCredentials(
                savedStudent.getEmail(),
                savedStudent.getName(),
                savedStudent.getRollNo(),
                savedStudent.getPassword()
            );
        } catch (Exception e) {
            // Email failed but student was created
            System.out.println("Failed to send email: " + e.getMessage());
        }
        
        return savedStudent;
    }
    
    public Student updateStudent(Long id, Student student) {
        Optional<Student> existingStudent = studentRepository.findById(id);
        if (existingStudent.isEmpty()) {
            throw new RuntimeException("Student not found");
        }
        
        Student updatedStudent = existingStudent.get();
        updatedStudent.setName(student.getName());
        updatedStudent.setEmail(student.getEmail());
        updatedStudent.setPhone(student.getPhone());
        updatedStudent.setClassName(student.getClassName());
        updatedStudent.setSection(student.getSection());
        updatedStudent.setGuardianName(student.getGuardianName());
        updatedStudent.setGuardianPhone(student.getGuardianPhone());
        
        if (student.getPassword() != null && !student.getPassword().isEmpty()) {
            updatedStudent.setPassword(student.getPassword());
        }
        
        return studentRepository.save(updatedStudent);
    }
    
    public void deleteStudent(Long id) {
        if (!studentRepository.existsById(id)) {
            throw new RuntimeException("Student not found");
        }
        studentRepository.deleteById(id);
    }
}