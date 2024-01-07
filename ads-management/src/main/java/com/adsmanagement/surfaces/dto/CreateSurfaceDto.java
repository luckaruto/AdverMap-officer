package com.adsmanagement.surfaces.dto;

import com.adsmanagement.spaces.models.Space;
import com.adsmanagement.surfaces.models.Surface;
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
public class CreateSurfaceDto {
    private SurfaceFormat format;
    private Short width;
    private Short height;
    private List<String> imgUrl;
    private String content;
    private Short spaceId;
    public Surface toSurface(){

        Space space = null;
        if (spaceId != null) {
            space = new Space(spaceId);
        }

        String imgUrls = String.join(", ", imgUrl);


        return new Surface((short) 0,format,width, height,imgUrls,content,space,null,null);
    }
}
