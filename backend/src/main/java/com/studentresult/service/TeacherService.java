package com.studentresult.service;

import com.studentresult.model.Teacher;
import com.studentresult.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TeacherService {
    
    @Autowired
    private TeacherRepository teacherRepository;
    
    @Autowired
    private EmailService emailService;
    
    public List<Teacher> getAllTeachers() {
        return teacherRepository.findAll();
    }
    
    public Optional<Teacher> getTeacherById(Long id) {
        return teacherRepository.findById(id);
    }
    
    public Optional<Teacher> getTeacherByTeacherId(String teacherId) {
        return teacherRepository.findByTeacherId(teacherId);
    }
    
    public Teacher createTeacher(Teacher teacher) {
        if (teacherRepository.existsByTeacherId(teacher.getTeacherId())) {
            throw new RuntimeException("Teacher ID already exists");
        }
        if (teacherRepository.existsByEmail(teacher.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        
        Teacher savedTeacher = teacherRepository.save(teacher);
        
        // Send credentials email
        try {
            emailService.sendTeacherCredentials(
                savedTeacher.getEmail(),
                savedTeacher.getName(),
                savedTeacher.getTeacherId(),
                savedTeacher.getPassword()
            );
        } catch (Exception e) {
            // Email failed but teacher was created
            System.out.println("Failed to send email: " + e.getMessage());
        }
        
        return savedTeacher;
    }
    
    public Teacher updateTeacher(Long id, Teacher teacher) {
        Optional<Teacher> existingTeacher = teacherRepository.findById(id);
        if (existingTeacher.isEmpty()) {
            throw new RuntimeException("Teacher not found");
        }
        
        Teacher updatedTeacher = existingTeacher.get();
        String teacherEmail = updatedTeacher.getEmail();
        String teacherName = teacher.getName() != null ? teacher.getName() : updatedTeacher.getName();
        
        updatedTeacher.setName(teacher.getName());
        updatedTeacher.setEmail(teacher.getEmail());
        updatedTeacher.setPhone(teacher.getPhone());
        updatedTeacher.setDepartment(teacher.getDepartment());
        
        if (teacher.getPassword() != null && !teacher.getPassword().isEmpty()) {
            updatedTeacher.setPassword(teacher.getPassword());
        }
        
        Teacher saved = teacherRepository.save(updatedTeacher);
        
        // Send update notification email
        try {
            emailService.sendTeacherUpdateNotification(teacherEmail, teacherName);
        } catch (Exception e) {
            // Email failed but teacher was updated
            System.out.println("Failed to send update email: " + e.getMessage());
        }
        
        return saved;
    }
    
    public void deleteTeacher(Long id) {
        if (!teacherRepository.existsById(id)) {
            throw new RuntimeException("Teacher not found");
        }
        teacherRepository.deleteById(id);
    }
}