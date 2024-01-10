package com.adsmanagement.reports.dto;

import com.adsmanagement.reports.models.ReportState;
import com.adsmanagement.surfaces.dto.SurfaceDto;
import com.adsmanagement.users.dto.UserDTO;
import com.adsmanagement.wards.WardDTO;
import lombok.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ReportDto {
    private Short id;
    private SurfaceDto surface;
    private String address;
    private WardDTO ward;
    private Float longitude;
    private Float latitude;
    private LocalDate reportDate;
    private String content;
    private String email;
    private String phone;
    private ReportState state;
    private List<String> imgUrl;
    private UserDTO approvedBy;
    private String response;
    private String userAddress;
    private String name;

}
