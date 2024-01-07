package com.adsmanagement.reports.models;

import com.adsmanagement.reports.dto.ReportDto;
import com.adsmanagement.surfaces.dto.SurfaceDto;
import com.adsmanagement.surfaces.models.Surface;
import com.adsmanagement.users.models.User;
import com.adsmanagement.users.dto.UserDTO;
import com.adsmanagement.wards.Ward;
import com.adsmanagement.wards.WardDTO;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "report")
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Short id;

    @ManyToOne
    @JoinColumn(name="surface_id")
    private Surface surface;

    @Column(name = "address")
    private String address;

    @ManyToOne
    @JoinColumn(name="ward_id")
    private Ward ward;

    @Column(name = "longitude")
    private Float longitude;

    @Column(name = "latitude")
    private Float latitude;

    @Column
    @CreationTimestamp
    private LocalDate reportDate;

    @Column(name = "content")
    private String content;

    @Column(name = "email")
    private String email;

    @Column(name = "phone")
    private String phone;

    @Column(name = "state")
    @Enumerated(EnumType.STRING)
    private ReportState state;

    @Column(name = "img_url")
    private String imgUrl;

    @ManyToOne
    @JoinColumn(name="approved_id")
    private User approvedBy;


    @Column(name = "response")
    private String response;

    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "updated_at")
    private Date updatedAt;

    @Column
    private String userAddress;

    @Column
    private String name;

    public ReportDto toDto(){
        SurfaceDto surfaceDto = null;
        if (surface != null){
            surfaceDto = surface.toDto();
        }

        WardDTO wardDto = null;
        if (ward != null){
            wardDto = ward.toDto();
        }

        UserDTO approvedByDto = null;
        if (approvedBy != null){
            approvedByDto = approvedBy.toDTO();
        }

        return new ReportDto(id,surfaceDto,address,wardDto,longitude,latitude,reportDate,content,email,phone,state,imgUrl,approvedByDto,response, userAddress, name);
    }
}
