package com.adsmanagement.districts;

import com.adsmanagement.wards.WardDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class DistrictDTO {
    private Short id;
    private String name;
    private List<WardDTO> wards;
    public DistrictDTO(Short id, String name) {
        this.id = id;
        this.name = name;
    }
}
