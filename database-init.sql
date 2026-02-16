-- Student Result Management System - Database Initialization Script
-- MySQL 8.0+

-- Create database
CREATE DATABASE IF NOT EXISTS student_result_db;
USE student_result_db;

-- Note: Tables will be auto-created by Spring Boot JPA
-- This script provides sample data for testing

-- Sample Teachers (Run after starting the application)
-- Password for all: teacher123

INSERT INTO teachers (teacher_id, name, email, phone, department, password, role) VALUES
('T001', 'Dr. Rajesh Kumar', 'rajesh.kumar@school.edu', '9876543210', 'Mathematics', 'teacher123', 'TEACHER'),
('T002', 'Ms. Priya Sharma', 'priya.sharma@school.edu', '9876543211', 'Science', 'teacher123', 'TEACHER'),
('T003', 'Mr. Amit Patel', 'amit.patel@school.edu', '9876543212', 'English', 'teacher123', 'TEACHER'),
('T004', 'Dr. Sunita Verma', 'sunita.verma@school.edu', '9876543213', 'Social Studies', 'teacher123', 'TEACHER'),
('T005', 'Mr. Vikram Singh', 'vikram.singh@school.edu', '9876543214', 'Computer Science', 'teacher123', 'TEACHER');

-- Sample Students (Run after starting the application)
-- Password for all: student123

INSERT INTO students (roll_no, name, email, phone, class_name, section, guardian_name, guardian_phone, password, role) VALUES
('STU001', 'Rahul Verma', 'rahul.verma@student.edu', '9876543220', 'Class 10', 'A', 'Mr. Suresh Verma', '9876543230', 'STU001', 'STUDENT'),
('STU002', 'Neha Gupta', 'neha.gupta@student.edu', '9876543221', 'Class 10', 'A', 'Mrs. Anjali Gupta', '9876543231', 'STU002', 'STUDENT'),
('STU003', 'Arjun Reddy', 'arjun.reddy@student.edu', '9876543222', 'Class 10', 'A', 'Mr. Ramesh Reddy', '9876543232', 'STU003', 'STUDENT'),
('STU004', 'Pooja Sharma', 'pooja.sharma@student.edu', '9876543223', 'Class 10', 'B', 'Mrs. Kavita Sharma', '9876543233', 'STU004', 'STUDENT'),
('STU005', 'Karan Malhotra', 'karan.malhotra@student.edu', '9876543224', 'Class 10', 'B', 'Mr. Vijay Malhotra', '9876543234', 'STU005', 'STUDENT'),
('STU006', 'Ananya Das', 'ananya.das@student.edu', '9876543225', 'Class 9', 'A', 'Mrs. Meera Das', '9876543235', 'STU006', 'STUDENT'),
('STU007', 'Rohan Kapoor', 'rohan.kapoor@student.edu', '9876543226', 'Class 9', 'A', 'Mr. Anil Kapoor', '9876543236', 'STU007', 'STUDENT'),
('STU008', 'Shreya Iyer', 'shreya.iyer@student.edu', '9876543227', 'Class 9', 'B', 'Mrs. Lakshmi Iyer', '9876543237', 'STU008', 'STUDENT');

-- Sample Subjects (Requires teacher_id from teachers table)
-- Update teacher_id values after teachers are created

INSERT INTO subjects (subject_code, subject_name, class_name, total_marks, passing_marks, teacher_id) VALUES
('MATH10', 'Mathematics', 'Class 10', 100, 40, 1),
('SCI10', 'Science', 'Class 10', 100, 40, 2),
('ENG10', 'English', 'Class 10', 100, 40, 3),
('SST10', 'Social Studies', 'Class 10', 100, 40, 4),
('CS10', 'Computer Science', 'Class 10', 100, 40, 5),
('MATH9', 'Mathematics', 'Class 9', 100, 40, 1),
('SCI9', 'Science', 'Class 9', 100, 40, 2),
('ENG9', 'English', 'Class 9', 100, 40, 3);

-- Sample Results (Requires student_id, subject_id, and teacher_id)
-- These will be entered by teachers through the application

-- Note: The following queries are examples and may need adjustment based on auto-generated IDs

-- Class 10 Results
INSERT INTO results (student_id, subject_id, marks_obtained, exam_type, semester, year, grade, remarks, teacher_id, created_at, updated_at) VALUES
(1, 1, 85, 'Final', 'First', 2024, 'A', 'Excellent performance', 1, NOW(), NOW()),
(1, 2, 78, 'Final', 'First', 2024, 'B+', 'Good work', 2, NOW(), NOW()),
(1, 3, 92, 'Final', 'First', 2024, 'A+', 'Outstanding', 3, NOW(), NOW()),
(2, 1, 76, 'Final', 'First', 2024, 'B+', 'Well done', 1, NOW(), NOW()),
(2, 2, 88, 'Final', 'First', 2024, 'A', 'Very good', 2, NOW(), NOW()),
(3, 1, 95, 'Final', 'First', 2024, 'A+', 'Exceptional', 1, NOW(), NOW());

-- Useful Queries for Testing

-- Check all teachers
SELECT * FROM teachers;

-- Check all students
SELECT * FROM students;

-- Check all subjects with teacher names
SELECT s.*, t.name as teacher_name 
FROM subjects s 
LEFT JOIN teachers t ON s.teacher_id = t.id;

-- Check all results with details
SELECT 
    st.name as student_name,
    st.roll_no,
    sub.subject_name,
    r.marks_obtained,
    sub.total_marks,
    r.grade,
    r.exam_type,
    r.semester,
    r.year,
    t.name as teacher_name
FROM results r
JOIN students st ON r.student_id = st.id
JOIN subjects sub ON r.subject_id = sub.id
LEFT JOIN teachers t ON r.teacher_id = t.id
ORDER BY st.name, sub.subject_name;

-- Get student performance summary
SELECT 
    st.name,
    st.roll_no,
    COUNT(r.id) as total_exams,
    AVG(r.marks_obtained) as average_marks,
    MAX(r.marks_obtained) as highest_marks,
    MIN(r.marks_obtained) as lowest_marks
FROM students st
LEFT JOIN results r ON st.id = r.student_id
GROUP BY st.id, st.name, st.roll_no;

-- Get subject-wise performance
SELECT 
    sub.subject_name,
    COUNT(r.id) as total_students,
    AVG(r.marks_obtained) as class_average,
    MAX(r.marks_obtained) as highest_score,
    MIN(r.marks_obtained) as lowest_score
FROM subjects sub
LEFT JOIN results r ON sub.id = r.subject_id
GROUP BY sub.id, sub.subject_name;

-- Grade distribution
SELECT 
    grade,
    COUNT(*) as count
FROM results
GROUP BY grade
ORDER BY 
    CASE grade
        WHEN 'A+' THEN 1
        WHEN 'A' THEN 2
        WHEN 'B+' THEN 3
        WHEN 'B' THEN 4
        WHEN 'C' THEN 5
        WHEN 'D' THEN 6
        WHEN 'F' THEN 7
    END;

-- Reset all data (Use with caution!)
-- SET FOREIGN_KEY_CHECKS = 0;
-- TRUNCATE TABLE results;
-- TRUNCATE TABLE subjects;
-- TRUNCATE TABLE students;
-- TRUNCATE TABLE teachers;
-- DELETE FROM admins WHERE username != 'admin';
-- SET FOREIGN_KEY_CHECKS = 1;
