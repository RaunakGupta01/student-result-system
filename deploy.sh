#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
print_header() {
    echo -e "\n${BLUE}========================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}========================================${NC}\n"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

# Check if Docker is installed
check_docker() {
    print_header "Checking Docker Installation"
    
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed"
        echo "Install from: https://www.docker.com/products/docker-desktop"
        exit 1
    fi
    print_success "Docker is installed: $(docker --version)"
    
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose is not installed"
        exit 1
    fi
    print_success "Docker Compose is installed: $(docker-compose --version)"
}

# Setup environment variables
setup_env() {
    print_header "Setting Up Environment"
    
    if [ ! -f .env ]; then
        print_info "Creating .env from .env.example"
        cp .env.example .env
        print_success ".env file created"
        print_info "Please edit .env with your configuration:"
        print_info "  - Database passwords"
        print_info "  - Email credentials (Gmail App Password)"
        print_info "  - Domain names"
        return 1
    else
        print_success ".env file already exists"
        return 0
    fi
}

# Build Docker images
build_images() {
    print_header "Building Docker Images"
    
    if docker-compose build --no-cache; then
        print_success "Docker images built successfully"
    else
        print_error "Failed to build Docker images"
        exit 1
    fi
}

# Start services
start_services() {
    print_header "Starting Services"
    
    if docker-compose up -d; then
        print_success "Services started successfully"
        sleep 10
        return 0
    else
        print_error "Failed to start services"
        exit 1
    fi
}

# Health check
health_check() {
    print_header "Checking Service Health"
    
    services=("mysql" "backend" "frontend")
    
    for service in "${services[@]}"; do
        status=$(docker-compose ps | grep $service | awk '{print $NF}')
        if [[ $status == "healthy" ]]; then
            print_success "$service is healthy"
        elif [[ $status == "Up" ]]; then
            print_info "$service is running (health check pending)"
        else
            print_error "$service is not running"
        fi
    done
}

# Display access information
show_access_info() {
    print_header "Application Ready!"
    
    echo -e "${GREEN}Access your application:${NC}"
    echo -e "  🌐 Frontend:  ${BLUE}http://localhost${NC}"
    echo -e "  📡 Backend:   ${BLUE}http://localhost:8080/api${NC}"
    echo -e "  💾 Database:  ${BLUE}localhost:3306${NC}"
    echo -e "\n${YELLOW}Default Credentials:${NC}"
    echo -e "  Admin:    Foradmin / Foradmin"
    echo -e "  Student:  (Roll number from database)"
    echo -e "  Teacher:  (Teacher ID from database)"
    echo -e "\n${YELLOW}Useful Commands:${NC}"
    echo -e "  View logs:     ${BLUE}docker-compose logs -f${NC}"
    echo -e "  Stop services: ${BLUE}docker-compose down${NC}"
    echo -e "  Restart:       ${BLUE}docker-compose restart${NC}"
    echo -e "  Shell access:  ${BLUE}docker-compose exec backend sh${NC}"
}

# Main deployment flow
main() {
    print_header "Student Result Management System - Docker Deployment"
    
    # Parse arguments
    case "${1:-deploy}" in
        deploy)
            check_docker
            setup_env || {
                print_info "Please configure .env and run again"
                exit 0
            }
            build_images
            start_services
            health_check
            show_access_info
            ;;
        stop)
            print_header "Stopping Services"
            docker-compose down
            print_success "Services stopped"
            ;;
        restart)
            print_header "Restarting Services"
            docker-compose restart
            print_success "Services restarted"
            ;;
        logs)
            docker-compose logs -f "${2:-}"
            ;;
        status)
            docker-compose ps
            ;;
        clean)
            print_header "Cleaning Docker Resources"
            docker-compose down -v
            docker system prune -a --volumes -f
            print_success "Cleanup complete"
            ;;
        help|--help|-h)
            cat << EOF
Student Result Management System - Deployment Script

Usage: $0 [COMMAND] [OPTIONS]

Commands:
  deploy      Build and start all services (default)
  stop        Stop all running services
  restart     Restart all services
  logs [svc]  View logs (optional: specify service)
  status      Show services status
  clean       Remove all containers and volumes
  help        Show this help message

Examples:
  $0                    # Deploy application
  $0 logs backend       # View backend logs
  $0 logs -f            # Follow all logs
  $0 clean             # Remove everything

Environment Setup:
  1. Copy .env.example to .env
  2. Edit .env with your configuration
  3. Run: $0 deploy

For more information, see DOCKER_DEPLOYMENT.md
EOF
            ;;
        *)
            print_error "Unknown command: $1"
            echo "Run '$0 help' for usage information"
            exit 1
            ;;
    esac
}

# Run main function
main "$@"
