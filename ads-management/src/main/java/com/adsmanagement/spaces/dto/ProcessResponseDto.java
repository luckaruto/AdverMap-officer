package com.adsmanagement.spaces.dto;

import com.adsmanagement.spaces.models.RequestState;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Schema(description = "DTO for processing a response to a space request")
public class ProcessResponseDto {

    @Schema(description = "State of the space request", example = "APPROVED")
    private RequestState state;

    @Schema(description = "Response to the space request", example = "Space request approved successfully")
    private String response;
}
