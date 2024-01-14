package com.adsmanagement.ws;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class WSService {

    private final SimpMessagingTemplate messagingTemplate;
    @Autowired
    public WSService(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    public void notifyUser(final String id, final Message message) {
        System.out.println(id);
        System.out.println(message.toString());
        try {
            messagingTemplate.convertAndSendToUser(id,"/private", message);
        } catch (Exception e){

        }
    }
}