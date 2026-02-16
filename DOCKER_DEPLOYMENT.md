# Docker Deployment Guide

This guide explains how to deploy the Student Result Management System using Docker.

## Prerequisites

- Docker (v20.10+)
- Docker Compose (v1.29+)
- Git
- 2GB RAM minimum

## Installation

### 1. Install Docker

**Windows/Mac:** Download from [Docker Desktop](https://www.docker.com/products/docker-desktop)

**Linux:** 
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

### 2. Install Docker Compose

Usually included with Docker Desktop. Verify:
```bash
docker-compose --version
```

## Quick Start (Local Deployment)

### Step 1: Clone the repository
```bash
git clone https://github.com/RaunakGupta01/student-result-system.git
cd student-result-system
```

### Step 2: Configure environment variables
```bash
cp .env.example .env
# Edit .env with your configuration
nano .env
```

### Step 3: Build and run with Docker Compose
```bash
docker-compose up --build
```

This will:
- Build the backend Docker image
- Build the frontend Docker image
- Create and start MySQL container
- Start all services and connect them

### Step 4: Access the application
- **Frontend:** http://localhost
- **Backend API:** http://localhost:8080/api

## Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# Database
DB_ROOT_PASSWORD=your_password
DB_NAME=student_result_db
DB_USER=root
DB_PASSWORD=your_password

# Email (Gmail)
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
EMAIL_ENABLED=true

# Ports
BACKEND_PORT=8080
FRONTEND_PORT=80
```

### Gmail App Password Setup

1. Enable 2-factor authentication on your Google Account
2. Go to https://myaccount.google.com/apppasswords
3. Select "Mail" and "Windows PC"
4. Copy the generated 16-character password
5. Add to `.env` as `MAIL_PASSWORD`

## Docker Commands

### Start services
```bash
docker-compose up -d
```

### Stop services
```bash
docker-compose down
```

### View logs
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mysql
```

### Rebuild images
```bash
docker-compose build --no-cache
docker-compose up
```

### Access database
```bash
docker exec -it student_result_mysql mysql -u root -p student_result_db
```

### Remove all containers and volumes
```bash
docker-compose down -v
```

## Production Deployment

### Deploy on DigitalOcean App Platform

1. **Push to GitHub** - Ensure code is in your repository
2. **Create DigitalOcean Account** - Sign up at digitalocean.com
3. **Connect GitHub** - Go to Apps → Create App → Select your repo
4. **Configure Services:**
   - Choose Docker Compose as the deployment method
   - Set environment variables in the dashboard
5. **Deploy** - Click Deploy and wait for completion

### Deploy on AWS with Docker

1. **Create EC2 Instance:**
   ```bash
   # Ubuntu 22.04 LTS
   - t2.medium or larger
   - 2GB RAM minimum
   - Open ports: 80, 443, 8080
   ```

2. **Install Docker:**
   ```bash
   sudo apt update
   sudo apt install docker.io docker-compose -y
   sudo usermod -aG docker $USER
   ```

3. **Clone and deploy:**
   ```bash
   git clone <your-repo>
   cd student-result-system
   cp .env.example .env
   # Edit .env
   docker-compose up -d
   ```

4. **Set up SSL with Let's Encrypt:**
   ```bash
   sudo apt install certbot python3-certbot-nginx -y
   sudo certbot certonly --standalone -d your-domain.com
   ```

### Deploy on Heroku

Note: Heroku free tier is no longer available. Use alternate services above.

## Health Checks

Services include health checks. View status:
```bash
docker-compose ps
```

All services should show "healthy" status.

## Database Backup

### Manual Backup
```bash
docker exec student_result_mysql mysqldump -u root -p student_result_db > backup.sql
```

### Restore from Backup
```bash
docker exec -i student_result_mysql mysql -u root -p student_result_db < backup.sql
```

## Troubleshooting

### Port Already in Use
```bash
# Change ports in docker-compose.yml or .env
# Or kill the process:
lsof -i :8080
kill -9 <PID>
```

### Database Connection Failed
```bash
# Check MySQL logs
docker logs student_result_mysql

# Restart MySQL
docker-compose restart mysql
docker-compose restart backend
```

### Frontend can't reach backend
```bash
# Check backend is running
docker-compose logs backend

# Verify CORS settings in application.properties
# Update frontend API URL in docker environment if needed
```

### Out of Disk Space
```bash
# Clean up Docker
docker system prune -a
docker volume prune
```

## Monitoring and Logging

### View all logs
```bash
docker-compose logs -f --tail=50
```

### Monitor resources
```bash
docker stats
```

## Scaling

To run multiple backend instances:

Edit `docker-compose.yml` and add:
```yaml
backend-2:
  extends: backend
  container_name: student_result_backend_2
```

Then use a load balancer (Nginx) in front.

## Security Notes

1. **Change default passwords** in `.env`
2. **Enable HTTPS** in production
3. **Use environment variables** - never hardcode secrets
4. **Update images regularly** - `docker-compose pull`
5. **Limit database access** - use VPC in cloud
6. **Enable firewalls** - restrict IP ranges

## Support

For issues or questions:
- GitHub Issues: https://github.com/RaunakGupta01/student-result-system/issues
- Email: rggupta01rg@gmail.com

## License

This project is licensed under the MIT License.
