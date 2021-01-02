package com.onlinestore;

import com.onlinestore.config.SecurityUtility;
import com.onlinestore.domain.User;
import com.onlinestore.domain.security.Role;
import com.onlinestore.domain.security.UserRole;
import com.onlinestore.service.UserService;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


import java.util.HashSet;
import java.util.Set;


//TODO to have records in the tables temporarely use
//CommandLineRunner is a simple Spring Boot interface with a run method.
// Spring Boot will automatically call the run method of all beans implementing
//this interface after the application context has been loaded.


@SpringBootApplication
//implement table filling
public class OnlinestoreAngularApplication implements CommandLineRunner {

    @Autowired
    private UserService userService;


    public static void main(String[] args) {
        SpringApplication.run(OnlinestoreAngularApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        User user1 = new User();
        user1.setFirstName("Artur");
        user1.setLastName("Krivorokov");
        user1.setUsername("Artur");
        user1.setPassword(SecurityUtility.passwordEncoder().encode("Artur"));
        user1.setEmail("artur@gmail.com");
        user1.setPhone("+372 4637293");
        Set<UserRole> userRoles = new HashSet<>();
        Role role1 = new Role();
        role1.setRoleId(1);
        role1.setName("ROLE_USER");
        userRoles.add(new UserRole(user1, role1));

        userService.createUser(user1, userRoles);

        userRoles.clear();

        User user2 = new User();
        user2.setFirstName("Allan");
        user2.setLastName("Budarin");
        user2.setUsername("admin");
        user2.setPassword(SecurityUtility.passwordEncoder().encode("admin"));
        user2.setEmail("allanbudarin@gmail.com");
        user2.setPhone("+372 4637293");
        Role role2 = new Role();
        role2.setRoleId(0);
        role2.setName("ROLE_ADMIN");
        userRoles.add(new UserRole(user2, role2));

        userService.createUser(user2, userRoles);
    }
}
