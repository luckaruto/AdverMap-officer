package com.adsmanagement.districts;


import com.adsmanagement.common.PaginationResult;
import com.adsmanagement.common.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/api/v1/districts")
public class DistrictController {
    private final DistrictService districtService;

    @Autowired
    public DistrictController(DistrictService districtService) {
        this.districtService = districtService;
    }

    @GetMapping(path = "")
    public ResponseEntity<Response<Page<District>>> list(
            @RequestParam(defaultValue = "0") Short page ,
            @RequestParam(defaultValue = "20") Short size,
            @RequestParam(required = false) Short cityId
    ) {
        var data = this.districtService.findAll(page,size, cityId);
        var res = new Response<>("",data);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

}
