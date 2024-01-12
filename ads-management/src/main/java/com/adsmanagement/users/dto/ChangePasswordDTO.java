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
public class ChangePasswordDTO {
    private String password;
}