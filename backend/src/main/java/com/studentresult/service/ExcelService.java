package com.studentresult.service;

import com.studentresult.dto.ResultDTO;
import com.studentresult.model.Student;
import com.studentresult.model.Teacher;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@Service
public class ExcelService {
    
    private static final Logger logger = LoggerFactory.getLogger(ExcelService.class);
    
    public byte[] exportStudentsToExcel(List<Student> students) {
        try (Workbook workbook = new XSSFWorkbook(); 
             ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            
            Sheet sheet = workbook.createSheet("Students");
            
            // Header Style
            CellStyle headerStyle = createHeaderStyle(workbook);
            
            // Header Row
            Row headerRow = sheet.createRow(0);
            String[] headers = {"Roll No", "Name", "Email", "Phone", "Class", "Section", "Guardian Name", "Guardian Phone"};
            
            for (int i = 0; i < headers.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers[i]);
                cell.setCellStyle(headerStyle);
            }
            
            // Data Rows
            int rowNum = 1;
            for (Student student : students) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(student.getRollNo());
                row.createCell(1).setCellValue(student.getName());
                row.createCell(2).setCellValue(student.getEmail());
                row.createCell(3).setCellValue(student.getPhone());
                row.createCell(4).setCellValue(student.getClassName());
                row.createCell(5).setCellValue(student.getSection());
                row.createCell(6).setCellValue(student.getGuardianName() != null ? student.getGuardianName() : "");
                row.createCell(7).setCellValue(student.getGuardianPhone() != null ? student.getGuardianPhone() : "");
            }
            
            // Auto-size columns
            for (int i = 0; i < headers.length; i++) {
                sheet.autoSizeColumn(i);
            }
            
            workbook.write(baos);
            logger.info("Excel export completed for {} students", students.size());
            return baos.toByteArray();
            
        } catch (IOException e) {
            logger.error("Error exporting students to Excel", e);
            return new byte[0];
        }
    }
    
    public byte[] exportTeachersToExcel(List<Teacher> teachers) {
        try (Workbook workbook = new XSSFWorkbook(); 
             ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            
            Sheet sheet = workbook.createSheet("Teachers");
            
            // Header Style
            CellStyle headerStyle = createHeaderStyle(workbook);
            
            // Header Row
            Row headerRow = sheet.createRow(0);
            String[] headers = {"Teacher ID", "Name", "Email", "Phone", "Department"};
            
            for (int i = 0; i < headers.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers[i]);
                cell.setCellStyle(headerStyle);
            }
            
            // Data Rows
            int rowNum = 1;
            for (Teacher teacher : teachers) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(teacher.getTeacherId());
                row.createCell(1).setCellValue(teacher.getName());
                row.createCell(2).setCellValue(teacher.getEmail());
                row.createCell(3).setCellValue(teacher.getPhone());
                row.createCell(4).setCellValue(teacher.getDepartment());
            }
            
            // Auto-size columns
            for (int i = 0; i < headers.length; i++) {
                sheet.autoSizeColumn(i);
            }
            
            workbook.write(baos);
            logger.info("Excel export completed for {} teachers", teachers.size());
            return baos.toByteArray();
            
        } catch (IOException e) {
            logger.error("Error exporting teachers to Excel", e);
            return new byte[0];
        }
    }
    
    public byte[] exportResultsToExcel(List<ResultDTO> results) {
        try (Workbook workbook = new XSSFWorkbook(); 
             ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            
            Sheet sheet = workbook.createSheet("Results");
            
            // Header Style
            CellStyle headerStyle = createHeaderStyle(workbook);
            CellStyle gradeStyle = workbook.createCellStyle();
            gradeStyle.setAlignment(HorizontalAlignment.CENTER);
            Font gradeFont = workbook.createFont();
            gradeFont.setBold(true);
            gradeStyle.setFont(gradeFont);
            
            // Header Row
            Row headerRow = sheet.createRow(0);
            String[] headers = {"Roll No", "Student Name", "Subject", "Exam Type", "Marks Obtained", 
                               "Total Marks", "Percentage", "Grade", "Semester", "Year", "Teacher"};
            
            for (int i = 0; i < headers.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers[i]);
                cell.setCellStyle(headerStyle);
            }
            
            // Data Rows
            int rowNum = 1;
            for (ResultDTO result : results) {
                Row row = sheet.createRow(rowNum++);
                double percentage = (result.getMarksObtained() * 100.0) / result.getTotalMarks();
                
                row.createCell(0).setCellValue(result.getRollNo());
                row.createCell(1).setCellValue(result.getStudentName());
                row.createCell(2).setCellValue(result.getSubjectName());
                row.createCell(3).setCellValue(result.getExamType());
                row.createCell(4).setCellValue(result.getMarksObtained());
                row.createCell(5).setCellValue(result.getTotalMarks());
                row.createCell(6).setCellValue(String.format("%.2f%%", percentage));
                
                Cell gradeCell = row.createCell(7);
                gradeCell.setCellValue(result.getGrade());
                gradeCell.setCellStyle(gradeStyle);
                
                row.createCell(8).setCellValue(result.getSemester());
                row.createCell(9).setCellValue(result.getYear());
                row.createCell(10).setCellValue(result.getTeacherName() != null ? result.getTeacherName() : "");
            }
            
            // Auto-size columns
            for (int i = 0; i < headers.length; i++) {
                sheet.autoSizeColumn(i);
            }
            
            workbook.write(baos);
            logger.info("Excel export completed for {} results", results.size());
            return baos.toByteArray();
            
        } catch (IOException e) {
            logger.error("Error exporting results to Excel", e);
            return new byte[0];
        }
    }
    
    private CellStyle createHeaderStyle(Workbook workbook) {
        CellStyle style = workbook.createCellStyle();
        style.setFillForegroundColor(IndexedColors.DARK_BLUE.getIndex());
        style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        
        Font font = workbook.createFont();
        font.setColor(IndexedColors.WHITE.getIndex());
        font.setBold(true);
        style.setFont(font);
        
        style.setAlignment(HorizontalAlignment.CENTER);
        style.setVerticalAlignment(VerticalAlignment.CENTER);
        
        return style;
    }
}