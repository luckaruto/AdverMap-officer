package com.adsmanagement.spaces.dto;

import com.adsmanagement.spaces.models.RequestState;
import com.adsmanagement.spaces.models.SpaceFormat;
import com.adsmanagement.spaces.models.SpaceType;
import com.adsmanagement.users.dto.UserDTO;
import com.adsmanagement.wards.WardDTO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.util.Date;
import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Schema(description = "DTO for representing space request information")
public class SpaceRequestDto {

    @Schema(description = "Identifier for the space request", example = "1")
    private Short id;

    @Schema(description = "The address of the space request", example = "123 Main Street")
    private String address;

    @Schema(description = "Date when the space request was created", example = "2024-01-14")
    private Date reportDate;

    @Schema(description = "User information associated with the space request")
    private UserDTO user;

    @Schema(description = "The longitude coordinate of the space request", example = "45.6789")
    private Float longitude;

    @Schema(description = "The latitude coordinate of the space request", example = "-78.9012")
    private Float latitude;

    @Schema(description = "Space information associated with the space request")
    private SpaceDto space;

    @Schema(description = "Ward information associated with the space request")
    private WardDTO ward;

    @Schema(description = "The content or description of the space request", example = "Request for advertising space")
    private String content;

    @Schema(description = "Type of the space request", example = "OUTDOOR")
    private SpaceType type;

    @Schema(description = "Format of the space request", example = "BILLBOARD")
    private SpaceFormat format;

    @Schema(description = "User who approved the space request")
    private UserDTO approvedBy;

    @Schema(description = "State of the space request", example = "IN_PROGRESS")
    private RequestState state;

    @Schema(description = "Response to the space request", example = "Space request in progress")
    private String response;

    @Schema(description = "Flag indicating whether the space request is planned", example = "true")
    private boolean isPlanned;

    @Schema(description = "List of image URLs related to the space request", example = "[\"https://example.com/image1.jpg\", \"https://example.com/image2.jpg\"]")
    private List<String> imgUrl;
}