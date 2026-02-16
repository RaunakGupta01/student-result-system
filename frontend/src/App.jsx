import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import { 
  GraduationCap, Users, BookOpen, FileText, LayoutDashboard, 
  LogOut, UserCircle, Plus, X, Edit, Trash2, Save, Award, Sun, Moon,
  MessageCircle, Send, Minimize2, Maximize2, Bot, User
} from 'lucide-react';
import * as api from './api';

// Theme Toggle Component
function ThemeToggle({ theme, toggleTheme }) {
  const [isSwitching, setIsSwitching] = useState(false);

  const handleToggle = () => {
    setIsSwitching(true);
    toggleTheme();
    setTimeout(() => setIsSwitching(false), 600);
  };

  return (
    <button 
      className={`theme-toggle ${isSwitching ? 'switching' : ''}`}
      onClick={handleToggle}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <Moon size={28} /> : <Sun size={28} />}
    </button>
  );
}

// ==================== GOOGLE GEMINI AI CHATBOT ====================
function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', content: 'Hello! I\'m your AI-powered Student Result Assistant. Ask me anything!' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // 🔑 REPLACE 'YOUR_API_KEY_HERE' with your actual Gemini API key
  const GEMINI_API_KEY = 'AIzaSyB3-h_wRt6BMzz_SeRDjcRDYcgL6MSWg00';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getLocalResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.match(/^(hi|hello|hey)/)) {
      return "Hello! 👋 I'm your AI Student Result Assistant. I can help you with:\n\n• Results and grades\n• PDF downloads\n• Email notifications\n• Excel exports\n• System navigation\n\nWhat would you like to know?";
    }
    
    if (lowerMessage.includes('help')) {
      return "I can help with:\n📊 Checking results\n📄 PDF reports\n📧 Email notifications\n📈 Excel exports\n🔐 Login issues\n\nJust ask!";
    }
    
    if (lowerMessage.includes('grade')) {
      return "**Grading System:**\n🌟 A+ : 90-100%\n⭐ A : 80-89%\n✨ B+ : 70-79%\n💫 B : 60-69%\n⚡ C : 50-59%\n📌 D : 40-49%\n❌ F : Below 40%";
    }
    
    if (lowerMessage.includes('result')) {
      return "**Check Results:**\n1. Login with roll number\n2. Go to Results section\n3. View grades & marks\n4. Download PDF report";
    }
    
    if (lowerMessage.includes('pdf')) {
      return "**Download PDF:**\n1. Go to dashboard\n2. Click 'Results'\n3. Click 'Download PDF'\n4. PDF downloads automatically!";
    }
    
    if (lowerMessage.includes('email')) {
      return "**Email Notifications:**\n✅ Student creation → Credentials sent\n✅ Teacher creation → Credentials sent\n✅ Result published → Notification sent";
    }
    
    if (lowerMessage.includes('excel')) {
      return "**Excel Export:**\n1. Go to Students/Teachers/Results\n2. Click 'Export to Excel'\n3. File downloads instantly!";
    }
    
    if (lowerMessage.includes('login')) {
      return "**Login Info:**\n• Admin: Foradmin / Foradmin\n• Student: Roll Number / Password\n• Teacher: Teacher ID / Password";
    }
    
    if (lowerMessage.match(/(thank|thanks)/)) {
      return "You're welcome! 😊 Feel free to ask anything else!";
    }
    
    if (lowerMessage.match(/(bye|goodbye)/)) {
      return "Goodbye! 👋 Have a great day!";
    }
    
    return null;
  };

  const getGeminiResponse = async (message) => {
    if (GEMINI_API_KEY === 'AIzaSyB3-h_wRt6BMzz_SeRDjcRDYcgL6MSWg00') {
      return "⚠️ AI not configured yet!\n\nGet a free API key: https://makersuite.google.com/app/apikey\n\nBut I can still answer questions about results, grades, PDFs, and more!";
    }

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `You are a helpful AI assistant for a Student Result Management System. Answer this question concisely: ${message}`
              }]
            }],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 300,
            }
          })
        }
      );
      
      const data = await response.json();
      const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      return aiText || "I'm not sure. Try asking about results, grades, or system features!";
    } catch (error) {
      return "Connection error! But I can still help with common questions!";
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const localResponse = getLocalResponse(input);
    
    if (localResponse) {
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'bot', content: localResponse }]);
        setIsTyping(false);
      }, 600);
    } else {
      const aiResponse = await getGeminiResponse(input);
      setMessages(prev => [...prev, { role: 'bot', content: aiResponse }]);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <button className="chatbot-trigger" onClick={() => setIsOpen(true)}>
        <MessageCircle size={24} />
        <span className="chatbot-badge">AI</span>
      </button>
    );
  }

  return (
    <div className={`chatbot-container ${isMinimized ? 'minimized' : ''}`}>
      <div className="chatbot-header">
        <div className="chatbot-header-left">
          <div className="chatbot-avatar">
            <Bot size={20} />
          </div>
          <div>
            <h3>Gemini AI</h3>
            <p className="chatbot-status">
              <span className="status-dot"></span> Online
            </p>
          </div>
        </div>
        <div className="chatbot-header-actions">
          <button onClick={() => setIsMinimized(!isMinimized)}>
            {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
          </button>
          <button onClick={() => setIsOpen(false)}>
            <X size={18} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.role}`}>
                <div className="message-avatar">
                  {msg.role === 'bot' ? <Bot size={16} /> : <User size={16} />}
                </div>
                <div className="message-content">{msg.content}</div>
              </div>
            ))}
            {isTyping && (
              <div className="message bot">
                <div className="message-avatar"><Bot size={16} /></div>
                <div className="message-content typing">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
            />
            <button onClick={handleSend} disabled={!input.trim()}>
              <Send size={18} />
            </button>
          </div>

          <div className="chatbot-footer">
            <p>Powered by Google Gemini AI • Free</p>
          </div>
        </>
      )}
    </div>
  );
}
// ==================== END GEMINI CHATBOT ====================

// Login Component
function Login({ onLogin }) {
  const [role, setRole] = useState('ADMIN');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await api.login({ username, password, role });
      if (response.data.success) {
        onLogin(response.data);
        navigate(role === 'ADMIN' ? '/admin' : role === 'TEACHER' ? '/teacher' : '/student');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-container">
      <div className="bg-shapes">
        <div className="bg-shape"></div>
        <div className="bg-shape"></div>
        <div className="bg-shape"></div>
        <div className="bg-shape"></div>
        <div className="bg-shape"></div>
        <div className="bg-shape"></div>
      </div>
      
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <GraduationCap size={40} color="white" />
          </div>
          <h1 className="login-title">Student Result Management System</h1>
          <p className="login-subtitle">Welcome back! Please login to continue</p>
        </div>

        <div className="role-selector">
          <button
            className={`role-btn ${role === 'ADMIN' ? 'active' : ''}`}
            onClick={() => setRole('ADMIN')}
          >
            <UserCircle size={18} />
            Admin
          </button>
          <button
            className={`role-btn ${role === 'TEACHER' ? 'active' : ''}`}
            onClick={() => setRole('TEACHER')}
          >
            <Users size={18} />
            Teacher
          </button>
          <button
            className={`role-btn ${role === 'STUDENT' ? 'active' : ''}`}
            onClick={() => setRole('STUDENT')}
          >
            <GraduationCap size={18} />
            Student
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label className="form-label">
              {role === 'ADMIN' ? 'Username' : role === 'TEACHER' ? 'Teacher ID' : 'Roll Number'}
            </label>
            <input
              type="text"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={role === 'ADMIN' ? 'admin' : role === 'TEACHER' ? 'T001' : 'STU001'}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

// Sidebar Component
function Sidebar({ role, user, onLogout }) {
  const getMenuItems = () => {
    if (role === 'ADMIN') {
      return [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
        { icon: Users, label: 'Teachers', path: '/admin/teachers' },
        { icon: GraduationCap, label: 'Students', path: '/admin/students' },
        { icon: BookOpen, label: 'Subjects', path: '/admin/subjects' },
      ];
    } else if (role === 'TEACHER') {
      return [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/teacher' },
        { icon: BookOpen, label: 'My Subjects', path: '/teacher/subjects' },
        { icon: FileText, label: 'Enter Results', path: '/teacher/results' },
        { icon: UserCircle, label: 'Profile', path: '/teacher/profile' },
      ];
    } else {
      return [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/student' },
        { icon: FileText, label: 'My Results', path: '/student/results' },
        { icon: UserCircle, label: 'Profile', path: '/student/profile' },
      ];
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <GraduationCap size={28} />
          </div>
          <div className="sidebar-logo-text">
            <h2>Result System</h2>
            <p>{role} Portal</p>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {getMenuItems().map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="nav-item"
          >
            <item.icon size={20} />
            {item.label}
          </Link>
        ))}
      </nav>

      <div style={{ position: 'absolute', bottom: 0, width: '100%', padding: '24px' }}>
        <button onClick={onLogout} className="logout-btn" style={{ width: '100%' }}>
          <LogOut size={18} style={{ marginRight: '8px' }} />
          Logout
        </button>
      </div>
    </div>
  );
}

// Admin Dashboard
function AdminDashboard() {
  const [stats, setStats] = useState({
    teachers: 0,
    students: 0,
    subjects: 0,
    results: 0
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [teachers, students, subjects, results] = await Promise.all([
        api.getAllTeachers(),
        api.getAllStudents(),
        api.getAllSubjects(),
        api.getAllResults()
      ]);
      
      setStats({
        teachers: teachers.data.length,
        students: students.data.length,
        subjects: subjects.data.length,
        results: results.data.length
      });
    } catch (err) {
      console.error('Error loading stats:', err);
    }
  };

  // Excel Export Function
  const exportStudents = async () => {
    try {
      const response = await fetch(
        'http://localhost:8080/api/export/students/excel'
      );
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'students_export.xlsx';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting:', error);
      alert('Error exporting to Excel');
    }
  };

  return (
    <div>
      <div className="top-bar">
        <h1 className="page-title">Admin Dashboard</h1>
        <button onClick={exportStudents} className="btn-primary" style={{ marginLeft: '16px' }}>
          <FileText size={18} />
          Export to Excel
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card primary">
          <div className="stat-header">
            <div>
              <div className="stat-value">{stats.teachers}</div>
              <div className="stat-label">Total Teachers</div>
            </div>
            <div className="stat-icon">
              <Users size={28} />
            </div>
          </div>
        </div>

        <div className="stat-card success">
          <div className="stat-header">
            <div>
              <div className="stat-value">{stats.students}</div>
              <div className="stat-label">Total Students</div>
            </div>
            <div className="stat-icon">
              <GraduationCap size={28} />
            </div>
          </div>
        </div>

        <div className="stat-card warning">
          <div className="stat-header">
            <div>
              <div className="stat-value">{stats.subjects}</div>
              <div className="stat-label">Total Subjects</div>
            </div>
            <div className="stat-icon">
              <BookOpen size={28} />
            </div>
          </div>
        </div>

        <div className="stat-card danger">
          <div className="stat-header">
            <div>
              <div className="stat-value">{stats.results}</div>
              <div className="stat-label">Total Results</div>
            </div>
            <div className="stat-icon">
              <FileText size={28} />
            </div>
          </div>
        </div>
      </div>

      <div className="content-card">
        <div className="card-header">
          <h2 className="card-title">Quick Actions</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <Link to="/admin/teachers" className="btn-primary" style={{ textDecoration: 'none' }}>
            <Plus size={18} />
            Add Teacher
          </Link>
          <Link to="/admin/students" className="btn-primary" style={{ textDecoration: 'none' }}>
            <Plus size={18} />
            Add Student
          </Link>
          <Link to="/admin/subjects" className="btn-primary" style={{ textDecoration: 'none' }}>
            <Plus size={18} />
            Add Subject
          </Link>
        </div>
      </div>
    </div>
  );
}

// Teachers Management
function TeachersManagement() {
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [formData, setFormData] = useState({
    teacherId: '',
    name: '',
    email: '',
    phone: '',
    department: '',
    password: ''
  });

  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = async () => {
    try {
      const response = await api.getAllTeachers();
      setTeachers(response.data);
      setFilteredTeachers(response.data);
    } catch (err) {
      console.error('Error loading teachers:', err);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = teachers.filter(teacher =>
      teacher.name.toLowerCase().includes(query.toLowerCase()) ||
      teacher.teacherId.toLowerCase().includes(query.toLowerCase()) ||
      teacher.email.toLowerCase().includes(query.toLowerCase()) ||
      teacher.department.toLowerCase().includes(query.toLowerCase()) ||
      teacher.phone.includes(query)
    );
    setFilteredTeachers(filtered);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTeacher) {
        await api.updateTeacher(editingTeacher.id, formData);
      } else {
        await api.createTeacher(formData);
      }
      setShowModal(false);
      resetForm();
      loadTeachers();
    } catch (err) {
      alert(err.response?.data || 'Error saving teacher');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      try {
        await api.deleteTeacher(id);
        loadTeachers();
      } catch (err) {
        alert('Error deleting teacher');
      }
    }
  };

  const handleEdit = (teacher) => {
    setEditingTeacher(teacher);
    setFormData({
      teacherId: teacher.teacherId,
      name: teacher.name,
      email: teacher.email,
      phone: teacher.phone,
      department: teacher.department,
      password: ''
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      teacherId: '',
      name: '',
      email: '',
      phone: '',
      department: '',
      password: ''
    });
    setEditingTeacher(null);
  };

  return (
    <div>
      <div className="top-bar">
        <h1 className="page-title">Teachers Management</h1>
      </div>

      <div className="content-card">
        <div className="card-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
            <h2 className="card-title">All Teachers</h2>
            <input
              type="text"
              className="form-input"
              placeholder="Search by name, ID, email, department..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              style={{ flex: 1, maxWidth: '300px' }}
            />
          </div>
          <button className="btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={18} />
            Add Teacher
          </button>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Teacher ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTeachers.map((teacher) => (
              <tr key={teacher.id}>
                <td><span className="badge info">{teacher.teacherId}</span></td>
                <td>{teacher.name}</td>
                <td>{teacher.email}</td>
                <td>{teacher.phone}</td>
                <td>{teacher.department}</td>
                <td className="action-buttons">
                  <button className="btn-success" onClick={() => handleEdit(teacher)}>
                    <Edit size={16} />
                  </button>
                  <button className="btn-danger" onClick={() => handleDelete(teacher.id)}>
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => { setShowModal(false); resetForm(); }}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">{editingTeacher ? 'Edit Teacher' : 'Add Teacher'}</h2>
              <button className="close-btn" onClick={() => { setShowModal(false); resetForm(); }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Teacher ID</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.teacherId}
                    onChange={(e) => setFormData({ ...formData, teacherId: e.target.value })}
                    required
                    disabled={editingTeacher}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input
                    type="tel"
                    className="form-input"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Department</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Password {editingTeacher && '(Leave blank to keep current)'}</label>
                <input
                  type="password"
                  className="form-input"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required={!editingTeacher}
                />
              </div>

              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={() => { setShowModal(false); resetForm(); }}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  <Save size={18} />
                  {editingTeacher ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Students Management (similar pattern)
function StudentsManagement() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    rollNo: '',
    name: '',
    email: '',
    phone: '',
    className: '',
    section: '',
    guardianName: '',
    guardianPhone: '',
    password: ''
  });

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const response = await api.getAllStudents();
      setStudents(response.data);
      setFilteredStudents(response.data);
    } catch (err) {
      console.error('Error loading students:', err);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = students.filter(student =>
      student.name.toLowerCase().includes(query.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(query.toLowerCase()) ||
      student.className.toLowerCase().includes(query.toLowerCase()) ||
      student.email.toLowerCase().includes(query.toLowerCase()) ||
      student.phone.includes(query)
    );
    setFilteredStudents(filtered);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingStudent) {
        await api.updateStudent(editingStudent.id, formData);
      } else {
        await api.createStudent(formData);
      }
      setShowModal(false);
      resetForm();
      loadStudents();
    } catch (err) {
      alert(err.response?.data || 'Error saving student');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await api.deleteStudent(id);
        loadStudents();
      } catch (err) {
        console.error('Delete error:', err);
        const errorMsg = typeof err.response?.data === 'string' ? err.response.data : (err.response?.data?.message || err.message || 'Error deleting student');
        alert(errorMsg);
      }
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setFormData({
      rollNo: student.rollNo,
      name: student.name,
      email: student.email,
      phone: student.phone,
      className: student.className,
      section: student.section,
      guardianName: student.guardianName || '',
      guardianPhone: student.guardianPhone || '',
      password: ''
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      rollNo: '',
      name: '',
      email: '',
      phone: '',
      className: '',
      section: '',
      guardianName: '',
      guardianPhone: '',
      password: ''
    });
    setEditingStudent(null);
  };

  return (
    <div>
      <div className="top-bar">
        <h1 className="page-title">Students Management</h1>
      </div>

      <div className="content-card">
        <div className="card-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
            <h2 className="card-title">All Students</h2>
            <input
              type="text"
              className="form-input"
              placeholder="Search by name, roll number, class, email..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              style={{ flex: 1, maxWidth: '300px' }}
            />
          </div>
          <button className="btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={18} />
            Add Student
          </button>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Name</th>
              <th>Class</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td><span className="badge success">{student.rollNo}</span></td>
                <td>{student.name}</td>
                <td>{student.className} - {student.section}</td>
                <td>{student.email}</td>
                <td>{student.phone}</td>
                <td className="action-buttons">
                  <button className="btn-success" onClick={() => handleEdit(student)}>
                    <Edit size={16} />
                  </button>
                  <button className="btn-danger" onClick={() => handleDelete(student.id)}>
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => { setShowModal(false); resetForm(); }}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">{editingStudent ? 'Edit Student' : 'Add Student'}</h2>
              <button className="close-btn" onClick={() => { setShowModal(false); resetForm(); }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Roll Number</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.rollNo}
                    onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                    required
                    disabled={editingStudent}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Class</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.className}
                    onChange={(e) => setFormData({ ...formData, className: e.target.value })}
                    placeholder="e.g., Class 10"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Section</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.section}
                    onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                    placeholder="e.g., A"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input
                    type="tel"
                    className="form-input"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Guardian Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.guardianName}
                    onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Guardian Phone</label>
                  <input
                    type="tel"
                    className="form-input"
                    value={formData.guardianPhone}
                    onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Password {editingStudent && '(Leave blank to keep current)'}</label>
                <input
                  type="password"
                  className="form-input"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required={!editingStudent}
                />
              </div>

              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={() => { setShowModal(false); resetForm(); }}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  <Save size={18} />
                  {editingStudent ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Subjects Management
function SubjectsManagement() {
  const [subjects, setSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [formData, setFormData] = useState({
    subjectCode: '',
    subjectName: '',
    className: '',
    totalMarks: 100,
    passingMarks: 40,
    teacher: null
  });

  useEffect(() => {
    loadSubjects();
    loadTeachers();
  }, []);

  const loadSubjects = async () => {
    try {
      const response = await api.getAllSubjects();
      setSubjects(response.data);
      setFilteredSubjects(response.data);
    } catch (err) {
      console.error('Error loading subjects:', err);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = subjects.filter(subject =>
      subject.subjectName.toLowerCase().includes(query.toLowerCase()) ||
      subject.subjectCode.toLowerCase().includes(query.toLowerCase()) ||
      subject.className.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredSubjects(filtered);
  };

  const loadTeachers = async () => {
    try {
      const response = await api.getAllTeachers();
      setTeachers(response.data);
    } catch (err) {
      console.error('Error loading teachers:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSubject) {
        await api.updateSubject(editingSubject.id, formData);
      } else {
        await api.createSubject(formData);
      }
      setShowModal(false);
      resetForm();
      loadSubjects();
    } catch (err) {
      alert(err.response?.data || 'Error saving subject');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this subject?')) {
      try {
        await api.deleteSubject(id);
        loadSubjects();
      } catch (err) {
        console.error('Delete error:', err);
        const errorMsg = typeof err.response?.data === 'string' ? err.response.data : (err.response?.data?.message || err.message || 'Error deleting subject');
        alert(errorMsg);
      }
    }
  };

  const handleEdit = (subject) => {
    setEditingSubject(subject);
    setFormData({
      subjectCode: subject.subjectCode,
      subjectName: subject.subjectName,
      className: subject.className,
      totalMarks: subject.totalMarks,
      passingMarks: subject.passingMarks,
      teacher: subject.teacher
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      subjectCode: '',
      subjectName: '',
      className: '',
      totalMarks: 100,
      passingMarks: 40,
      teacher: null
    });
    setEditingSubject(null);
  };

  return (
    <div>
      <div className="top-bar">
        <h1 className="page-title">Subjects Management</h1>
      </div>

      <div className="content-card">
        <div className="card-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
            <h2 className="card-title">All Subjects</h2>
            <input
              type="text"
              className="form-input"
              placeholder="Search by subject name, code, class..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              style={{ flex: 1, maxWidth: '300px' }}
            />
          </div>
          <button className="btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={18} />
            Add Subject
          </button>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Subject Code</th>
              <th>Subject Name</th>
              <th>Class</th>
              <th>Total Marks</th>
              <th>Passing Marks</th>
              <th>Teacher</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubjects.map((subject) => (
              <tr key={subject.id}>
                <td><span className="badge warning">{subject.subjectCode}</span></td>
                <td>{subject.subjectName}</td>
                <td>{subject.className}</td>
                <td>{subject.totalMarks}</td>
                <td>{subject.passingMarks}</td>
                <td>{subject.teacher?.name || 'Not Assigned'}</td>
                <td className="action-buttons">
                  <button className="btn-success" onClick={() => handleEdit(subject)}>
                    <Edit size={16} />
                  </button>
                  <button className="btn-danger" onClick={() => handleDelete(subject.id)}>
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => { setShowModal(false); resetForm(); }}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">{editingSubject ? 'Edit Subject' : 'Add Subject'}</h2>
              <button className="close-btn" onClick={() => { setShowModal(false); resetForm(); }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Subject Code</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.subjectCode}
                    onChange={(e) => setFormData({ ...formData, subjectCode: e.target.value })}
                    required
                    disabled={editingSubject}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Subject Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.subjectName}
                    onChange={(e) => setFormData({ ...formData, subjectName: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Class</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.className}
                  onChange={(e) => setFormData({ ...formData, className: e.target.value })}
                  placeholder="e.g., Class 10"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Total Marks</label>
                  <input
                    type="number"
                    className="form-input"
                    value={formData.totalMarks}
                    onChange={(e) => setFormData({ ...formData, totalMarks: parseInt(e.target.value) })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Passing Marks</label>
                  <input
                    type="number"
                    className="form-input"
                    value={formData.passingMarks}
                    onChange={(e) => setFormData({ ...formData, passingMarks: parseInt(e.target.value) })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Assign Teacher</label>
                <select
                  className="form-input"
                  value={formData.teacher?.id || ''}
                  onChange={(e) => {
                    const teacher = teachers.find(t => t.id === parseInt(e.target.value));
                    setFormData({ ...formData, teacher });
                  }}
                >
                  <option value="">Select Teacher</option>
                  {teachers.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.name} ({teacher.teacherId})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={() => { setShowModal(false); resetForm(); }}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  <Save size={18} />
                  {editingSubject ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Teacher Dashboard
function TeacherDashboard({ user }) {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    if (user?.id) {
      loadSubjects();
    }
  }, [user]);

  const loadSubjects = async () => {
    try {
      const response = await api.getSubjectsByTeacher(user.id);
      setSubjects(response.data);
    } catch (err) {
      console.error('Error loading subjects:', err);
    }
  };

  return (
    <div>
      <div className="top-bar">
        <h1 className="page-title">Teacher Dashboard</h1>
        <div className="user-info">
          <div className="user-avatar">{user?.name?.charAt(0)}</div>
          <div>
            <div style={{ fontWeight: 600 }}>{user?.name}</div>
            <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{user?.teacherId}</div>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card primary">
          <div className="stat-header">
            <div>
              <div className="stat-value">{subjects.length}</div>
              <div className="stat-label">My Subjects</div>
            </div>
            <div className="stat-icon">
              <BookOpen size={28} />
            </div>
          </div>
        </div>
      </div>

      <div className="content-card">
        <div className="card-header">
          <h2 className="card-title">My Subjects</h2>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Subject Code</th>
              <th>Subject Name</th>
              <th>Class</th>
              <th>Total Marks</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject) => (
              <tr key={subject.id}>
                <td><span className="badge warning">{subject.subjectCode}</span></td>
                <td>{subject.subjectName}</td>
                <td>{subject.className}</td>
                <td>{subject.totalMarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Teacher Results Entry
function TeacherResults({ user }) {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    student: null,
    subject: null,
    marksObtained: 0,
    examType: 'Final',
    semester: 'First',
    year: new Date().getFullYear(),
    remarks: '',
    enteredBy: user
  });

  useEffect(() => {
    loadData();
  }, [user]);

  const loadData = async () => {
    try {
      const [studentsRes, subjectsRes] = await Promise.all([
        api.getAllStudents(),
        api.getSubjectsByTeacher(user.id)
      ]);
      setStudents(studentsRes.data);
      setSubjects(subjectsRes.data);
    } catch (err) {
      console.error('Error loading data:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.createResult(formData);
      setShowModal(false);
      resetForm();
      alert('Result added successfully!');
    } catch (err) {
      alert(err.response?.data || 'Error saving result');
    }
  };

  const resetForm = () => {
    setFormData({
      student: null,
      subject: null,
      marksObtained: 0,
      examType: 'Final',
      semester: 'First',
      year: new Date().getFullYear(),
      remarks: '',
      enteredBy: user
    });
  };

  return (
    <div>
      <div className="top-bar">
        <h1 className="page-title">Enter Results</h1>
      </div>

      <div className="content-card">
        <div className="card-header">
          <h2 className="card-title">Add Student Results</h2>
          <button className="btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={18} />
            Add Result
          </button>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => { setShowModal(false); resetForm(); }}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Add Result</h2>
              <button className="close-btn" onClick={() => { setShowModal(false); resetForm(); }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Select Student</label>
                <select
                  className="form-input"
                  value={formData.student?.id || ''}
                  onChange={(e) => {
                    const student = students.find(s => s.id === parseInt(e.target.value));
                    setFormData({ ...formData, student });
                  }}
                  required
                >
                  <option value="">Choose Student</option>
                  {students.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.name} ({student.rollNo}) - {student.className}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Select Subject</label>
                <select
                  className="form-input"
                  value={formData.subject?.id || ''}
                  onChange={(e) => {
                    const subject = subjects.find(s => s.id === parseInt(e.target.value));
                    setFormData({ ...formData, subject });
                  }}
                  required
                >
                  <option value="">Choose Subject</option>
                  {subjects.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.subjectName} ({subject.subjectCode})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Marks Obtained</label>
                  <input
                    type="number"
                    className="form-input"
                    value={formData.marksObtained}
                    onChange={(e) => setFormData({ ...formData, marksObtained: parseInt(e.target.value) })}
                    max={formData.subject?.totalMarks || 100}
                    required
                  />
                  {formData.subject && (
                    <small style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>
                      Out of {formData.subject.totalMarks}
                    </small>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label">Exam Type</label>
                  <select
                    className="form-input"
                    value={formData.examType}
                    onChange={(e) => setFormData({ ...formData, examType: e.target.value })}
                    required
                  >
                    <option value="Final">Final Exam</option>
                    <option value="Mid-term">Mid-term</option>
                    <option value="Quiz">Quiz</option>
                    <option value="Assignment">Assignment</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Semester</label>
                  <select
                    className="form-input"
                    value={formData.semester}
                    onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                    required
                  >
                    <option value="First">First</option>
                    <option value="Second">Second</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Year</label>
                  <input
                    type="number"
                    className="form-input"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Remarks (Optional)</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.remarks}
                  onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                  placeholder="Add any remarks..."
                />
              </div>

              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={() => { setShowModal(false); resetForm(); }}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  <Save size={18} />
                  Add Result
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Student Dashboard
function StudentDashboard({ user }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (user?.id) {
      loadResults();
    }
  }, [user]);

  const loadResults = async () => {
    try {
      const response = await api.getResultsByStudent(user.id);
      setResults(response.data);
    } catch (err) {
      console.error('Error loading results:', err);
    }
  };

  const calculateAverage = () => {
    if (results.length === 0) return 0;
    const total = results.reduce((sum, r) => sum + (r.marksObtained / r.totalMarks) * 100, 0);
    return (total / results.length).toFixed(2);
  };

  const countGrades = (grade) => {
    return results.filter(r => r.grade === grade).length;
  };

  // PDF Download Function
  const downloadPDF = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/export/results/student/${user.id}/pdf`
      );
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Result_${user.rollNo}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Error downloading PDF');
    }
  };

  return (
    
    <div>
      <div className="top-bar">
        <h1 className="page-title">Student Dashboard</h1>
        <div className="user-info">
          <div className="user-avatar">{user?.name?.charAt(0)}</div>
          <div>
            <div style={{ fontWeight: 600 }}>{user?.name}</div>
            <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{user?.rollNo}</div>
          </div>
        </div>
        {user && (
          <button onClick={downloadPDF} className="btn-primary" style={{ marginLeft: '16px' }}>
            <FileText size={18} />
            Download PDF Report
          </button>
        )}
      </div>

      <div className="stats-grid">
        <div className="stat-card primary">
          <div className="stat-header">
            <div>
              <div className="stat-value">{results.length}</div>
              <div className="stat-label">Total Results</div>
            </div>
            <div className="stat-icon">
              <FileText size={28} />
            </div>
          </div>
        </div>
        

        <div className="stat-card success">
          <div className="stat-header">
            <div>
              <div className="stat-value">{calculateAverage()}%</div>
              <div className="stat-label">Average Score</div>
            </div>
            <div className="stat-icon">
              <Award size={28} />
            </div>
          </div>
        </div>

        <div className="stat-card warning">
          <div className="stat-header">
            <div>
              <div className="stat-value">{countGrades('A+') + countGrades('A')}</div>
              <div className="stat-label">A Grades</div>
            </div>
            <div className="stat-icon">
              <Award size={28} />
            </div>
          </div>
        </div>
      </div>

      <div className="content-card">
        <div className="card-header">
          <h2 className="card-title">Recent Results</h2>
        </div>
        
        {results.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">
              <FileText size={40} />
            </div>
            <p className="empty-state-text">No results available yet</p>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Exam Type</th>
                <th>Marks</th>
                <th>Grade</th>
                <th>Semester</th>
                <th>Year</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <tr key={result.id}>
                  <td>{result.subjectName}</td>
                  <td><span className="badge info">{result.examType}</span></td>
                  <td>{result.marksObtained}/{result.totalMarks}</td>
                  <td>
                    <span className={`badge ${
                      ['A+', 'A'].includes(result.grade) ? 'success' :
                      ['B+', 'B'].includes(result.grade) ? 'info' :
                      ['C', 'D'].includes(result.grade) ? 'warning' : 'danger'
                    }`}>
                      {result.grade}
                    </span>
                  </td>
                  <td>{result.semester}</td>
                  <td>{result.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// Profile Component
function Profile({ user }) {
  return (
    <div>
      <div className="top-bar">
        <h1 className="page-title">My Profile</h1>
      </div>

      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {user?.name?.charAt(0)}
          </div>
          <div className="profile-info">
            <h2>{user?.name}</h2>
            <span className="profile-role">{user?.role}</span>
          </div>
        </div>

        <div className="profile-details">
          {user?.rollNo && (
            <div className="detail-item">
              <div className="detail-label">Roll Number</div>
              <div className="detail-value">{user.rollNo}</div>
            </div>
          )}
          {user?.teacherId && (
            <div className="detail-item">
              <div className="detail-label">Teacher ID</div>
              <div className="detail-value">{user.teacherId}</div>
            </div>
          )}
          <div className="detail-item">
            <div className="detail-label">Email</div>
            <div className="detail-value">{user?.email}</div>
          </div>
          <div className="detail-item">
            <div className="detail-label">Phone</div>
            <div className="detail-value">{user?.phone}</div>
          </div>
          {user?.className && (
            <div className="detail-item">
              <div className="detail-label">Class</div>
              <div className="detail-value">{user.className} - {user.section}</div>
            </div>
          )}
          {user?.department && (
            <div className="detail-item">
              <div className="detail-label">Department</div>
              <div className="detail-value">{user.department}</div>
            </div>
          )}
          {user?.guardianName && (
            <div className="detail-item">
              <div className="detail-label">Guardian Name</div>
              <div className="detail-value">{user.guardianName}</div>
            </div>
          )}
          {user?.guardianPhone && (
            <div className="detail-item">
              <div className="detail-label">Guardian Phone</div>
              <div className="detail-value">{user.guardianPhone}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Main App Component
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState(() => {
    // Get theme from localStorage or default to 'light'
    return localStorage.getItem('theme') || 'light';
  });

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const handleLogin = (loginData) => {
    setIsLoggedIn(true);
    setUserRole(loginData.role);
    setUser(loginData.user);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
        {!isLoggedIn ? (
          <>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <Chatbot />
            <Routes>
              <Route path="/" element={<Login onLogin={handleLogin} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </>
        ) : (
          <div className="dashboard-container">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <Chatbot />
            <div className="bg-shapes">
              <div className="bg-shape"></div>
              <div className="bg-shape"></div>
              <div className="bg-shape"></div>
              <div className="bg-shape"></div>
              <div className="bg-shape"></div>
              <div className="bg-shape"></div>
            </div>
            
            <Sidebar role={userRole} user={user} onLogout={handleLogout} />
            
            <div className="main-content">
              <Routes>
                {/* Admin Routes */}
                {userRole === 'ADMIN' && (
                  <>
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/teachers" element={<TeachersManagement />} />
                    <Route path="/admin/students" element={<StudentsManagement />} />
                    <Route path="/admin/subjects" element={<SubjectsManagement />} />
                    <Route path="*" element={<Navigate to="/admin" replace />} />
                  </>
                )}

                {/* Teacher Routes */}
                {userRole === 'TEACHER' && (
                  <>
                    <Route path="/teacher" element={<TeacherDashboard user={user} />} />
                    <Route path="/teacher/subjects" element={<TeacherDashboard user={user} />} />
                    <Route path="/teacher/results" element={<TeacherResults user={user} />} />
                    <Route path="/teacher/profile" element={<Profile user={user} />} />
                    <Route path="*" element={<Navigate to="/teacher" replace />} />
                  </>
                )}

                {/* Student Routes */}
                {userRole === 'STUDENT' && (
                  <>
                    <Route path="/student" element={<StudentDashboard user={user} />} />
                    <Route path="/student/results" element={<StudentDashboard user={user} />} />
                    <Route path="/student/profile" element={<Profile user={user} />} />
                    <Route path="*" element={<Navigate to="/student" replace />} />
                  </>
                )}
              </Routes>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;