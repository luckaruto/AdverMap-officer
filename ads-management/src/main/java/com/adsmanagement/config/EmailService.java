package com.adsmanagement.config;

import com.adsmanagement.reports.models.Report;
import com.adsmanagement.reports.models.ReportState;
import com.adsmanagement.users.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.Formatter;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender emailSender;

    @Autowired
    private final TemplateEngine templateEngine;

    public EmailService(TemplateEngine templateEngine) {
        this.templateEngine = templateEngine;
    }

    public void sendSimpleMessage(
      String to, String subject, String text) {

        SimpleMailMessage message = new SimpleMailMessage();
        String username = System.getenv("spring.mail.username");
        message.setFrom(username);
        message.setTo(to); 
        message.setSubject(subject); 
        message.setText(text);
        emailSender.send(message);

    }

    public void sendReportMail(Report report) {
        String name = report.getName();
        ReportState state = report.getState();
        String stateStr = "";
        switch (state) {
            case REJECTED -> {
                stateStr = "đã bị từ chối";
            }
            case IN_PROGRESS -> {
                stateStr = "đang được xử lý";
            }
            case APPROVED -> {
                stateStr = "đã được xử lý";
            }
        }

        String subject = "Báo cáo quảng cáo của bạn " + stateStr;

        String text = String.format("Chào %s,\n Báo cáo vi phạm của bạn tại địa chỉ %s đã được quản lý thụ lý với phản hồi:<b> %s <b>,\n" +
                "Cảm ơn bạn đã góp công giúp đỡ phát triển hệ thống quảng cáo, mọi chi tiết bạn có thể xem lại tại đây: <link> %s",
                name, report.getAddress(),report.getResponse(), report.getId());

        sendSimpleMessage(report.getEmail(), subject, text);
    }

    public void sendForgotPasswordMail(User user, String otp) {
        String subject = "OTP CẬP NHẬT MẬT KHẨU";

        MimeMessage mimeMessage = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "UTF-8");
        try {
            helper.setTo(user.getEmail());
            helper.setSubject(subject);

            Context context = new Context();
            context.setVariable("name", user.getName());
            context.setVariable("otp", otp);
            String htmlContent = templateEngine.process("forgot-password-template.html", context);
            helper.setText(htmlContent, true);
            emailSender.send(mimeMessage);
        } catch (MessagingException e) {
            // Handle exception
        }

    }
}