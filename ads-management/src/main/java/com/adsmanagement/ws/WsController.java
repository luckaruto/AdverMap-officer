package com.adsmanagement.ws;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class WsController {

    @MessageMapping("/notify")
    @SendTo("/topic/notification")
    public Message notify(Message message) throws Exception {
        Thread.sleep(1000); // simulated delay
        return message;
    }

}