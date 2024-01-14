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
import io.swagger.v3.oas.annotations.media.Schema;
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
    @Schema(example = "1", description = "Identifier for the surface associated with the report")
    private Short surface_id;

    @Schema(example = "123 Main Street", description = "The address where the report is located")
    private String address;

    @Schema(example = "2", description = "Identifier for the ward associated with the report")
    private Short ward_id;

    @Schema(example = "45.6789", description = "The longitude coordinate of the report location")
    private Float longitude;

    @Schema(example = "-78.9012", description = "The latitude coordinate of the report location")
    private Float latitude;

    @Schema(example = "Report about a damaged property", description = "The content or description of the report")
    private String content;

    @Schema(example = "user@example.com", description = "The email associated with the report")
    private String email;

    @Schema(example = "123-456-7890", description = "The phone number associated with the report")
    private String phone;

    @Schema(example = "[\"https://example.com/image1.jpg\", \"https://example.com/image2.jpg\"]", description = "List of image URLs related to the report")
    private List<String> imgUrl;

    @Schema(example = "456 Side Street", description = "The address of the user submitting the report")
    private String userAddress;

    @Schema(example = "John Doe", description = "The name associated with the report")
    private String name;

    @Schema(example = "3", description = "Identifier for the space associated with the report")
    private Short space_id;

    @Schema(example = "4", description = "Identifier for the type of report")
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
