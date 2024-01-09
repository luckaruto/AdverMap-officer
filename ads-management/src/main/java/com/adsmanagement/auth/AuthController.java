package com.adsmanagement.auth;

import com.adsmanagement.jwt.JwtService;
import com.adsmanagement.common.Response;
import com.adsmanagement.users.UserRepository;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("api/v1/auth")
@Tag(name = "Xử lý đăng nhập", description = "Dùng để đặng nhập tài khoản lấy token, refresh token")
public class AuthController {
    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;
    @PostMapping("/login")
    public ResponseEntity<Response<String>> authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        //return jwtService.generateToken(authRequest.getUsername());
        var user = this.userRepository.findByEmail(authRequest.getUsername());
        if (user.isEmpty()){
            return new ResponseEntity<>(new Response<>("invalid user request !",null), HttpStatus.BAD_REQUEST);
        }

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
        if (authentication.isAuthenticated()) {
            var token = jwtService.generateToken(user.get());
            return new ResponseEntity<>(new Response<>("", token), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new Response<>("invalid user request !",null), HttpStatus.BAD_REQUEST);
        }


    }

}
