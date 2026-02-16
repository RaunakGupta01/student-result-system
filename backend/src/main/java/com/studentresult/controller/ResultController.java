package com.studentresult.controller;

import com.studentresult.dto.ResultDTO;
import com.studentresult.model.Result;
import com.studentresult.service.ResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/results")
@CrossOrigin(origins = "http://localhost:3000")
public class ResultController {
    
    @Autowired
    private ResultService resultService;
    
    @GetMapping
    public ResponseEntity<List<Result>> getAllResults() {
        return ResponseEntity.ok(resultService.getAllResults());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Result> getResultById(@PathVariable Long id) {
        return resultService.getResultById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<ResultDTO>> getResultsByStudent(@PathVariable Long studentId) {
        return ResponseEntity.ok(resultService.getResultsByStudent(studentId));
    }
    
    @GetMapping("/student/{studentId}/semester/{semester}/year/{year}")
    public ResponseEntity<List<ResultDTO>> getResultsByStudentAndSemester(
            @PathVariable Long studentId,
            @PathVariable String semester,
            @PathVariable Integer year) {
        return ResponseEntity.ok(resultService.getResultsByStudentAndSemester(studentId, semester, year));
    }
    
    @PostMapping
    public ResponseEntity<?> createResult(@RequestBody Result result) {
        try {
            Result created = resultService.createResult(result);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateResult(@PathVariable Long id, @RequestBody Result result) {
        try {
            Result updated = resultService.updateResult(id, result);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteResult(@PathVariable Long id) {
        resultService.deleteResult(id);
        return ResponseEntity.noContent().build();
    }
}
