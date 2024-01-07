package com.adsmanagement.users.dto;

import com.adsmanagement.users.models.User;
import com.adsmanagement.users.models.UserRole;
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
public class UpdateUserDTO {

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