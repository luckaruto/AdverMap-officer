package com.adsmanagement.surfaces.dto;

import com.adsmanagement.spaces.dto.SpaceDto;
import com.adsmanagement.surfaces.models.SurfaceFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UpdateSurfaceDto {
    private SurfaceFormat format;
    private Short width;
    private Short height;
    private List<String> imgUrl;
    private String content;
    private SpaceDto space;
}
