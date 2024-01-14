package com.adsmanagement.surfaces.dto;

import com.adsmanagement.spaces.dto.SpaceDto;
import com.adsmanagement.spaces.models.RequestState;
import com.adsmanagement.spaces.models.Space;
import com.adsmanagement.surfaces.models.Surface;
import com.adsmanagement.surfaces.models.SurfaceFormat;
import com.adsmanagement.surfaces.models.SurfaceRequest;
import com.adsmanagement.users.models.User;
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
@Schema(description = "DTO for creating a surface request")
public class CreateSurfaceRequestDto {

    @Schema(description = "Identifier for the user creating the surface request", example = "1")
    private Short userId;

    @Schema(description = "Identifier for the surface associated with the request", example = "2")
    private Short surfaceId;

    @Schema(description = "Identifier for the space associated with the request", example = "3")
    private Short spaceId;

    @Schema(description = "Content or description of the surface request", example = "Request for surface advertising space")
    private String content;

    @Schema(description = "Format of the surface request", example = "DIGITAL_SCREEN")
    private SurfaceFormat format;

    @Schema(description = "Width of the surface request", example = "300")
    private Short width;

    @Schema(description = "Height of the surface request", example = "150")
    private Short height;

    @Schema(description = "List of image URLs related to the surface request", example = "[\"https://example.com/image1.jpg\", \"https://example.com/image2.jpg\"]")
    private List<String> imgUrl;

    public SurfaceRequest toSurfaceRequest() {
        return new SurfaceRequest((short) 0, new Date(), new User(userId), new Surface(surfaceId),
                new Space(spaceId), content, null, RequestState.IN_PROGRESS, null, null, null,
                format, width, height, imgUrl.toString());
    }
}
