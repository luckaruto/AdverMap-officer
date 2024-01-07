package com.adsmanagement.wards;

import com.adsmanagement.districts.DistrictDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class WardDTO {
    private Short id;
    private String name;
    private DistrictDTO district;

    WardDTO(Short id, String name){
        this.id = id;
        this.name = name;
    }
}
