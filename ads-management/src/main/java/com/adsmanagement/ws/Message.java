package com.adsmanagement.ws;

import com.adsmanagement.notifications.NotificationType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class Message {
    private NotificationType type;
    private String content;
    private Float latitude;
    private Float longitude;
}
