# 🎓 Student Result Management System

## Advanced Full-Stack Application with AI Chatbot

[![Java](https://img.shields.io/badge/Java-17-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.0-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-blue.svg)](https://www.mysql.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Project Structure](#project-structure)
- [Team Roles](#team-roles)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## 🌟 Overview

The **Student Result Management System** is a comprehensive, enterprise-grade web application designed to streamline academic result management across educational institutions. Built with modern technologies, it provides role-based access for administrators, teachers, and students.

### **Key Highlights:**
- 🎯 **Three Role-Based Dashboards** - Admin, Teacher, Student
- 🤖 **AI-Powered Chatbot** - Google Gemini integration
- 📧 **Email Notifications** - Automated credential and result emails
- 📄 **PDF Reports** - Professional result cards
- 📊 **Excel Export** - Data export functionality
- 🌓 **Dark/Light Themes** - User preference support
- ✨ **Modern UI** - Gradient design with smooth animations
- 📱 **Responsive** - Mobile, tablet, and desktop support

---

## ✨ Features

### **Admin Dashboard**
- ✅ Manage teachers (Create, Read, Update, Delete)
- ✅ Manage students (CRUD operations)
- ✅ Create and assign subjects to teachers
- ✅ View system statistics
- ✅ Export data to Excel
- ✅ Send automated credential emails
- ✅ Monitor overall performance

### **Teacher Dashboard**
- ✅ View assigned subjects
- ✅ Enter student results
- ✅ Auto-grade calculation
- ✅ View student lists by subject
- ✅ Edit existing results
- ✅ Send result notifications
- ✅ Profile management

### **Student Dashboard**
- ✅ View all results and grades
- ✅ Download PDF result reports
- ✅ Check subject-wise performance
- ✅ View overall percentage
- ✅ Track academic progress
- ✅ Profile information
- ✅ Receive email notifications

### **AI Chatbot (Google Gemini)**
- ✅ Natural language understanding
- ✅ Context-aware responses
- ✅ Answer questions about:
  - Grading system
  - How to check results
  - PDF downloads
  - Email notifications
  - System navigation
- ✅ 24/7 availability
- ✅ Free tier (60 requests/minute)

### **Advanced Features**
- ✅ **Email Service** - Gmail SMTP integration
- ✅ **PDF Generation** - iText library
- ✅ **Excel Export** - Apache POI
- ✅ **Theme Toggle** - Dark/Light mode with persistence
- ✅ **Animations** - Smooth transitions and effects
- ✅ **Security** - Role-based access control
- ✅ **Responsive Design** - Mobile-first approach

---

## 🛠️ Technology Stack

### **Frontend**
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2.0 | UI Framework |
| React Router | 6.20.0 | Client-side routing |
| Axios | 1.6.0 | HTTP client |
| Lucide React | 0.263.1 | Icon library |
| CSS3 | - | Styling & animations |

### **Backend**
| Technology | Version | Purpose |
|------------|---------|---------|
| Java | 17 | Programming language |
| Spring Boot | 3.2.0 | Application framework |
| Spring Data JPA | 3.2.0 | Database ORM |
| Spring Web | 3.2.0 | REST API |
| Spring Mail | 3.2.0 | Email service |
| MySQL Connector | 8.0.33 | Database driver |
| Lombok | 1.18.30 | Boilerplate reduction |
| iText | 5.5.13.3 | PDF generation |
| Apache POI | 5.2.3 | Excel export |

### **Database**
| Technology | Version | Purpose |
|------------|---------|---------|
| MySQL | 8.0 | Primary database |
| Hibernate | 6.2.0 | ORM framework |

### **AI Integration**
| Service | Model | Purpose |
|---------|-------|---------|
| Google Gemini | gemini-pro | Chatbot AI |
| Hugging Face | DialoGPT-medium | Fallback AI |

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Client (Browser)                      │
│  ┌─────────────────────────────────────────────────┐   │
│  │   React Frontend (Port 3000)                     │   │
│  │   - Components (Login, Dashboard, Forms)         │   │
│  │   - State Management (useState, useEffect)       │   │
│  │   - Routing (React Router)                       │   │
│  │   - AI Chatbot (Google Gemini)                   │   │
│  └─────────────────────────────────────────────────┘   │
└───────────────────┬─────────────────────────────────────┘
                    │ HTTP/REST API
                    │ (Axios)
                    ▼
┌─────────────────────────────────────────────────────────┐
│              Spring Boot Backend (Port 8080)             │
│  ┌─────────────────────────────────────────────────┐   │
│  │   Controllers (REST Endpoints)                   │   │
│  │   ├── AuthController                             │   │
│  │   ├── StudentController                          │   │
│  │   ├── TeacherController                          │   │
│  │   ├── SubjectController                          │   │
│  │   ├── ResultController                           │   │
│  │   └── ExportController                           │   │
│  └─────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────┐   │
│  │   Services (Business Logic)                      │   │
│  │   ├── EmailService                               │   │
│  │   ├── PDFService                                 │   │
│  │   ├── ExcelService                               │   │
│  │   └── Result Auto-Grade Calculation              │   │
│  └─────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────┐   │
│  │   Repositories (Data Access - JPA)               │   │
│  └─────────────────────────────────────────────────┘   │
└───────────────────┬─────────────────────────────────────┘
                    │ JDBC
                    │ (MySQL Connector)
                    ▼
┌─────────────────────────────────────────────────────────┐
│              MySQL Database (Port 3306)                  │
│  ┌─────────────────────────────────────────────────┐   │
│  │   Tables:                                        │   │
│  │   ├── admins                                     │   │
│  │   ├── teachers                                   │   │
│  │   ├── students                                   │   │
│  │   ├── subjects                                   │   │
│  │   └── results                                    │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘

External Services:
┌──────────────────┐    ┌──────────────────┐
│  Gmail SMTP      │    │  Google Gemini   │
│  (Email Service) │    │  (AI Chatbot)    │
└──────────────────┘    └──────────────────┘
```

---

## 🚀 Installation

### **Prerequisites**

- **Java Development Kit (JDK)** 17 or higher
- **Apache Maven** 3.8+
- **Node.js** 16+ and npm
- **MySQL** 8.0+
- **Git** (for cloning)

### **Step 1: Clone Repository**

```bash
git clone https://github.com/yourusername/student-result-system.git
cd student-result-system
```

### **Step 2: Database Setup**

```bash
# Login to MySQL
mysql -u root -p

# Create database (or let Spring Boot auto-create)
CREATE DATABASE student_result_db;

# Exit MySQL
exit
```

### **Step 3: Backend Setup**

```bash
# Navigate to backend folder
cd backend

# Update application.properties with your MySQL password
# File: src/main/resources/application.properties
# Change: spring.datasource.password=your_password

# Build the project
mvn clean install

# Run the application
mvn spring-boot:run

# Backend will start on http://localhost:8080
```

### **Step 4: Frontend Setup**

```bash
# Open new terminal
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start development server
npm start

# Frontend will open on http://localhost:3000
```

### **Step 5: Email Configuration (Optional)**

To enable email notifications:

1. **Get Gmail App Password:**
   - Go to Google Account → Security
   - Enable 2-Factor Authentication
   - Generate App Password

2. **Update application.properties:**
   ```properties
   spring.mail.username=your-email@gmail.com
   spring.mail.password=your-app-password
   app.email.enabled=true
   ```

### **Step 6: AI Chatbot Configuration (Optional)**

To enable Google Gemini AI:

1. **Get Free API Key:**
   - Visit: https://makersuite.google.com/app/apikey
   - Sign in with Google
   - Create API key

2. **Update App.jsx:**
   ```javascript
   const GEMINI_API_KEY = 'YOUR_API_KEY_HERE';
   ```

---

## ⚙️ Configuration

### **Backend Configuration (application.properties)**

```properties
# Database
spring.datasource.url=jdbc:mysql://localhost:3306/student_result_db
spring.datasource.username=root
spring.datasource.password=your_password

# JPA/Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# Server
server.port=8080

# Email (Optional)
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password
app.email.enabled=false

# CORS
spring.web.cors.allowed-origins=http://localhost:3000
```

### **Frontend Configuration**

```javascript
// src/api.js
const API_BASE_URL = 'http://localhost:8080/api';
```

---

## 📖 Usage

### **Default Login Credentials**

| Role | Username/ID | Password |
|------|-------------|----------|
| Admin | admin | admin123 |
| Teacher | (Created by admin) | (Set by admin) |
| Student | (Roll Number) | (Set by admin) |

### **Admin Workflow**

1. **Login** as admin
2. **Create Teachers:**
   - Go to "Teachers" page
   - Click "Add Teacher"
   - Fill details (Teacher ID, Name, Email, Phone, Department)
   - Teacher receives email with credentials
3. **Create Students:**
   - Go to "Students" page
   - Click "Add Student"
   - Fill details (Roll No, Name, Class, Section, Email)
   - Student receives email with credentials
4. **Create Subjects:**
   - Go to "Subjects" page
   - Click "Add Subject"
   - Assign to teacher
5. **View Statistics:**
   - Dashboard shows total counts
   - Export data to Excel

### **Teacher Workflow**

1. **Login** with Teacher ID
2. **View Assigned Subjects**
3. **Enter Results:**
   - Select subject
   - Choose student
   - Enter marks
   - System auto-calculates grade
   - Student receives email notification
4. **View/Edit Results**

### **Student Workflow**

1. **Login** with Roll Number
2. **View Results:**
   - See all subject results
   - Check grades and percentages
3. **Download PDF Report**
4. **Check Profile**
5. **Use AI Chatbot for help**

---

## 🔌 API Documentation

### **Authentication**

```http
POST /api/auth/login
Content-Type: application/json

{
  "role": "admin|teacher|student",
  "username": "string",
  "password": "string"
}

Response: 200 OK
{
  "id": 1,
  "name": "string",
  "role": "string",
  ...
}
```

### **Students**

```http
GET    /api/students              # Get all students
GET    /api/students/{id}         # Get student by ID
POST   /api/students              # Create student
PUT    /api/students/{id}         # Update student
DELETE /api/students/{id}         # Delete student
GET    /api/students/export/excel # Export to Excel
```

### **Teachers**

```http
GET    /api/teachers              # Get all teachers
GET    /api/teachers/{id}         # Get teacher by ID
POST   /api/teachers              # Create teacher
PUT    /api/teachers/{id}         # Update teacher
DELETE /api/teachers/{id}         # Delete teacher
GET    /api/teachers/export/excel # Export to Excel
```

### **Subjects**

```http
GET    /api/subjects              # Get all subjects
GET    /api/subjects/{id}         # Get subject by ID
POST   /api/subjects              # Create subject
PUT    /api/subjects/{id}         # Update subject
DELETE /api/subjects/{id}         # Delete subject
```

### **Results**

```http
GET    /api/results                        # Get all results
GET    /api/results/student/{studentId}   # Get student results
POST   /api/results                        # Create result
PUT    /api/results/{id}                   # Update result
DELETE /api/results/{id}                   # Delete result
GET    /api/results/export/excel           # Export to Excel
GET    /api/export/results/student/{id}/pdf # Download PDF
```

---

## 🗄️ Database Schema

### **Tables**

#### **admins**
```sql
CREATE TABLE admins (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **teachers**
```sql
CREATE TABLE teachers (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    teacher_id VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    department VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **students**
```sql
CREATE TABLE students (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    roll_no VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    class_name VARCHAR(100) NOT NULL,
    section VARCHAR(10) NOT NULL,
    guardian_name VARCHAR(255),
    guardian_phone VARCHAR(20),
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **subjects**
```sql
CREATE TABLE subjects (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    subject_code VARCHAR(50) UNIQUE NOT NULL,
    subject_name VARCHAR(255) NOT NULL,
    class_name VARCHAR(100) NOT NULL,
    total_marks INT NOT NULL,
    teacher_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (teacher_id) REFERENCES teachers(id)
);
```

#### **results**
```sql
CREATE TABLE results (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    student_id BIGINT NOT NULL,
    subject_id BIGINT NOT NULL,
    marks_obtained INT NOT NULL,
    grade VARCHAR(5),
    exam_type VARCHAR(50),
    semester VARCHAR(20),
    year INT,
    remarks TEXT,
    entered_by BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (subject_id) REFERENCES subjects(id),
    FOREIGN KEY (entered_by) REFERENCES teachers(id)
);
```

---

## 📁 Project Structure

```
student-result-system/
│
├── backend/                          # Spring Boot Backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/studentresult/
│   │   │   │   ├── model/           # Entity classes
│   │   │   │   │   ├── Admin.java
│   │   │   │   │   ├── Teacher.java
│   │   │   │   │   ├── Student.java
│   │   │   │   │   ├── Subject.java
│   │   │   │   │   └── Result.java
│   │   │   │   ├── repository/      # JPA Repositories
│   │   │   │   │   ├── AdminRepository.java
│   │   │   │   │   ├── TeacherRepository.java
│   │   │   │   │   ├── StudentRepository.java
│   │   │   │   │   ├── SubjectRepository.java
│   │   │   │   │   └── ResultRepository.java
│   │   │   │   ├── service/         # Business Logic
│   │   │   │   │   ├── AuthService.java
│   │   │   │   │   ├── StudentService.java
│   │   │   │   │   ├── TeacherService.java
│   │   │   │   │   ├── SubjectService.java
│   │   │   │   │   ├── ResultService.java
│   │   │   │   │   ├── EmailService.java
│   │   │   │   │   ├── PDFService.java
│   │   │   │   │   └── ExcelService.java
│   │   │   │   ├── controller/      # REST Controllers
│   │   │   │   │   ├── AuthController.java
│   │   │   │   │   ├── StudentController.java
│   │   │   │   │   ├── TeacherController.java
│   │   │   │   │   ├── SubjectController.java
│   │   │   │   │   ├── ResultController.java
│   │   │   │   │   └── ExportController.java
│   │   │   │   ├── dto/             # Data Transfer Objects
│   │   │   │   │   └── ResultDTO.java
│   │   │   │   ├── config/          # Configuration
│   │   │   │   │   └── DataInitializer.java
│   │   │   │   └── StudentResultManagementApplication.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/                    # Unit tests
│   └── pom.xml                       # Maven configuration
│
├── frontend/                         # React Frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.jsx                  # Main application
│   │   ├── index.js                 # Entry point
│   │   ├── index.css                # Global styles
│   │   └── api.js                   # API client
│   ├── package.json                 # npm configuration
│   └── README.md
│
├── docs/                            # Documentation
│   ├── README.md                    # This file
│   ├── SRS.md                       # Requirements specification
│   ├── WORKFLOW.md                  # Team workflow
│   ├── API-DOCS.md                  # API documentation
│   └── DATABASE-SCHEMA.md           # Database design
│
├── database-init.sql                # Sample data
├── QUICKSTART.md                    # Quick setup guide
└── LICENSE                          # MIT License
```

---

## 👥 Team Roles

See [WORKFLOW.md](docs/WORKFLOW.md) for detailed team structure and responsibilities.

---

## 🧪 Testing

### **Backend Testing**

```bash
cd backend
mvn test
```

### **Frontend Testing**

```bash
cd frontend
npm test
```

### **Manual Testing Checklist**

- [ ] Admin can create/edit/delete teachers
- [ ] Admin can create/edit/delete students
- [ ] Admin can create subjects
- [ ] Teachers can enter results
- [ ] Students can view results
- [ ] PDF download works
- [ ] Excel export works
- [ ] Email notifications sent
- [ ] Chatbot responds
- [ ] Theme toggle works
- [ ] Mobile responsive

---

## 🌐 Deployment

### **Backend (Spring Boot)**

```bash
# Build JAR
cd backend
mvn clean package

# Run JAR
java -jar target/student-result-management-0.0.1-SNAPSHOT.jar
```

### **Frontend (React)**

```bash
# Build production
cd frontend
npm run build

# Serve with nginx or Apache
```

### **Docker Deployment (Optional)**

```dockerfile
# Backend Dockerfile
FROM openjdk:17-jdk-slim
COPY target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]

# Frontend Dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
```

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Support

For issues and questions:
- 📧 Email: support@studentresult.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/student-result-system/issues)
- 📖 Docs: [Documentation](docs/)

---

## 🙏 Acknowledgments

- Spring Boot Team
- React Team
- Google Gemini AI
- iText PDF
- Apache POI
- MySQL Community

---

## 📊 Project Stats

- **Lines of Code:** ~15,000+
- **Components:** 25+
- **API Endpoints:** 30+
- **Database Tables:** 5
- **Features:** 50+

---

**Built with ❤️ by the Student Result System Team**

**Version:** 2.0.0  
**Last Updated:** February 2026
