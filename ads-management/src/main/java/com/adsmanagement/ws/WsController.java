package com.adsmanagement.ws;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class WsController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;
    @MessageMapping("/message") // app/message
    @SendTo("/topic/notification")
    public Message receiveMessage(Message message) throws Exception {
        Thread.sleep(1000); // simulated delay
        return message;
    }

//    @MessageMapping("/private") // app/private-message
//    public Message receivePrivateMessage(Message message) throws Exception {
//        System.out.println(message.toString());
//        simpMessagingTemplate.convertAndSendToUser(message.getReceiverId().toString(), "/private", message);
//        return message;
//    }

}