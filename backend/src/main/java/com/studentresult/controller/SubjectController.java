package com.studentresult.controller;

import com.studentresult.model.Subject;
import com.studentresult.service.SubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subjects")
@CrossOrigin(origins = "http://localhost:3000")
public class SubjectController {
    
    @Autowired
    private SubjectService subjectService;
    
    @GetMapping
    public ResponseEntity<List<Subject>> getAllSubjects() {
        return ResponseEntity.ok(subjectService.getAllSubjects());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Subject> getSubjectById(@PathVariable Long id) {
        return subjectService.getSubjectById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/class/{className}")
    public ResponseEntity<List<Subject>> getSubjectsByClass(@PathVariable String className) {
        return ResponseEntity.ok(subjectService.getSubjectsByClass(className));
    }
    
    @GetMapping("/teacher/{teacherId}")
    public ResponseEntity<List<Subject>> getSubjectsByTeacher(@PathVariable Long teacherId) {
        return ResponseEntity.ok(subjectService.getSubjectsByTeacher(teacherId));
    }
    
    @PostMapping
    public ResponseEntity<?> createSubject(@RequestBody Subject subject) {
        try {
            Subject created = subjectService.createSubject(subject);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateSubject(@PathVariable Long id, @RequestBody Subject subject) {
        try {
            Subject updated = subjectService.updateSubject(id, subject);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSubject(@PathVariable Long id) {
        subjectService.deleteSubject(id);
        return ResponseEntity.noContent().build();
    }
}
