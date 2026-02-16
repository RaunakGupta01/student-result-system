package com.studentresult.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "results")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Result {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;
    
    @ManyToOne
    @JoinColumn(name = "subject_id", nullable = false)
    private Subject subject;
    
    @Column(nullable = false)
    private Integer marksObtained;
    
    @Column(nullable = false)
    private String examType; // Mid-term, Final, Quiz, Assignment
    
    @Column(nullable = false)
    private String semester;
    
    @Column(nullable = false)
    private Integer year;
    
    private String grade;
    
    private String remarks;
    
    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    
    @Column(nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();
    
    @ManyToOne
    @JoinColumn(name = "teacher_id")
    private Teacher enteredBy;
    
    @PreUpdate
    public void preUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
