package com.studentresult.service;

import com.studentresult.dto.ResultDTO;
import com.studentresult.model.Result;
import com.studentresult.repository.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ResultService {
    
    @Autowired
    private ResultRepository resultRepository;
    
    @Autowired
    private EmailService emailService;
    
    public List<Result> getAllResults() {
        return resultRepository.findAll();
    }
    
    public Optional<Result> getResultById(Long id) {
        return resultRepository.findById(id);
    }
    
    public List<ResultDTO> getResultsByStudent(Long studentId) {
        List<Result> results = resultRepository.findByStudentId(studentId);
        return convertToDTO(results);
    }
    
    public List<ResultDTO> getResultsByStudentAndSemester(Long studentId, String semester, Integer year) {
        List<Result> results = resultRepository.findByStudentIdAndSemesterAndYear(studentId, semester, year);
        return convertToDTO(results);
    }
    
    public Result createResult(Result result) {
        // Calculate grade based on marks
        result.setGrade(calculateGrade(result.getMarksObtained(), result.getSubject().getTotalMarks()));
        Result savedResult = resultRepository.save(result);
        
        // Send result notification email
        try {
            emailService.sendResultNotification(
                result.getStudent().getEmail(),
                result.getStudent().getName(),
                result.getSubject().getSubjectName(),
                result.getMarksObtained(),
                result.getSubject().getTotalMarks(),
                result.getGrade(),
                result.getExamType()
            );
        } catch (Exception e) {
            // Email failed but result was saved
            System.out.println("Failed to send result notification: " + e.getMessage());
        }
        
        return savedResult;
    }
    
    public Result updateResult(Long id, Result result) {
        Optional<Result> existingResult = resultRepository.findById(id);
        if (existingResult.isEmpty()) {
            throw new RuntimeException("Result not found");
        }
        
        Result updatedResult = existingResult.get();
        updatedResult.setMarksObtained(result.getMarksObtained());
        updatedResult.setExamType(result.getExamType());
        updatedResult.setSemester(result.getSemester());
        updatedResult.setYear(result.getYear());
        updatedResult.setRemarks(result.getRemarks());
        updatedResult.setGrade(calculateGrade(result.getMarksObtained(), result.getSubject().getTotalMarks()));
        
        return resultRepository.save(updatedResult);
    }
    
    public void deleteResult(Long id) {
        resultRepository.deleteById(id);
    }
    
    private String calculateGrade(Integer marks, Integer totalMarks) {
        double percentage = (marks * 100.0) / totalMarks;
        
        if (percentage >= 90) return "A+";
        else if (percentage >= 80) return "A";
        else if (percentage >= 70) return "B+";
        else if (percentage >= 60) return "B";
        else if (percentage >= 50) return "C";
        else if (percentage >= 40) return "D";
        else return "F";
    }
    
    private List<ResultDTO> convertToDTO(List<Result> results) {
        return results.stream()
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
                dto.setRemarks(r.getRemarks());
                dto.setTeacherName(r.getEnteredBy() != null ? r.getEnteredBy().getName() : "");
                return dto;
            })
            .collect(Collectors.toList());
    }
}