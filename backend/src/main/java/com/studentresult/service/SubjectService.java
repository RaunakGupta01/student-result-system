package com.studentresult.service;

import com.studentresult.model.Subject;
import com.studentresult.model.Teacher;
import com.studentresult.repository.SubjectRepository;
import com.studentresult.repository.TeacherRepository;
import com.studentresult.repository.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SubjectService {
    
    @Autowired
    private SubjectRepository subjectRepository;
    
    @Autowired
    private TeacherRepository teacherRepository;
    
    @Autowired
    private ResultRepository resultRepository;
    
    public List<Subject> getAllSubjects() {
        return subjectRepository.findAll();
    }
    
    public Optional<Subject> getSubjectById(Long id) {
        return subjectRepository.findById(id);
    }
    
    public List<Subject> getSubjectsByClass(String className) {
        return subjectRepository.findByClassName(className);
    }
    
    public List<Subject> getSubjectsByTeacher(Long teacherId) {
        return subjectRepository.findByTeacherId(teacherId);
    }
    
    public Subject createSubject(Subject subject) {
        if (subjectRepository.existsBySubjectCode(subject.getSubjectCode())) {
            throw new RuntimeException("Subject code already exists");
        }
        return subjectRepository.save(subject);
    }
    
    public Subject updateSubject(Long id, Subject subject) {
        Optional<Subject> existingSubject = subjectRepository.findById(id);
        if (existingSubject.isEmpty()) {
            throw new RuntimeException("Subject not found");
        }
        
        Subject updatedSubject = existingSubject.get();
        updatedSubject.setSubjectName(subject.getSubjectName());
        updatedSubject.setClassName(subject.getClassName());
        updatedSubject.setTotalMarks(subject.getTotalMarks());
        updatedSubject.setPassingMarks(subject.getPassingMarks());
        updatedSubject.setTeacher(subject.getTeacher());
        
        return subjectRepository.save(updatedSubject);
    }
    
    public void deleteSubject(Long id) {
        if (!subjectRepository.existsById(id)) {
            throw new RuntimeException("Subject not found");
        }
        // Delete all results associated with this subject first
        resultRepository.deleteAll(resultRepository.findBySubjectId(id));
        // Now delete the subject
        subjectRepository.deleteById(id);
    }
}
