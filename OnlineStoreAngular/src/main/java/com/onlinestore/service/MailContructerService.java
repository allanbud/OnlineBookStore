package com.onlinestore.service;

import com.onlinestore.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.mail.SimpleMailMessage;

public class MailContructerService {
    @Autowired
    private Environment env;

    public SimpleMailMessage constructNewUserEmail(User user, String password) {
        String message="\nPlease use the following credentials to log in and edit your personal information including your own password."
                + "\nUsername:"+user.getUsername()+"\nPassword:"+password;

        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(user.getEmail());
        email.setSubject("SDA Final Online Store - New User");
        email.setText(message);
        email.setFrom(env.getProperty("support.email"));
        return email;
    }

}
