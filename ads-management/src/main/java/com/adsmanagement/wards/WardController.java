package com.adsmanagement.wards;


import com.adsmanagement.common.Response;
import com.adsmanagement.districts.District;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/api/v1/wards")
public class WardController {
    private final WardService wardService;

    @Autowired
    public WardController(WardService wardService) {
        this.wardService = wardService;
    }

    @GetMapping(path = "")
    public ResponseEntity<Response<Page<Ward>>> list(
            @RequestParam(defaultValue = "0") Short page ,
            @RequestParam(defaultValue = "20") Short size,
            @RequestParam(required = false) Short districtId
    ) {
        var data = this.wardService.findAllByDistrictId(districtId,page,size);
        var res = new Response<>("",data);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

}
