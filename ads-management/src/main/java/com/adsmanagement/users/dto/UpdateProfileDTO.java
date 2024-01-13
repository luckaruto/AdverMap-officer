package com.adsmanagement.users.dto;

import com.adsmanagement.users.models.UserRole;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class UpdateProfileDTO {

    private String name;

    private String email;

    private String phone;

    private Date birthday;

}
