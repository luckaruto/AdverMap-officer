package com.adsmanagement.surfaceAllowance.dto;

import com.adsmanagement.spaces.models.RequestState;
import com.adsmanagement.spaces.models.Space;
import com.adsmanagement.surfaceAllowance.models.SurfaceAllowance;
import com.adsmanagement.surfaces.models.SurfaceFormat;
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
public class CreateSurfaceAllowanceDto {
    private Short spaceId;
    private Short wardId;
    private Short userId;
    private String content;
    private List<String> imgUrl;

    private String companyName;
    private String companyInfo;
    private String companyEmail;
    private String companyPhone;
    private String companyAddress;

    private Long startDate;
    private Long endDate;

    private SurfaceFormat format;
    private Short width;
    private Short height;

    public SurfaceAllowance toSurfaceAllowance() {
        return new SurfaceAllowance((short) 0, new Space(spaceId), new Ward(wardId), new User(userId),null, content,imgUrl.toString(), companyName,
                companyInfo, companyEmail, companyPhone, companyAddress, new Date(startDate),
                new Date(endDate),format,width,height,new Date(), RequestState.IN_PROGRESS, null);
    }
}
