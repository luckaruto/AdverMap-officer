package com.adsmanagement.spaces.dto;

import com.adsmanagement.spaces.models.*;
import com.adsmanagement.users.models.User;
import com.adsmanagement.wards.Ward;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class UpdateSpaceDto {
    private String address;
    private Float longitude;
    private Float latitude;
    private Short spaceId;
    private Short wardId;
    private SpaceType type;
    private SpaceFormat format;
    private boolean isPlanned;
    private List<String> imgUrl;
}
