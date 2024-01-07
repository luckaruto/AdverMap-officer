package com.adsmanagement.surfaces.dto;

import com.adsmanagement.spaces.dto.SpaceDto;
import com.adsmanagement.surfaces.models.SurfaceFormat;
import lombok.*;
import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SurfaceDto {
    private Short id;
    private SurfaceFormat format;
    private Short width;
    private Short height;
    private List<String> imgUrl;
    private String content;
    private SpaceDto space;
}
