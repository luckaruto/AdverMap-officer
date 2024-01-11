package com.adsmanagement.users;


import com.adsmanagement.common.Response;
import com.adsmanagement.config.UserInfoUserDetails;
import com.adsmanagement.surfaces.dto.SurfaceDto;
import com.adsmanagement.users.dto.CreateUserDTO;
import com.adsmanagement.users.dto.UpdateUserDTO;
import com.adsmanagement.users.dto.UserDTO;
import com.adsmanagement.users.dto.UserFilterPermission;
import com.adsmanagement.users.models.User;
import com.adsmanagement.users.models.UserPermission;
import com.adsmanagement.users.models.UserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/api/v1/users")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(path = "")
    public ResponseEntity<Response<Page<UserDTO>>> list(
            @RequestParam(defaultValue = "0") Short page,
            @RequestParam(defaultValue = "20") Short size
    ) {
        var data = this.userService.findAll(page,size);
        var contents = new ArrayList<UserDTO>();
        for (int i = 0; i < data.getContent().size(); i++){
            contents.add(data.getContent().get(i).toDto());
        }

        Page<UserDTO> dataRes = new PageImpl<>(contents,data.getPageable(),data.getTotalElements());
        var res = new Response<>("",dataRes);

        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @PostMapping(path = "")
    public ResponseEntity<Response<UserDTO>> create(@RequestBody() CreateUserDTO createUserDTO) {
        User data = null;
        try {
            data = this.userService.save(createUserDTO);
        } catch (Exception e) {
                throw new RuntimeException(e);
        }

        var res = new Response<>("",data.toDto());
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @PostMapping(path = "/{id}")
    public ResponseEntity<Response<UserDTO>> update(
            @RequestBody() UpdateUserDTO updateUserDTO,
            @PathVariable("id") Short id
    ) {
        User data = null;
        try {
            data = this.userService.update(id,updateUserDTO);
        } catch (Exception e) {

            throw new RuntimeException(e);
        }

        var res = new Response<>("",data.toDto());
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Response<String>> delete(
            @PathVariable("id") Short id
    ) {
        var user = this.userService.findById(id);
        if (user == null) {
            return new ResponseEntity<>(new Response<>("USER_NOT_EXIST","", HttpStatus.BAD_REQUEST), HttpStatus.OK);
        }

        var data = this.userService.delete(id);
        var res = new Response<>("","ok");
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping(path = "/{id}/permission")
    public ResponseEntity<Response<UserFilterPermission>> getFilterPermission(
            @PathVariable("id") Short id,
            @RequestParam(required = false) List<Short> cityIds,
            @RequestParam(required = false) List<Short> wardIds,
            @RequestParam(required = false) List<Short> districtIds,
            @AuthenticationPrincipal UserInfoUserDetails userDetails
    ) {
        var currentUser = userDetails.getUser();
        var user = this.userService.findById(id);
        if (user == null) {
            return new ResponseEntity<>(new Response<UserFilterPermission>("Tài khoản không tồn tại",null, HttpStatus.BAD_REQUEST), HttpStatus.OK);
        }

        if (currentUser.getRole() != UserRole.ADMIN && currentUser.getId() != user.getId()) {
            return new ResponseEntity<>(new Response<UserFilterPermission>("Bạn không có quyền truy cập",null, HttpStatus.FORBIDDEN), HttpStatus.OK);
        }

        var data = this.userService.getFilterPermission(id);

        var res = new Response<>("",data);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

}
