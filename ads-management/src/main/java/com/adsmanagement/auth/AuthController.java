package com.adsmanagement.auth;

import com.adsmanagement.config.EmailService;
import com.adsmanagement.jwt.JwtService;
import com.adsmanagement.common.Response;
import com.adsmanagement.users.UserRepository;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Description;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
    private final EmailService emailService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    public AuthController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/login")
    public ResponseEntity<Response<TokenDto>> authenticateAndGetToken(
            @RequestBody AuthRequest authRequest
    ) {
        //return jwtService.generateToken(authRequest.getUsername());
        var user = this.userRepository.findByEmailAndIsDeleted(authRequest.getUsername(), false);
        if (user.isEmpty()){
            return new ResponseEntity<>(new Response<>("invalid user request !",null), HttpStatus.BAD_REQUEST);
        }

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
        if (authentication.isAuthenticated()) {
            var token = jwtService.generateToken(user.get());
            var refreshToken = jwtService.generateRefreshToken(user.get());

            return new ResponseEntity<>(new Response<>("", new TokenDto(token,refreshToken)), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new Response<>("invalid user request !",null), HttpStatus.BAD_REQUEST);
        }


    }

    @PostMapping("/refresh")
    public ResponseEntity<Response<TokenDto>> refreshAndGetToken(@RequestHeader("Refresh-Token") String refreshToken) {
        var username = jwtService.extractUsername(refreshToken);


        var user = this.userRepository.findByEmailAndIsDeleted(username, false);
        if (user.isEmpty()){
            return new ResponseEntity<>(new Response<>("invalid user request !",null), HttpStatus.BAD_REQUEST);
        }

        if (jwtService.validateToken(refreshToken, username)){
            var token = jwtService.generateToken(user.get());
            var newRefreshToken = jwtService.generateRefreshToken(user.get());

            return new ResponseEntity<>(new Response<>("", new TokenDto(token,newRefreshToken)), HttpStatus.OK);
        }else {
            return new ResponseEntity<>(new Response<>("token invalid!",null), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<Response<String>> forgotPassword(
            @RequestBody ForgotPasswordDto dto
    ) {
        var user = this.userRepository.findByEmailAndIsDeleted(dto.getEmail(), false);
        if (user.isEmpty()){
            return new ResponseEntity<>(new Response<>("invalid user request !",null), HttpStatus.BAD_REQUEST);
        }

        this.emailService.sendForgotPasswordMail(user.get(),"11111");
        return new ResponseEntity<>(new Response<>("","ok"), HttpStatus.OK);
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<Response<TokenDto>> forgotPassword(
            @RequestBody OtpDto dto
    ) {
        var otp = dto.getOtp();

        if (!otp.equals("11111")){
            return new ResponseEntity<>(new Response<>("OTP không hợp lệ",null), HttpStatus.BAD_REQUEST);
        }


        var usero = this.userRepository.findByEmailAndIsDeleted(dto.getEmail(), false);
        if (usero.isEmpty()){
            return new ResponseEntity<>(new Response<>("invalid user request !",null), HttpStatus.BAD_REQUEST);
        }

        var user = usero.get();

        user.setPassword(dto.getPassword());
        var bcryptEncoder  = new BCryptPasswordEncoder();
        var bcryptPassword = bcryptEncoder.encode(user.getPassword());
        user.setPassword(bcryptPassword);


        this.userRepository.save(user);

        var token = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        return new ResponseEntity<>(new Response<>("", new TokenDto(token,refreshToken)), HttpStatus.OK);

    }

}
