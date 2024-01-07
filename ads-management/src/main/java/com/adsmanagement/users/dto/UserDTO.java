package com.adsmanagement.users.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class UserDTO {
    private Short id;

    private String name;

    private String role;

    private String email;

    private String phone;

    private Date birthday;
}
