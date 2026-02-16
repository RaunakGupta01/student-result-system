import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth APIs
export const login = (credentials) => api.post('/auth/login', credentials);

// Teacher APIs
export const getAllTeachers = () => api.get('/teachers');
export const getTeacherById = (id) => api.get(`/teachers/${id}`);
export const createTeacher = (teacher) => api.post('/teachers', teacher);
export const updateTeacher = (id, teacher) => api.put(`/teachers/${id}`, teacher);
export const deleteTeacher = (id) => api.delete(`/teachers/${id}`);

// Student APIs
export const getAllStudents = () => api.get('/students');
export const getStudentById = (id) => api.get(`/students/${id}`);
export const getStudentsByClass = (className) => api.get(`/students/class/${className}`);
export const createStudent = (student) => api.post('/students', student);
export const updateStudent = (id, student) => api.put(`/students/${id}`, student);
export const deleteStudent = (id) => api.delete(`/students/${id}`);

// Subject APIs
export const getAllSubjects = () => api.get('/subjects');
export const getSubjectById = (id) => api.get(`/subjects/${id}`);
export const getSubjectsByClass = (className) => api.get(`/subjects/class/${className}`);
export const getSubjectsByTeacher = (teacherId) => api.get(`/subjects/teacher/${teacherId}`);
export const createSubject = (subject) => api.post('/subjects', subject);
export const updateSubject = (id, subject) => api.put(`/subjects/${id}`, subject);
export const deleteSubject = (id) => api.delete(`/subjects/${id}`);

// Result APIs
export const getAllResults = () => api.get('/results');
export const getResultById = (id) => api.get(`/results/${id}`);
export const getResultsByStudent = (studentId) => api.get(`/results/student/${studentId}`);
export const getResultsByStudentAndSemester = (studentId, semester, year) => 
  api.get(`/results/student/${studentId}/semester/${semester}/year/${year}`);
export const createResult = (result) => api.post('/results', result);
export const updateResult = (id, result) => api.put(`/results/${id}`, result);
export const deleteResult = (id) => api.delete(`/results/${id}`);

export default api;
