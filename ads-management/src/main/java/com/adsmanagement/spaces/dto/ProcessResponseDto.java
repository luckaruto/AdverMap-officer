package com.adsmanagement.spaces.dto;

import com.adsmanagement.spaces.models.RequestState;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class ProcessResponseDto {
    private RequestState state;
    private String response;
}
