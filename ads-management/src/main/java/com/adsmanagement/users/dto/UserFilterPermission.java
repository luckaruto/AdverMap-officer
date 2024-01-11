package com.adsmanagement.users.dto;

import com.adsmanagement.cities.CityDto;
import com.adsmanagement.districts.District;
import com.adsmanagement.districts.DistrictDTO;
import com.adsmanagement.users.models.UserRole;
import com.adsmanagement.wards.Ward;
import com.adsmanagement.wards.WardDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserFilterPermission {
    private UserRole role;

    private List<CityDto> cities;

    private List<DistrictDTO> districts;

    private List<WardDTO> wards;

}
