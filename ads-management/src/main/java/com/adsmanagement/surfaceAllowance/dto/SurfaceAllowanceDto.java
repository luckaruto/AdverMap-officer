package com.adsmanagement.surfaceAllowance.dto;

import com.adsmanagement.spaces.dto.SpaceDto;
import com.adsmanagement.spaces.models.RequestState;
import com.adsmanagement.surfaces.models.SurfaceFormat;
import com.adsmanagement.users.dto.UserDTO;
import com.adsmanagement.wards.WardDTO;
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
public class SurfaceAllowanceDto {
    private Short id;
    private SpaceDto space;
    private WardDTO ward;
    private UserDTO user;
    private String content;
    private List<String> imgUrl;
    private String CompanyName;
    private String CompanyInfo;
    private String CompanyEmail;
    private String CompanyPhone;
    private String CompanyAddress;
    private Date StartDate;
    private Date EndDate;
    private SurfaceFormat format;
    private Short width;
    private Short height;
    private RequestState state;
    private String response;
}
