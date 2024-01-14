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
@Schema(description = "DTO for creating a space request")
public class CreateSpaceRequestDto {

    @Schema(description = "The address of the space request", example = "123 Main Street")
    private String address;

    @Schema(description = "The longitude coordinate of the space request", example = "45.6789")
    private Float longitude;

    @Schema(description = "The latitude coordinate of the space request", example = "-78.9012")
    private Float latitude;

    @Schema(description = "Identifier for the space associated with the request", example = "1")
    private Short spaceId;

    @Schema(description = "Identifier for the ward associated with the request", example = "2")
    private Short wardId;

    @Schema(description = "The content or description of the space request", example = "Request for advertising space")
    private String content;

    @Schema(description = "Type of the space request", example = "OUTDOOR")
    private SpaceType type;

    @Schema(description = "Format of the space request", example = "BILLBOARD")
    private SpaceFormat format;

    @Schema(description = "Flag indicating whether the space request is planned", example = "true")
    private boolean isPlanned;

    @Schema(description = "List of image URLs related to the space request", example = "[\"https://example.com/image1.jpg\", \"https://example.com/image2.jpg\"]")
    private List<String> imgUrl;

    public SpaceRequest ToSpaceRequest(User user) {
        return new SpaceRequest((short) 0, address, new Date(), user, longitude, latitude, new Space(spaceId), new Ward(wardId), content, type, format, null, RequestState.IN_PROGRESS, null, null, null, isPlanned, imgUrl.toString());
    }
}