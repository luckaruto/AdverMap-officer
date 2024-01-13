package com.adsmanagement.reports.dto;

import com.adsmanagement.reports.models.Report;
import com.adsmanagement.reports.models.ReportState;
import com.adsmanagement.reports.models.ReportType;
import com.adsmanagement.spaces.models.Space;
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
import java.util.List;

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
    private List<String> imgUrl;
    private String userAddress;
    private String name;
    private Short space_id;
    private Short report_type_id;




    public Report toReport(){
        Surface surface = null;
        if (surface_id != null) {
            surface = new Surface(surface_id);
        }

        Ward ward = null;
        if (ward_id != null) {
            ward = new Ward(ward_id);
        }

        Space space = null;
        if (space_id != null) {
            space = new Space(space_id);
        }

        ReportType ty = null;
        if (report_type_id != null) {
            ty = new ReportType(report_type_id);
        }
        return new Report((short) 0, surface,address,ward,longitude,latitude,LocalDate.now(),content,email,phone,
                ReportState.IN_PROGRESS,imgUrl.toString(),null,null,
                new Date(), new Date(),userAddress,name, space, ty);
    }
}
