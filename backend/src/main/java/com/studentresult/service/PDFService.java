package com.studentresult.service;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import com.studentresult.dto.ResultDTO;
import com.studentresult.model.Student;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@Service
public class PDFService {
    
    private static final Logger logger = LoggerFactory.getLogger(PDFService.class);
    
    private static final Font TITLE_FONT = new Font(Font.FontFamily.HELVETICA, 20, Font.BOLD, BaseColor.DARK_GRAY);
    private static final Font HEADER_FONT = new Font(Font.FontFamily.HELVETICA, 12, Font.BOLD, BaseColor.WHITE);
    private static final Font NORMAL_FONT = new Font(Font.FontFamily.HELVETICA, 10, Font.NORMAL, BaseColor.BLACK);
    private static final Font BOLD_FONT = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD, BaseColor.BLACK);
    
    public byte[] generateStudentResultPDF(Student student, List<ResultDTO> results, String semester, Integer year) {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        
        try {
            Document document = new Document(PageSize.A4);
            PdfWriter.getInstance(document, baos);
            document.open();
            
            // Header
            addHeader(document);
            
            // Student Info
            addStudentInfo(document, student);
            
            document.add(Chunk.NEWLINE);
            
            // Results Table
            addResultsTable(document, results);
            
            document.add(Chunk.NEWLINE);
            
            // Summary
            addSummary(document, results);
            
            // Footer
            addFooter(document);
            
            document.close();
            logger.info("PDF generated successfully for student: {}", student.getRollNo());
            
        } catch (DocumentException e) {
            logger.error("Error generating PDF for student: {}", student.getRollNo(), e);
        }
        
        return baos.toByteArray();
    }
    
    private void addHeader(Document document) throws DocumentException {
        Paragraph title = new Paragraph("STUDENT RESULT REPORT", TITLE_FONT);
        title.setAlignment(Element.ALIGN_CENTER);
        title.setSpacingAfter(10);
        document.add(title);
        
        Paragraph subtitle = new Paragraph("Academic Performance Report", NORMAL_FONT);
        subtitle.setAlignment(Element.ALIGN_CENTER);
        subtitle.setSpacingAfter(20);
        document.add(subtitle);
        
        // Add line separator
        PdfPTable lineTable = new PdfPTable(1);
        lineTable.setWidthPercentage(100);
        PdfPCell lineCell = new PdfPCell();
        lineCell.setBorderWidthTop(2);
        lineCell.setBorderColorTop(new BaseColor(124, 58, 237));
        lineCell.setBorderWidthBottom(0);
        lineCell.setBorderWidthLeft(0);
        lineCell.setBorderWidthRight(0);
        lineCell.setFixedHeight(2);
        lineTable.addCell(lineCell);
        document.add(lineTable);
        document.add(Chunk.NEWLINE);
    }
    
    private void addStudentInfo(Document document, Student student) throws DocumentException {
        PdfPTable infoTable = new PdfPTable(2);
        infoTable.setWidthPercentage(100);
        infoTable.setSpacingBefore(10);
        infoTable.setSpacingAfter(10);
        
        addInfoRow(infoTable, "Student Name:", student.getName());
        addInfoRow(infoTable, "Roll Number:", student.getRollNo());
        addInfoRow(infoTable, "Class:", student.getClassName() + " - " + student.getSection());
        addInfoRow(infoTable, "Email:", student.getEmail());
        
        document.add(infoTable);
    }
    
    private void addInfoRow(PdfPTable table, String label, String value) {
        PdfPCell labelCell = new PdfPCell(new Phrase(label, BOLD_FONT));
        labelCell.setBorder(Rectangle.NO_BORDER);
        labelCell.setPadding(5);
        labelCell.setBackgroundColor(new BaseColor(248, 249, 250));
        
        PdfPCell valueCell = new PdfPCell(new Phrase(value, NORMAL_FONT));
        valueCell.setBorder(Rectangle.NO_BORDER);
        valueCell.setPadding(5);
        
        table.addCell(labelCell);
        table.addCell(valueCell);
    }
    
    private void addResultsTable(Document document, List<ResultDTO> results) throws DocumentException {
        PdfPTable table = new PdfPTable(6);
        table.setWidthPercentage(100);
        table.setWidths(new float[]{3, 2, 2, 2, 2, 2});
        table.setSpacingBefore(10);
        
        // Header
        BaseColor headerColor = new BaseColor(124, 58, 237);
        addTableHeader(table, "Subject", headerColor);
        addTableHeader(table, "Exam Type", headerColor);
        addTableHeader(table, "Marks", headerColor);
        addTableHeader(table, "Total", headerColor);
        addTableHeader(table, "Percentage", headerColor);
        addTableHeader(table, "Grade", headerColor);
        
        // Data
        for (ResultDTO result : results) {
            double percentage = (result.getMarksObtained() * 100.0) / result.getTotalMarks();
            
            addTableCell(table, result.getSubjectName());
            addTableCell(table, result.getExamType());
            addTableCell(table, result.getMarksObtained().toString());
            addTableCell(table, result.getTotalMarks().toString());
            addTableCell(table, String.format("%.2f%%", percentage));
            addTableCell(table, result.getGrade(), getGradeColor(result.getGrade()));
        }
        
        document.add(table);
    }
    
    private void addTableHeader(PdfPTable table, String text, BaseColor color) {
        PdfPCell cell = new PdfPCell(new Phrase(text, HEADER_FONT));
        cell.setBackgroundColor(color);
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        cell.setPadding(8);
        table.addCell(cell);
    }
    
    private void addTableCell(PdfPTable table, String text) {
        PdfPCell cell = new PdfPCell(new Phrase(text, NORMAL_FONT));
        cell.setPadding(8);
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        table.addCell(cell);
    }
    
    private void addTableCell(PdfPTable table, String text, BaseColor bgColor) {
        PdfPCell cell = new PdfPCell(new Phrase(text, BOLD_FONT));
        cell.setPadding(8);
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        cell.setBackgroundColor(bgColor);
        table.addCell(cell);
    }
    
    private void addSummary(Document document, List<ResultDTO> results) throws DocumentException {
        if (results.isEmpty()) return;
        
        int totalMarks = 0;
        int obtainedMarks = 0;
        
        for (ResultDTO result : results) {
            totalMarks += result.getTotalMarks();
            obtainedMarks += result.getMarksObtained();
        }
        
        double overallPercentage = (obtainedMarks * 100.0) / totalMarks;
        String overallGrade = calculateOverallGrade(overallPercentage);
        
        PdfPTable summaryTable = new PdfPTable(2);
        summaryTable.setWidthPercentage(60);
        summaryTable.setHorizontalAlignment(Element.ALIGN_RIGHT);
        summaryTable.setSpacingBefore(15);
        
        addSummaryRow(summaryTable, "Total Subjects:", String.valueOf(results.size()));
        addSummaryRow(summaryTable, "Total Marks:", obtainedMarks + " / " + totalMarks);
        addSummaryRow(summaryTable, "Overall Percentage:", String.format("%.2f%%", overallPercentage));
        addSummaryRow(summaryTable, "Overall Grade:", overallGrade);
        
        document.add(summaryTable);
    }
    
    private void addSummaryRow(PdfPTable table, String label, String value) {
        PdfPCell labelCell = new PdfPCell(new Phrase(label, BOLD_FONT));
        labelCell.setPadding(8);
        labelCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
        labelCell.setBackgroundColor(new BaseColor(248, 249, 250));
        
        PdfPCell valueCell = new PdfPCell(new Phrase(value, BOLD_FONT));
        valueCell.setPadding(8);
        valueCell.setHorizontalAlignment(Element.ALIGN_CENTER);
        valueCell.setBackgroundColor(new BaseColor(240, 240, 240));
        
        table.addCell(labelCell);
        table.addCell(valueCell);
    }
    
    private void addFooter(Document document) throws DocumentException {
        document.add(Chunk.NEWLINE);
        document.add(Chunk.NEWLINE);
        
        Paragraph footer = new Paragraph("This is a computer-generated document. No signature required.", 
            new Font(Font.FontFamily.HELVETICA, 8, Font.ITALIC, BaseColor.GRAY));
        footer.setAlignment(Element.ALIGN_CENTER);
        document.add(footer);
        
        Paragraph date = new Paragraph("Generated on: " + new java.util.Date().toString(), 
            new Font(Font.FontFamily.HELVETICA, 8, Font.NORMAL, BaseColor.GRAY));
        date.setAlignment(Element.ALIGN_CENTER);
        document.add(date);
    }
    
    private BaseColor getGradeColor(String grade) {
        switch (grade) {
            case "A+":
            case "A":
                return new BaseColor(200, 255, 200);
            case "B+":
            case "B":
                return new BaseColor(200, 230, 255);
            case "C":
            case "D":
                return new BaseColor(255, 245, 200);
            default:
                return new BaseColor(255, 200, 200);
        }
    }
    
    private String calculateOverallGrade(double percentage) {
        if (percentage >= 90) return "A+";
        else if (percentage >= 80) return "A";
        else if (percentage >= 70) return "B+";
        else if (percentage >= 60) return "B";
        else if (percentage >= 50) return "C";
        else if (percentage >= 40) return "D";
        else return "F";
    }
}