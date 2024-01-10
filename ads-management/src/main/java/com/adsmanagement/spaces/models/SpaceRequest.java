package com.adsmanagement.spaces.models;

import com.adsmanagement.spaces.dto.SpaceDto;
import com.adsmanagement.spaces.dto.SpaceRequestDto;
import com.adsmanagement.users.models.User;
import com.adsmanagement.users.dto.UserDTO;
import com.adsmanagement.wards.Ward;
import com.adsmanagement.wards.WardDTO;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "space_request")
public class SpaceRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Short id;

    @Column(name = "address")
    private String address;

    @Column(name = "report_date")
    private Date reportDate;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    @Column(name = "longitude")
    private Float longitude;

    @Column(name = "latitude")
    private Float latitude;

    @ManyToOne
    @JoinColumn(name="space_id")
    private Space space;

    @ManyToOne
    @JoinColumn(name="ward_id")
    private Ward ward;

    @Column(name = "content")
    private String content;

    @Column(name = "type")
    @Enumerated(EnumType.STRING)
    private SpaceType type;

    @Column(name = "format")
    @Enumerated(EnumType.STRING)
    private SpaceFormat format;

    @ManyToOne
    @JoinColumn(name="approved_id")
    private User approvedBy;

    @Column(name = "state")
    @Enumerated(EnumType.STRING)
    private RequestState state;

    @Column(name = "response")
    private String response;

    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "updated_at")
    private Date updatedAt;

    public SpaceRequestDto toDto(){
        UserDTO userDto = null;
        if (user != null) {
            userDto = user.toDto();
        }

        UserDTO approvedByDto = null;
        if (approvedBy != null) {
            approvedByDto = approvedBy.toDto();
        }

        SpaceDto spaceDto = null;
        if (space != null){
            spaceDto = space.toDto();
        }

        WardDTO wardDto = null;
        if (ward != null){
            wardDto = ward.toDto();
        }

        return new SpaceRequestDto(id,address,reportDate,userDto,longitude,latitude,spaceDto,wardDto,content,type,format,approvedByDto,state,response);
    }
}
