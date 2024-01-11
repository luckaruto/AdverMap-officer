package com.adsmanagement.cities;


import com.adsmanagement.districts.DistrictDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CityDto {

    private Short id;

    private String name;

    private List<DistrictDTO> districts;

    public CityDto(Short id, String name) {
        this.id = id;
        this.name = name;
    }

}
