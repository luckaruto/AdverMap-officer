package com.adsmanagement.spaces.dto;

import com.adsmanagement.spaces.models.SpaceFormat;
import com.adsmanagement.spaces.models.SpaceType;
import com.adsmanagement.wards.WardDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class SpaceDto {
    private Short id;
    private String address;
    private Float longitude;
    private Float latitude;
    private SpaceType type;
    private SpaceFormat format;
    private List<String> imgUrl;
    private boolean isPlanned;
    private WardDTO ward;
    private Long totalSurface;
}
