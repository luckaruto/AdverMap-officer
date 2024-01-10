package com.adsmanagement.surfaces.dto;

import com.adsmanagement.spaces.dto.SpaceDto;
import com.adsmanagement.spaces.models.RequestState;
import com.adsmanagement.spaces.models.Space;
import com.adsmanagement.surfaces.models.Surface;
import com.adsmanagement.surfaces.models.SurfaceFormat;
import com.adsmanagement.surfaces.models.SurfaceRequest;
import com.adsmanagement.users.models.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CreateSurfaceRequestDto {
    private Short userId;
    private Short surfaceId;
    private Short spaceId;
    private String content;


    private SurfaceFormat format;
    private Short width;
    private Short height;
    private List<String> imgUrl;

    public SurfaceRequest toSurfaceRequest(){
        return new SurfaceRequest((short) 0,new Date(),new User(userId),new Surface(surfaceId),
                new Space(spaceId),content,null,RequestState.IN_PROGRESS,null,null,null,
                format,width,height,imgUrl.toString()
        );
    }
}
