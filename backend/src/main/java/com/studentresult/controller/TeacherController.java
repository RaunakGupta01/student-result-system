package com.studentresult.controller;

import com.studentresult.model.Teacher;
import com.studentresult.service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teachers")
@CrossOrigin(origins = "http://localhost:3000")
public class TeacherController {
    
    @Autowired
    private TeacherService teacherService;
    
    @GetMapping
    public ResponseEntity<List<Teacher>> getAllTeachers() {
        return ResponseEntity.ok(teacherService.getAllTeachers());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Teacher> getTeacherById(@PathVariable Long id) {
        return teacherService.getTeacherById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/teacherId/{teacherId}")
    public ResponseEntity<Teacher> getTeacherByTeacherId(@PathVariable String teacherId) {
        return teacherService.getTeacherByTeacherId(teacherId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<?> createTeacher(@RequestBody Teacher teacher) {
        try {
            Teacher created = teacherService.createTeacher(teacher);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateTeacher(@PathVariable Long id, @RequestBody Teacher teacher) {
        try {
            Teacher updated = teacherService.updateTeacher(id, teacher);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTeacher(@PathVariable Long id) {
        teacherService.deleteTeacher(id);
        return ResponseEntity.noContent().build();
    }
}
