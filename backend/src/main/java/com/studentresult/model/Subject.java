package com.studentresult.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "subjects")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Subject {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String subjectCode;
    
    @Column(nullable = false)
    private String subjectName;
    
    @Column(nullable = false)
    private String className;
    
    @Column(nullable = false)
    private Integer totalMarks;
    
    @Column(nullable = false)
    private Integer passingMarks;
    
    @ManyToOne
    @JoinColumn(name = "teacher_id")
    private Teacher teacher;
}
