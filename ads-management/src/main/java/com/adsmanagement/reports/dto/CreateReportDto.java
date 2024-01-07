package com.adsmanagement.reports.dto;

import com.adsmanagement.reports.models.Report;
import com.adsmanagement.reports.models.ReportState;
import com.adsmanagement.surfaces.dto.SurfaceDto;
import com.adsmanagement.surfaces.models.Surface;
import com.adsmanagement.users.dto.UserDTO;
import com.adsmanagement.wards.Ward;
import com.adsmanagement.wards.WardDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CreateReportDto {
    private Short surface_id;
    private String address;
    private Short ward_id;
    private Float longitude;
    private Float latitude;
    private String content;
    private String email;
    private String phone;
    private String imgUrl;
    private String userAddress;
    private String name;


    public Report toReport(){
        return new Report((short) 0, new Surface(surface_id),address,new Ward(ward_id),longitude,latitude,LocalDate.now(),content,email,phone,ReportState.IN_PROGRESS,imgUrl,null,null, new Date(), new Date(),userAddress,name);
    }
}
