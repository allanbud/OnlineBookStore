package com.onlinestore.service;

import com.onlinestore.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Component;

@Component
public class MailContructorService {
    @Autowired
    private Environment environment;

    public SimpleMailMessage constructNewUserEmail(User user, String password) {
        String message="\nPlease use the following credentials to log in or edit your personal information and password."
                + "\nUsername:   "+user.getUsername()+"\nPassword:   "+password;

        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(user.getEmail());
        email.setSubject("SDA Final Online Store - New User");
        email.setText(message);
        email.setFrom(environment.getProperty("support.email"));
        return email;
    }

}
