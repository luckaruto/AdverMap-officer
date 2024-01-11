package com.adsmanagement.surfaces.dto;

import com.adsmanagement.spaces.models.RequestState;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ProcessResponse {
    private RequestState state;
    private String response;
}
