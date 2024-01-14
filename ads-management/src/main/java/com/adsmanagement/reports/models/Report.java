package com.adsmanagement.reports.models;

import com.adsmanagement.reports.dto.ReportDto;
import com.adsmanagement.reports.dto.ReportTypeDto;
import com.adsmanagement.spaces.dto.SpaceDto;
import com.adsmanagement.spaces.models.Space;
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
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Entity
@ToString
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

    @Column(name = "img_url", columnDefinition = "text")
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

    @ManyToOne
    @JoinColumn(name="space_id")
    private Space space;

    @ManyToOne
    @JoinColumn(name="report_type_id")
    private ReportType reportType;

    public Report(Short id) {
        this.id  =id;
    }

    public ReportDto toDto(){
        SurfaceDto surfaceDto = null;
        if (surface != null){
            surfaceDto = surface.toDto();
        }

        SpaceDto spaceDto = null;
        if (space != null){
            spaceDto = space.toDto();
        }

        WardDTO wardDto = null;
        if (ward != null){
            wardDto = ward.toDto();
        }

        UserDTO approvedByDto = null;
        if (approvedBy != null){
            approvedByDto = approvedBy.toDto();
        }

        List<String> imgUrls = new ArrayList<>();
        if (this.imgUrl != null) {
            String[] split = this.imgUrl.split(", ");
            imgUrls = Arrays.stream(split).toList();
        }

        ReportTypeDto ty = null;
        if (this.reportType != null){
            ty = this.reportType.toDto();
        }
        
        return new ReportDto(id,surfaceDto,address,wardDto,longitude,latitude,reportDate,content,
                email,phone,state,imgUrls,approvedByDto,response, userAddress, name,spaceDto,ty );
    }
}
