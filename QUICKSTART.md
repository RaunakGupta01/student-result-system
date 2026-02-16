# Quick Start Guide - Student Result Management System

## 🚀 Getting Started in 5 Minutes

### Step 1: Install Prerequisites
- Install Java 17 or higher
- Install Node.js 16+ and npm
- Install MySQL 8.0+
- Install Maven 3.6+

### Step 2: Database Setup
```bash
# Start MySQL service
# Create database (it will be auto-created by application)
# Or manually create:
mysql -u root -p
CREATE DATABASE student_result_db;
exit;
```

### Step 3: Backend Setup
```bash
# Navigate to backend folder
cd backend

# Update MySQL credentials in src/main/resources/application.properties if needed
# Default: username=root, password=root

# Run the backend
mvn spring-boot:run

# Backend will start on http://localhost:8080
# Default admin account is created automatically
```

### Step 4: Frontend Setup
```bash
# Open new terminal
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start frontend
npm start

# Frontend will open at http://localhost:3000
```

## 🔑 First Login

### Admin Login
1. Open http://localhost:3000
2. Select "Admin" role
3. Username: `admin`
4. Password: `admin123`
5. Click Login

## 📝 First Steps After Login

### As Admin:

#### 1. Add a Teacher
- Click "Teachers" in sidebar
- Click "Add Teacher" button
- Fill in details:
  - Teacher ID: T001
  - Name: John Doe
  - Email: john@school.com
  - Phone: 1234567890
  - Department: Mathematics
  - Password: teacher123
- Click "Create"

#### 2. Add a Student
- Click "Students" in sidebar
- Click "Add Student" button
- Fill in details:
  - Roll No: STU001
  - Name: Jane Smith
  - Email: jane@student.com
  - Phone: 9876543210
  - Class: Class 10
  - Section: A
  - Password: STU001
- Click "Create"

#### 3. Add a Subject
- Click "Subjects" in sidebar
- Click "Add Subject" button
- Fill in details:
  - Subject Code: MATH10
  - Subject Name: Mathematics
  - Class: Class 10
  - Total Marks: 100
  - Passing Marks: 40
  - Assign Teacher: Select from dropdown
- Click "Create"

### Test Teacher Login:
1. Logout from admin
2. Select "Teacher" role
3. Username: T001 (the teacher ID you created)
4. Password: teacher123
5. You'll see assigned subjects

### Test Student Login:
1. Logout
2. Select "Student" role
3. Username: STU001 (the roll number you created)
4. Password: STU001
5. You'll see your profile and results

## 🎯 Common Tasks

### Adding Results (Teacher Role)
1. Login as teacher
2. Go to "Enter Results"
3. Click "Add Result"
4. Select student, subject
5. Enter marks
6. Select exam type, semester, year
7. Click "Add Result"
8. Grade is calculated automatically

### Viewing Results (Student Role)
1. Login as student
2. Dashboard shows all results
3. View grades, marks, and performance

## 🐛 Troubleshooting

### Backend won't start
- Check MySQL is running
- Verify database credentials
- Ensure port 8080 is free
- Check Java version: `java -version`

### Frontend won't start
- Delete node_modules: `rm -rf node_modules`
- Reinstall: `npm install`
- Clear cache: `npm cache clean --force`
- Ensure port 3000 is free

### Can't connect to backend
- Verify backend is running on port 8080
- Check CORS configuration
- Check browser console for errors

### Login fails
- Admin: username=admin, password=admin123
- Teacher: username=TeacherID, password=(set by admin)
- Student: username=RollNo, password=(set by admin)

## 📊 Sample Data (Optional)

Run the SQL script to add sample data:
```bash
mysql -u root -p student_result_db < database-init.sql
```

This adds:
- 5 teachers
- 8 students across different classes
- 8 subjects
- Sample results

## 🎨 UI Features

- **Modern Design**: Purple gradient theme
- **Responsive**: Works on mobile and desktop
- **Interactive**: Smooth animations
- **Real-time**: Live statistics
- **User-friendly**: Easy navigation

## 📱 Mobile Access

The application is responsive and works on mobile browsers:
- Access from mobile browser
- Use same URL: http://localhost:3000
- All features available

## 🔐 Security Note

**For Production:**
- Change default admin password
- Implement JWT authentication
- Hash passwords (currently plain text for demo)
- Add input validation
- Enable HTTPS
- Configure proper CORS

## 📈 Next Steps

1. Add more teachers and students
2. Create subjects for different classes
3. Teachers enter results
4. Students view their performance
5. Admin monitors overall statistics

## 💡 Tips

- **Admin**: Can see all data and statistics
- **Teacher**: Can only see assigned subjects
- **Student**: Can only see own results
- **Grades**: Calculated automatically based on percentage
- **Data**: All changes reflect immediately

## 🆘 Need Help?

Check:
1. README.md for detailed documentation
2. Backend logs in console
3. Frontend console for errors
4. Database for data verification

---

**Happy Learning! 🎓**
