package com.studentresult.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {
    
    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);
    
    @Autowired
    private JavaMailSender mailSender;
    
    @Value("${app.email.from}")
    private String fromEmail;
    
    @Value("${app.email.enabled:false}")
    private boolean emailEnabled;
    
    public void sendStudentCredentials(String toEmail, String studentName, String rollNo, String password) {
        if (!emailEnabled) {
            logger.info("Email disabled. Would send credentials to: {}", toEmail);
            return;
        }
        
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setFrom(fromEmail);
            helper.setTo(toEmail);
            helper.setSubject("Welcome to Student Result Management System - Your Login Credentials");
            
            String htmlContent = "<html><body style='font-family: Arial, sans-serif;'>" +
                "<div style='max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f5f5;'>" +
                "<div style='background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center;'>" +
                "<h1 style='color: white; margin: 0;'>🎓 Student Result Management System</h1>" +
                "</div>" +
                "<div style='background: white; padding: 30px; margin-top: 20px; border-radius: 10px;'>" +
                "<h2 style='color: #333;'>Welcome, " + studentName + "!</h2>" +
                "<p style='color: #666; font-size: 16px;'>Your account has been created successfully. Here are your login credentials:</p>" +
                "<div style='background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;'>" +
                "<p style='margin: 10px 0;'><strong>Roll Number:</strong> <span style='color: #7C3AED; font-size: 18px;'>" + rollNo + "</span></p>" +
                "<p style='margin: 10px 0;'><strong>Password:</strong> <span style='color: #7C3AED; font-size: 18px;'>" + password + "</span></p>" +
                "</div>" +
                "<p style='color: #666;'>Please login at: <a href='http://localhost:3000' style='color: #7C3AED;'>Student Result System</a></p>" +
                "<p style='color: #999; font-size: 14px; margin-top: 30px;'>For security reasons, please change your password after first login.</p>" +
                "</div>" +
                "<div style='text-align: center; padding: 20px; color: #999; font-size: 12px;'>" +
                "<p>© 2024 Student Result Management System. All rights reserved.</p>" +
                "</div>" +
                "</div>" +
                "</body></html>";
            
            helper.setText(htmlContent, true);
            mailSender.send(message);
            logger.info("Credentials email sent successfully to: {}", toEmail);
        } catch (MessagingException e) {
            logger.error("Failed to send credentials email to: {}", toEmail, e);
        }
    }
    
    public void sendTeacherCredentials(String toEmail, String teacherName, String teacherId, String password) {
        if (!emailEnabled) {
            logger.info("Email disabled. Would send credentials to: {}", toEmail);
            return;
        }
        
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setFrom(fromEmail);
            helper.setTo(toEmail);
            helper.setSubject("Welcome to Student Result System - Teacher Login Credentials");
            
            String htmlContent = "<html><body style='font-family: Arial, sans-serif;'>" +
                "<div style='max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f5f5;'>" +
                "<div style='background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center;'>" +
                "<h1 style='color: white; margin: 0;'>👨‍🏫 Student Result System</h1>" +
                "</div>" +
                "<div style='background: white; padding: 30px; margin-top: 20px; border-radius: 10px;'>" +
                "<h2 style='color: #333;'>Welcome, " + teacherName + "!</h2>" +
                "<p style='color: #666; font-size: 16px;'>Your teacher account has been created. Here are your login credentials:</p>" +
                "<div style='background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;'>" +
                "<p style='margin: 10px 0;'><strong>Teacher ID:</strong> <span style='color: #7C3AED; font-size: 18px;'>" + teacherId + "</span></p>" +
                "<p style='margin: 10px 0;'><strong>Password:</strong> <span style='color: #7C3AED; font-size: 18px;'>" + password + "</span></p>" +
                "</div>" +
                "<p style='color: #666;'>Please login at: <a href='http://localhost:3000' style='color: #7C3AED;'>Teacher Portal</a></p>" +
                "<p style='color: #999; font-size: 14px; margin-top: 30px;'>For security reasons, please change your password after first login.</p>" +
                "</div>" +
                "<div style='text-align: center; padding: 20px; color: #999; font-size: 12px;'>" +
                "<p>© 2024 Student Result Management System. All rights reserved.</p>" +
                "</div>" +
                "</div>" +
                "</body></html>";
            
            helper.setText(htmlContent, true);
            mailSender.send(message);
            logger.info("Credentials email sent successfully to: {}", toEmail);
        } catch (MessagingException e) {
            logger.error("Failed to send credentials email to: {}", toEmail, e);
        }
    }
    
    public void sendResultNotification(String toEmail, String studentName, String subjectName, 
                                      Integer marks, Integer totalMarks, String grade, String examType) {
        if (!emailEnabled) {
            logger.info("Email disabled. Would send result notification to: {}", toEmail);
            return;
        }
        
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setFrom(fromEmail);
            helper.setTo(toEmail);
            helper.setSubject("New Result Published - " + subjectName);
            
            double percentage = (marks * 100.0) / totalMarks;
            String gradeColor = getGradeColor(grade);
            
            String htmlContent = "<html><body style='font-family: Arial, sans-serif;'>" +
                "<div style='max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f5f5;'>" +
                "<div style='background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center;'>" +
                "<h1 style='color: white; margin: 0;'>📊 Result Published</h1>" +
                "</div>" +
                "<div style='background: white; padding: 30px; margin-top: 20px; border-radius: 10px;'>" +
                "<h2 style='color: #333;'>Hello, " + studentName + "!</h2>" +
                "<p style='color: #666; font-size: 16px;'>Your " + examType + " result for <strong>" + subjectName + "</strong> has been published.</p>" +
                "<div style='background: #f8f9fa; padding: 25px; border-radius: 8px; margin: 20px 0; text-align: center;'>" +
                "<div style='font-size: 48px; font-weight: bold; color: " + gradeColor + "; margin: 20px 0;'>" + grade + "</div>" +
                "<p style='font-size: 24px; color: #333; margin: 10px 0;'>" + marks + " / " + totalMarks + "</p>" +
                "<p style='font-size: 18px; color: #666;'>Percentage: " + String.format("%.2f", percentage) + "%</p>" +
                "</div>" +
                "<p style='color: #666;'>View your complete results at: <a href='http://localhost:3000' style='color: #7C3AED;'>Student Portal</a></p>" +
                "</div>" +
                "<div style='text-align: center; padding: 20px; color: #999; font-size: 12px;'>" +
                "<p>© 2024 Student Result Management System. All rights reserved.</p>" +
                "</div>" +
                "</div>" +
                "</body></html>";
            
            helper.setText(htmlContent, true);
            mailSender.send(message);
            logger.info("Result notification sent successfully to: {}", toEmail);
        } catch (MessagingException e) {
            logger.error("Failed to send result notification to: {}", toEmail, e);
        }
    }
    
    private String getGradeColor(String grade) {
        switch (grade) {
            case "A+":
            case "A":
                return "#10B981";
            case "B+":
            case "B":
                return "#3B82F6";
            case "C":
            case "D":
                return "#F59E0B";
            default:
                return "#EF4444";
        }
    }
}