package com.adsmanagement.users.dto;

import com.adsmanagement.districts.DistrictDTO;
import com.adsmanagement.users.models.UserRole;
import com.adsmanagement.wards.Ward;
import com.adsmanagement.wards.WardDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class UserDTO {
    private Short id;

    private String name;

    private UserRole role;

    private String email;

    private String phone;

    private Date birthday;

    private List<WardDTO> managementWards;

    private List<DistrictDTO> managementDistricts;

}
