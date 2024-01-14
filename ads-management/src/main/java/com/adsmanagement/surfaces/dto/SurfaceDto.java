package com.adsmanagement.surfaces.dto;

import com.adsmanagement.spaces.dto.SpaceDto;
import com.adsmanagement.surfaces.models.SurfaceFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Schema(description = "DTO for representing surface information")
public class SurfaceDto {

    @Schema(description = "Identifier for the surface", example = "1")
    private Short id;

    @Schema(description = "Format of the surface", example = "BILLBOARD")
    private SurfaceFormat format;

    @Schema(description = "Width of the surface", example = "200")
    private Short width;

    @Schema(description = "Height of the surface", example = "100")
    private Short height;

    @Schema(description = "List of image URLs related to the surface", example = "[\"https://example.com/image1.jpg\", \"https://example.com/image2.jpg\"]")
    private List<String> imgUrl;

    @Schema(description = "Content or description of the surface", example = "Digital billboard advertising")
    private String content;

    @Schema(description = "Space information associated with the surface")
    private SpaceDto space;
}