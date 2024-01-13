package com.adsmanagement.auth;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class TokenDto {
    private String token;
    private String refreshToken;

    public TokenDto(String token, String refreshToken) {
        this.refreshToken = refreshToken;
        this.token = token;
    }
}
