package com.adsmanagement.surfaces.dto;

import com.adsmanagement.spaces.dto.SpaceDto;
import com.adsmanagement.spaces.models.RequestState;
import com.adsmanagement.surfaces.models.SurfaceFormat;
import com.adsmanagement.users.dto.UserDTO;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;

import java.util.Date;
import java.util.List;

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

    private SurfaceFormat format;
    private Short width;
    private Short height;
    private List<String> imgUrl;
}
