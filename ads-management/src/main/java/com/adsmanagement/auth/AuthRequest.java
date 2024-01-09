package com.adsmanagement.auth;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthRequest {

    @Schema(example = "admin@gmail.com", description = "Cán bộ sở: admin@gmail.com ,\n " +
            "Cán bộ quận: districtadmin@gmail.com ,\n Cán bộ phường: wardadmin@gmail.com")
    private String username ;

    @Schema(example = "password")
    private String password;
}