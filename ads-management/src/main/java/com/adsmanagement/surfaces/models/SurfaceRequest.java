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

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

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


    @Column(name = "format")
    @Enumerated(EnumType.STRING)
    private SurfaceFormat format;

    @Column(name = "width")
    private Short width;

    @Column(name = "height")
    private Short height;

    @Column(name = "img_url")
    private String imgUrl;

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

        List<String> imgUrls = new ArrayList<>();
        if (this.imgUrl != null) {
            String[] split = this.imgUrl.split(", ");
            imgUrls = Arrays.stream(split).toList();
        }

        return new SurfaceRequestDto(id,reportDate,userDto,surfaceDto,spaceDto,content,approvedByDto,state,response,format, width,height, imgUrls);
    }
}
