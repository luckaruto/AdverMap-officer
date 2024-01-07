package com.adsmanagement.users.dto;

import com.adsmanagement.districts.District;
import com.adsmanagement.users.models.User;
import com.adsmanagement.users.models.UserRole;
import com.adsmanagement.wards.Ward;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.OneToMany;
import lombok.*;

import java.util.Date;
import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class CreateUserDTO {

    private String name;

    private UserRole role;

    private String email;

    private String phone;

    private Long birthday;

    private String password;

    private List<Short> managementWards;
    private List<Short> managementDistricts;

    public User ToUser() {
        return new User(null,name,role,email,phone,new Date(birthday),password,null, null,null,null,false);
    }
}