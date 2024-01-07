package com.adsmanagement.config;

import com.adsmanagement.reports.models.Report;
import com.adsmanagement.reports.models.ReportState;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Formatter;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender emailSender;

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
}