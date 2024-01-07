package com.adsmanagement.spaces.dto;

import com.adsmanagement.spaces.models.RequestState;
import com.adsmanagement.spaces.models.SpaceFormat;
import com.adsmanagement.spaces.models.SpaceType;
import com.adsmanagement.users.dto.UserDTO;
import com.adsmanagement.wards.WardDTO;
import lombok.*;

import java.util.Date;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SpaceRequestDto {
    private Short id;
    private String address;
    private Date reportDate;
    private UserDTO user;
    private Float longitude;
    private Float latitude;
    private SpaceDto space;
    private WardDTO ward;
    private String content;
    private SpaceType type;
    private SpaceFormat format;
    private UserDTO approvedBy;
    private RequestState state;
    private String response;
}
