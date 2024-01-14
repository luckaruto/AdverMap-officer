package com.adsmanagement.spaces.dto;

import com.adsmanagement.spaces.models.SpaceFormat;
import com.adsmanagement.spaces.models.SpaceType;
import com.adsmanagement.wards.WardDTO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Schema(description = "DTO for representing space information")
public class SpaceDto {

    @Schema(description = "Identifier for the space", example = "1")
    private Short id;

    @Schema(description = "The address of the space", example = "123 Main Street")
    private String address;

    @Schema(description = "The longitude coordinate of the space", example = "45.6789")
    private Float longitude;

    @Schema(description = "The latitude coordinate of the space", example = "-78.9012")
    private Float latitude;

    @Schema(description = "Type of the space", example = "OUTDOOR")
    private SpaceType type;

    @Schema(description = "Format of the space", example = "BILLBOARD")
    private SpaceFormat format;

    @Schema(description = "List of image URLs related to the space", example = "[\"https://example.com/image1.jpg\", \"https://example.com/image2.jpg\"]")
    private List<String> imgUrl;

    @Schema(description = "Flag indicating whether the space is planned", example = "true")
    private boolean isPlanned;

    @Schema(description = "Ward information associated with the space")
    private WardDTO ward;

    @Schema(description = "Total surface area of the space", example = "1000")
    private Long totalSurface;
}