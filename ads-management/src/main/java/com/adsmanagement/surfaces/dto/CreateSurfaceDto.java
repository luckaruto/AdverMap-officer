package com.adsmanagement.surfaces.dto;

import com.adsmanagement.spaces.models.Space;
import com.adsmanagement.surfaces.models.Surface;
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
@Schema(description = "DTO for creating a surface")
public class CreateSurfaceDto {

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

    @Schema(description = "Identifier for the space associated with the surface", example = "1")
    private Short spaceId;

    public Surface toSurface() {
        Space space = null;
        if (spaceId != null) {
            space = new Space(spaceId);
        }

        String imgUrls = String.join(", ", imgUrl);

        return new Surface((short) 0, format, width, height, imgUrls, content, space, null, null);
    }
}
