package com.adsmanagement.notifications;

import com.adsmanagement.reports.dto.ReportDto;
import com.adsmanagement.reports.models.Report;
import com.adsmanagement.reports.models.ReportState;
import com.adsmanagement.spaces.models.Space;
import com.adsmanagement.surfaces.dto.SurfaceDto;
import com.adsmanagement.surfaces.models.Surface;
import com.adsmanagement.users.dto.UserDTO;
import com.adsmanagement.users.models.User;
import com.adsmanagement.wards.Ward;
import com.adsmanagement.wards.WardDTO;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "notification")
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Short id;

    @ManyToOne
    @JoinColumn(name="report_id")
    private Report report;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    @Column(name = "is_seen")
    @ColumnDefault("false")
    private Boolean isSeen;

    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "updated_at")
    @CreationTimestamp
    private Date updatedAt;

    @Column
    private String userAddress;

    @Column(name = "state")
    @Enumerated(EnumType.STRING)
    private ReportState state;

    @Column(name = "response")
    private String response;

    @Column(name = "notification_type")
    @Enumerated(EnumType.STRING)
    private NotificationType type;

    public NotificationDto toDto(){
        return new NotificationDto(id,report.toDto(),isSeen,createdAt,updatedAt,userAddress,state,response,type);
    }
}
