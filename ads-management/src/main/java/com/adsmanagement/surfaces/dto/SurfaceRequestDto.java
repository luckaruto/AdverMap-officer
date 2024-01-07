package com.adsmanagement.surfaces.dto;

import com.adsmanagement.spaces.dto.SpaceDto;
import com.adsmanagement.spaces.models.RequestState;
import com.adsmanagement.users.dto.UserDTO;
import lombok.*;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SurfaceRequestDto {
    private Short id;
    private Date reportDate;
    private UserDTO user;
    private SurfaceDto surface;
    private SpaceDto space;
    private String content;
    private UserDTO approvedBy;
    private RequestState state;
    private String response;
}
