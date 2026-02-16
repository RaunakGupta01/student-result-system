#!/bin/bash

echo "========================================="
echo "Student Result Management System Setup"
echo "========================================="
echo ""

# Check Java
echo "Checking Java installation..."
if command -v java &> /dev/null
then
    JAVA_VERSION=$(java -version 2>&1 | awk -F '"' '/version/ {print $2}')
    echo "✓ Java found: $JAVA_VERSION"
else
    echo "✗ Java not found. Please install Java 17 or higher."
    exit 1
fi

# Check Maven
echo "Checking Maven installation..."
if command -v mvn &> /dev/null
then
    MVN_VERSION=$(mvn -version | head -n 1)
    echo "✓ Maven found: $MVN_VERSION"
else
    echo "✗ Maven not found. Please install Maven 3.6+."
    exit 1
fi

# Check Node
echo "Checking Node.js installation..."
if command -v node &> /dev/null
then
    NODE_VERSION=$(node -v)
    echo "✓ Node.js found: $NODE_VERSION"
else
    echo "✗ Node.js not found. Please install Node.js 16+."
    exit 1
fi

# Check npm
echo "Checking npm installation..."
if command -v npm &> /dev/null
then
    NPM_VERSION=$(npm -v)
    echo "✓ npm found: $NPM_VERSION"
else
    echo "✗ npm not found. Please install npm."
    exit 1
fi

# Check MySQL
echo "Checking MySQL installation..."
if command -v mysql &> /dev/null
then
    MYSQL_VERSION=$(mysql --version)
    echo "✓ MySQL found: $MYSQL_VERSION"
else
    echo "⚠ MySQL not found. Please ensure MySQL 8.0+ is installed and running."
fi

echo ""
echo "========================================="
echo "All prerequisites checked!"
echo "========================================="
echo ""
echo "Setup Instructions:"
echo ""
echo "1. Database Setup:"
echo "   - Start MySQL service"
echo "   - Database will be auto-created by Spring Boot"
echo "   - Or manually: CREATE DATABASE student_result_db;"
echo ""
echo "2. Backend Setup:"
echo "   cd backend"
echo "   mvn clean install"
echo "   mvn spring-boot:run"
echo ""
echo "3. Frontend Setup (in new terminal):"
echo "   cd frontend"
echo "   npm install"
echo "   npm start"
echo ""
echo "4. Access Application:"
echo "   http://localhost:3000"
echo ""
echo "5. Login Credentials:"
echo "   Admin - Username: admin, Password: admin123"
echo ""
echo "========================================="
echo "Read QUICKSTART.md for detailed steps!"
echo "========================================="
