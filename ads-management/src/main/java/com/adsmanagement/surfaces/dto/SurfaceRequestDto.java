package com.adsmanagement.surfaces.dto;

import com.adsmanagement.spaces.dto.SpaceDto;
import com.adsmanagement.spaces.models.RequestState;
import com.adsmanagement.surfaces.models.SurfaceFormat;
import com.adsmanagement.users.dto.UserDTO;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;

import java.util.Date;
import java.util.List;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Schema(description = "DTO for representing surface request information")
public class SurfaceRequestDto {

    @Schema(description = "Identifier for the surface request", example = "1")
    private Short id;

    @Schema(description = "Date when the surface request was created", example = "2024-01-14")
    private Date reportDate;

    @Schema(description = "User information associated with the surface request")
    private UserDTO user;

    @Schema(description = "Surface information associated with the surface request")
    private SurfaceDto surface;

    @Schema(description = "Space information associated with the surface request")
    private SpaceDto space;

    @Schema(description = "Content or description of the surface request", example = "Request for surface advertising space")
    private String content;

    @Schema(description = "User who approved the surface request")
    private UserDTO approvedBy;

    @Schema(description = "State of the surface request", example = "IN_PROGRESS")
    private RequestState state;

    @Schema(description = "Response to the surface request", example = "Surface request in progress")
    private String response;

    @Schema(description = "Format of the surface request", example = "DIGITAL_SCREEN")
    private SurfaceFormat format;

    @Schema(description = "Width of the surface request", example = "300")
    private Short width;

    @Schema(description = "Height of the surface request", example = "150")
    private Short height;

    @Schema(description = "List of image URLs related to the surface request", example = "[\"https://example.com/image1.jpg\", \"https://example.com/image2.jpg\"]")
    private List<String> imgUrl;
}