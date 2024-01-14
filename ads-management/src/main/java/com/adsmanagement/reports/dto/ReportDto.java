package com.adsmanagement.reports.dto;

import com.adsmanagement.reports.models.ReportState;
import com.adsmanagement.spaces.dto.SpaceDto;
import com.adsmanagement.surfaces.dto.SurfaceDto;
import com.adsmanagement.users.dto.UserDTO;
import com.adsmanagement.wards.WardDTO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Schema(description = "DTO for representing a report")
public class ReportDto {
    @Schema(example = "1", description = "Identifier for the report")
    private Short id;

    @Schema(description = "Surface information associated with the report")
    private SurfaceDto surface;

    @Schema(example = "123 Main Street", description = "The address where the report is located")
    private String address;

    @Schema(description = "Ward information associated with the report")
    private WardDTO ward;

    @Schema(example = "45.6789", description = "The longitude coordinate of the report location")
    private Float longitude;

    @Schema(example = "-78.9012", description = "The latitude coordinate of the report location")
    private Float latitude;

    @Schema(example = "2024-01-14", description = "Date when the report was created")
    private LocalDate reportDate;

    @Schema(description = "The content or description of the report")
    private String content;

    @Schema(example = "user@example.com", description = "The email associated with the report")
    private String email;

    @Schema(example = "123-456-7890", description = "The phone number associated with the report")
    private String phone;

    @Schema(description = "State of the report")
    private ReportState state;

    @Schema(example = "[\"https://example.com/image1.jpg\", \"https://example.com/image2.jpg\"]", description = "List of image URLs related to the report")
    private List<String> imgUrl;

    @Schema(description = "User who approved the report")
    private UserDTO approvedBy;

    @Schema(description = "Response to the report")
    private String response;

    @Schema(description = "The address of the user submitting the report")
    private String userAddress;

    @Schema(description = "The name associated with the report")
    private String name;

    @Schema(description = "Space information associated with the report")
    private SpaceDto space;

    @Schema(description = "Type of report")
    private ReportTypeDto reportType;

}
