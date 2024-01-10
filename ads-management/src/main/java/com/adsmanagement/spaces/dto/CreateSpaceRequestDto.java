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
public class CreateSpaceRequestDto {
    private String address;
    private Float longitude;
    private Float latitude;
    private Short spaceId;
    private Short wardId;
    private String content;
    private SpaceType type;
    private SpaceFormat format;
    private boolean isPlanned;
    private List<String> imgUrl;
    public SpaceRequest ToSpaceRequest(User user){
        return new SpaceRequest((short) 0,address,new Date(),user,longitude,latitude,new Space(spaceId), new Ward(wardId),content,type,format,null, RequestState.IN_PROGRESS,null,null,null, isPlanned, imgUrl.toString());
    }
}
