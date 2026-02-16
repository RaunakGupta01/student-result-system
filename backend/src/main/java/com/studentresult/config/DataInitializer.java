package com.studentresult.config;

import com.studentresult.model.Admin;
import com.studentresult.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private AdminRepository adminRepository;
    
    @Override
    public void run(String... args) throws Exception {
        // Create default admin if not exists
        if (adminRepository.findByUsername("admin").isEmpty()) {
            Admin admin = new Admin();
            admin.setUsername("admin");
            admin.setPassword("admin123");
            admin.setRole("ADMIN");
            adminRepository.save(admin);
            System.out.println("Default admin created: username=admin, password=admin123");
        }
    }
}
