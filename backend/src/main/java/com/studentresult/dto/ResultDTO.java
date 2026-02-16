package com.studentresult.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResultDTO {
    private Long id;
    private String studentName;
    private String rollNo;
    private String subjectName;
    private String subjectCode;
    private Integer marksObtained;
    private Integer totalMarks;
    private String grade;
    private String examType;
    private String semester;
    private Integer year;
    private String remarks;
    private String teacherName;
}
