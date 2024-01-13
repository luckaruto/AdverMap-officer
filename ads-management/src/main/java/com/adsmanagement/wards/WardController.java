package com.adsmanagement.wards;


import com.adsmanagement.common.Response;
import com.adsmanagement.districts.CreateDistrictDto;
import com.adsmanagement.districts.District;
import com.adsmanagement.districts.DistrictRepository;
import com.adsmanagement.districts.UpdateDistrictDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/api/v1/wards")
public class WardController {
    private final WardService wardService;

    private final WardRepository wardRepository;
    private final DistrictRepository districtRepository;

    @Autowired
    public WardController(WardService wardService, WardRepository wardRepository, DistrictRepository districtRepository) {
        this.wardService = wardService;
        this.wardRepository = wardRepository;
        this.districtRepository = districtRepository;
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

    @GetMapping(path = "/all")
    public ResponseEntity<Response<List<Ward>>> listAll(
            @RequestParam(required = false) List<Short> districtIds
    ) {
        List<Ward> data = null;
        if (districtIds != null&& districtIds.size()> 0) {
            data = this.wardRepository.findAllByDistrict_IdIn(districtIds);
        } else {
            data = this.wardRepository.findAll();
        }
        var res = new Response<>("",data);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @PostMapping(path = "")
    public ResponseEntity<Response<Ward>> create(
            CreateWardDTO dto
    ) {
        var exists = this.wardRepository.findByName(dto.getName());
        if (exists != null && !exists.isEmpty()){
            var res = new Response<Ward>("Phường với tên này đã tồn tại",null,HttpStatus.BAD_REQUEST);
            return new ResponseEntity<>(res, HttpStatus.OK);
        }

        var district = this.districtRepository.findById(dto.getDistrict_id());
        if (district == null || district.isEmpty()){
            var res = new Response<Ward>("Quận không tồn tại",null,HttpStatus.BAD_REQUEST);
            return new ResponseEntity<>(res, HttpStatus.OK);
        }

        var data = this.wardRepository.save(new Ward((short) 0, dto.getName(), district.get()));
        var res = new Response<>("",data);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @PostMapping(path = "/{id}")
    public ResponseEntity<Response<Ward>> update(
            @PathVariable("id") Short id,
            UpdateWardDTO dto
    ) {
        var exists = this.wardRepository.findByName(dto.getName());
        if (exists != null && !exists.isEmpty()){
            var res = new Response<Ward>("Phường với tên này đã tồn tại",null,HttpStatus.BAD_REQUEST);
            return new ResponseEntity<>(res, HttpStatus.OK);
        }

        var updatedWard = this.wardRepository.findById(id);
        if (updatedWard == null || updatedWard.isEmpty()){
            var res = new Response<Ward>("Phường không tồn tại",null,HttpStatus.BAD_REQUEST);
            return new ResponseEntity<>(res, HttpStatus.OK);
        }

        var updated = updatedWard.get();
        updated.setName(dto.getName());

        var data = this.wardRepository.save(updated);
        var res = new Response<>("",data);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Response<String>> delete(
            @PathVariable("id") Short id
    ) {
        var updatedWard = this.wardRepository.findById(id);
        if (updatedWard == null || updatedWard.isEmpty()){
            var res = new Response<String>("Phường không tồn tại",null,HttpStatus.BAD_REQUEST);
            return new ResponseEntity<>(res, HttpStatus.OK);
        }

        this.wardRepository.deleteById(id);
        return new ResponseEntity<>(new Response<String>("","ok",HttpStatus.OK), HttpStatus.OK);
    }


}
