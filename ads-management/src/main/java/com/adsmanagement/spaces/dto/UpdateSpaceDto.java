package com.adsmanagement.spaces.dto;

import com.adsmanagement.spaces.models.*;
import com.adsmanagement.users.models.User;
import com.adsmanagement.wards.Ward;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Schema(description = "DTO for updating space information")
public class UpdateSpaceDto {

    @Schema(description = "The new address of the space", example = "456 Side Street")
    private String address;

    @Schema(description = "The new longitude coordinate of the space", example = "46.7890")
    private Float longitude;

    @Schema(description = "The new latitude coordinate of the space", example = "-79.0123")
    private Float latitude;

    @Schema(description = "Identifier for the space being updated", example = "1")
    private Short spaceId;

    @Schema(description = "Identifier for the new ward associated with the space", example = "2")
    private Short wardId;

    @Schema(description = "The new type of the space", example = "INDOOR")
    private SpaceType type;

    @Schema(description = "The new format of the space", example = "DIGITAL_SCREEN")
    private SpaceFormat format;

    @Schema(description = "Flag indicating whether the space is planned", example = "false")
    private boolean isPlanned;

    @Schema(description = "List of updated image URLs related to the space", example = "[\"https://example.com/new-image1.jpg\", \"https://example.com/new-image2.jpg\"]")
    private List<String> imgUrl;
}