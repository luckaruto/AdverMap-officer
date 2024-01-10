package com.adsmanagement.surfaces.models;

import com.adsmanagement.spaces.dto.SpaceDto;
import com.adsmanagement.spaces.models.RequestState;
import com.adsmanagement.spaces.models.Space;
import com.adsmanagement.surfaces.dto.SurfaceDto;
import com.adsmanagement.surfaces.dto.SurfaceRequestDto;
import com.adsmanagement.users.models.User;
import com.adsmanagement.users.dto.UserDTO;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "surface_request")
public class SurfaceRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Short id;

    @Column(name = "report_date")
    private Date reportDate;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name="surface_id")
    @Enumerated(EnumType.STRING)
    private Surface surface;

    @ManyToOne
    @JoinColumn(name="des_space_id")
    private Space space;

    @Column(name = "content")
    private String content;

    @ManyToOne
    @JoinColumn(name="approved_id")
    private User approvedBy;

    @Column(name = "state")
    private RequestState state;

    @Column(name = "response")
    private String response;

    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "updated_at")
    private Date updatedAt;

    public SurfaceRequestDto toDto(){
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

        SurfaceDto surfaceDto = null;
        if (surface != null){
            surfaceDto = surface.toDto();
        }

        return new SurfaceRequestDto(id,reportDate,userDto,surfaceDto,spaceDto,content,approvedByDto,state,response);
    }
}
