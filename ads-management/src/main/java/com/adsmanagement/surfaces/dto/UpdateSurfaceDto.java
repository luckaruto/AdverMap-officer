package com.adsmanagement.surfaces.dto;

import com.adsmanagement.spaces.dto.SpaceDto;
import com.adsmanagement.surfaces.models.SurfaceFormat;
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
@Schema(description = "DTO for updating surface information")
public class UpdateSurfaceDto {

    @Schema(description = "The new format of the surface", example = "BILLBOARD")
    private SurfaceFormat format;

    @Schema(description = "The new width of the surface", example = "200")
    private Short width;

    @Schema(description = "The new height of the surface", example = "100")
    private Short height;

    @Schema(description = "List of updated image URLs related to the surface", example = "[\"https://example.com/new-image1.jpg\", \"https://example.com/new-image2.jpg\"]")
    private List<String> imgUrl;

    @Schema(description = "The new content or description of the surface", example = "Updated digital billboard advertising")
    private String content;

    @Schema(description = "The new space information associated with the surface")
    private SpaceDto space;
}
