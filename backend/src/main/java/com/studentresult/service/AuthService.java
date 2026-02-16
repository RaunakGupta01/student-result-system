package com.studentresult.service;

import com.studentresult.dto.LoginRequest;
import com.studentresult.dto.LoginResponse;
import com.studentresult.model.Admin;
import com.studentresult.model.Student;
import com.studentresult.model.Teacher;
import com.studentresult.repository.AdminRepository;
import com.studentresult.repository.StudentRepository;
import com.studentresult.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    
    @Autowired
    private AdminRepository adminRepository;
    
    @Autowired
    private TeacherRepository teacherRepository;
    
    @Autowired
    private StudentRepository studentRepository;
    
    public LoginResponse login(LoginRequest request) {
        String role = request.getRole().toUpperCase();
        
        switch (role) {
            case "ADMIN":
                return loginAdmin(request);
            case "TEACHER":
                return loginTeacher(request);
            case "STUDENT":
                return loginStudent(request);
            default:
                return new LoginResponse(false, "Invalid role", null, null);
        }
    }
    
    private LoginResponse loginAdmin(LoginRequest request) {
        Optional<Admin> adminOpt = adminRepository.findByUsername(request.getUsername());
        
        if (adminOpt.isEmpty()) {
            return new LoginResponse(false, "Admin not found", null, null);
        }
        
        Admin admin = adminOpt.get();
        if (!admin.getPassword().equals(request.getPassword())) {
            return new LoginResponse(false, "Invalid password", null, null);
        }
        
        // Remove password before sending
        admin.setPassword(null);
        return new LoginResponse(true, "Login successful", "ADMIN", admin);
    }
    
    private LoginResponse loginTeacher(LoginRequest request) {
        Optional<Teacher> teacherOpt = teacherRepository.findByTeacherId(request.getUsername());
        
        if (teacherOpt.isEmpty()) {
            return new LoginResponse(false, "Teacher not found", null, null);
        }
        
        Teacher teacher = teacherOpt.get();
        if (!teacher.getPassword().equals(request.getPassword())) {
            return new LoginResponse(false, "Invalid password", null, null);
        }
        
        // Remove password before sending
        teacher.setPassword(null);
        return new LoginResponse(true, "Login successful", "TEACHER", teacher);
    }
    
    private LoginResponse loginStudent(LoginRequest request) {
        Optional<Student> studentOpt = studentRepository.findByRollNo(request.getUsername());
        
        if (studentOpt.isEmpty()) {
            return new LoginResponse(false, "Student not found", null, null);
        }
        
        Student student = studentOpt.get();
        if (!student.getPassword().equals(request.getPassword())) {
            return new LoginResponse(false, "Invalid password", null, null);
        }
        
        // Remove password before sending
        student.setPassword(null);
        return new LoginResponse(true, "Login successful", "STUDENT", student);
    }
}
