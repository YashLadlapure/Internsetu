package com.yash.internSetuBe.modules.identity.service;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender javaMailSender;

    @Value("${spring.mail.properties.mail.smtp.from}")
    private String fromMail;

    public void sendMail(String to, String subject, String body) {
        try{
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setFrom(fromMail);
            mailMessage.setSubject(subject);
            mailMessage.setText(body);
            mailMessage.setTo(to);
            javaMailSender.send(mailMessage);
        }catch (Exception ex) {
            throw new RuntimeException(ex.getMessage());
        }
    }
}
