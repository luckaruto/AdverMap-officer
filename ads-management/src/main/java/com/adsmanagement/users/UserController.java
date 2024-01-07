package com.adsmanagement.users;


import com.adsmanagement.common.Response;
import com.adsmanagement.surfaces.dto.SurfaceDto;
import com.adsmanagement.users.dto.CreateUserDTO;
import com.adsmanagement.users.dto.UpdateUserDTO;
import com.adsmanagement.users.dto.UserDTO;
import com.adsmanagement.users.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

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
            contents.add(data.getContent().get(i).toDTO());
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

        var res = new Response<>("",data.toDTO());
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

        var res = new Response<>("",data.toDTO());
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
}
