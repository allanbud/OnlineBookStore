package com.onlinestore.service;

import java.util.Locale;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import com.onlinestore.domain.Order;
import com.onlinestore.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Component;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.templateresolver.StringTemplateResolver;


@Component
public class MailContructorService {
    @Autowired
    private Environment environment;

    public SimpleMailMessage constructNewUserEmail(User user, String password) {
        String message="\nThese are SDA FINAL Online Store credentials to log in or \nedit your personal information and password."
                + "\nUsername:   "+user.getUsername()+"\nPassword:   "+password;

        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(user.getEmail());
        email.setSubject("SDA Final Online Store - New User");
        email.setText(message);
        email.setFrom(environment.getProperty("support.email"));
        return email;
    }
//Thymeleeaf + spring boot needs no conf

//https://www.programcreek.com/java-api-examples/?class=org.thymeleaf.TemplateEngine&method=process
    TemplateEngine templateEngine = new TemplateEngine();
    StringTemplateResolver templateResolver = new StringTemplateResolver();

    public MimeMessagePreparator constructOrderConfirmationEmail (User user, Order order, Locale locale) {
        Context context = new Context();
        context.setVariable("order", order);
        context.setVariable("user", user);
        context.setVariable("cartItemList", order.getCartItemList());
        templateResolver.setTemplateMode(TemplateMode.HTML);
        templateEngine.setTemplateResolver(templateResolver);
        String text = templateEngine.process("orderConfirmationEmailTemplate", context);

        MimeMessagePreparator messagePreparator = new MimeMessagePreparator() {
            @Override
            public void prepare(MimeMessage mimeMessage) throws Exception {
                MimeMessageHelper email = new MimeMessageHelper(mimeMessage);
                email.setTo(user.getEmail());
                email.setSubject("Order Confirmation - "+order.getId());
                email.setText(text,true);
                email.setFrom(new InternetAddress("allanbudarin@gmail.com"));
            }
        };

        return messagePreparator;
    }


}
