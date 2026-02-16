package com.studentresult.controller;

import com.studentresult.dto.ResultDTO;
import com.studentresult.model.Student;
import com.studentresult.model.Teacher;
import com.studentresult.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/export")
@CrossOrigin(origins = "http://localhost:3000")
public class ExportController {
    
    @Autowired
    private ExcelService excelService;
    
    @Autowired
    private PDFService pdfService;
    
    @Autowired
    private StudentService studentService;
    
    @Autowired
    private TeacherService teacherService;
    
    @Autowired
    private ResultService resultService;
    
    // Export Students to Excel
    @GetMapping("/students/excel")
    public ResponseEntity<byte[]> exportStudentsToExcel() {
        List<Student> students = studentService.getAllStudents();
        byte[] excel = excelService.exportStudentsToExcel(students);
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", "students_export.xlsx");
        
        return ResponseEntity.ok().headers(headers).body(excel);
    }
    
    // Export Teachers to Excel
    @GetMapping("/teachers/excel")
    public ResponseEntity<byte[]> exportTeachersToExcel() {
        List<Teacher> teachers = teacherService.getAllTeachers();
        byte[] excel = excelService.exportTeachersToExcel(teachers);
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", "teachers_export.xlsx");
        
        return ResponseEntity.ok().headers(headers).body(excel);
    }
    
    // Export Results to Excel
    @GetMapping("/results/excel")
    public ResponseEntity<byte[]> exportResultsToExcel() {
        List<ResultDTO> results = resultService.getAllResults().stream()
            .map(r -> {
                ResultDTO dto = new ResultDTO();
                dto.setStudentName(r.getStudent().getName());
                dto.setRollNo(r.getStudent().getRollNo());
                dto.setSubjectName(r.getSubject().getSubjectName());
                dto.setSubjectCode(r.getSubject().getSubjectCode());
                dto.setMarksObtained(r.getMarksObtained());
                dto.setTotalMarks(r.getSubject().getTotalMarks());
                dto.setGrade(r.getGrade());
                dto.setExamType(r.getExamType());
                dto.setSemester(r.getSemester());
                dto.setYear(r.getYear());
                dto.setTeacherName(r.getEnteredBy() != null ? r.getEnteredBy().getName() : "");
                return dto;
            })
            .collect(java.util.stream.Collectors.toList());
        
        byte[] excel = excelService.exportResultsToExcel(results);
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", "results_export.xlsx");
        
        return ResponseEntity.ok().headers(headers).body(excel);
    }
    
    // Download Student Result PDF
    @GetMapping("/results/student/{studentId}/pdf")
    public ResponseEntity<byte[]> downloadStudentResultPDF(@PathVariable Long studentId) {
        Student student = studentService.getStudentById(studentId)
            .orElseThrow(() -> new RuntimeException("Student not found"));
        
        List<ResultDTO> results = resultService.getResultsByStudent(studentId);
        
        byte[] pdf = pdfService.generateStudentResultPDF(student, results, "All", 2024);
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "result_" + student.getRollNo() + ".pdf");
        
        return ResponseEntity.ok().headers(headers).body(pdf);
    }
}