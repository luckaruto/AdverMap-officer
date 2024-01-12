package com.adsmanagement.districts;


import com.adsmanagement.cities.City;
import com.adsmanagement.cities.CityRepository;
import com.adsmanagement.cities.UpdateCityDto;
import com.adsmanagement.common.PaginationResult;
import com.adsmanagement.common.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/api/v1/districts")
public class DistrictController {
    private final DistrictService districtService;
    private final DistrictRepository districtRepository;

    private final CityRepository cityRepository;

    @Autowired
    public DistrictController(DistrictService districtService, DistrictRepository districtRepository, CityRepository cityRepository) {
        this.districtService = districtService;
        this.districtRepository = districtRepository;
        this.cityRepository = cityRepository;
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

    @GetMapping(path = "/all")
    public ResponseEntity<Response<List<District>>> listAll(
            @RequestParam(required = false) Short cityId
    ) {
        List<District> data = null;
        if (cityId != null) {
            data = this.districtRepository.findAllByCity_Id(cityId);
        } else {
            data = this.districtRepository.findAll();
        }
        var res = new Response<>("",data);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @PostMapping(path = "")
    public ResponseEntity<Response<District>> create(
            CreateDistrictDto dto
    ) {
        var exists = this.districtRepository.findByName(dto.getName());
        if (exists != null && !exists.isEmpty()){
            var res = new Response<District>("Quận với tên này đã tồn tại",null,HttpStatus.BAD_REQUEST);
            return new ResponseEntity<>(res, HttpStatus.OK);
        }

        var city = this.cityRepository.findById(dto.getCityId());
        if (city == null || city.isEmpty()){
            var res = new Response<District>("Thành phố không tồn tại",null,HttpStatus.BAD_REQUEST);
            return new ResponseEntity<>(res, HttpStatus.OK);
        }


        var data = this.districtRepository.save(new District((short) 0, dto.getName(), null, city.get()));
        var res = new Response<>("",data);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @PostMapping(path = "/{id}")
    public ResponseEntity<Response<District>> update(
            @PathVariable("id") Short id,
            UpdateDistrictDto dto
    ) {
        var exists = this.districtRepository.findByName(dto.getName());
        if (exists != null && !exists.isEmpty()){
            var res = new Response<District>("Quận với tên này đã tồn tại",null,HttpStatus.BAD_REQUEST);
            return new ResponseEntity<>(res, HttpStatus.OK);
        }

        var updatedDistrict = this.districtRepository.findById(id);
        if (updatedDistrict == null || updatedDistrict.isEmpty()){
            var res = new Response<District>("Quận không tồn tại",null,HttpStatus.BAD_REQUEST);
            return new ResponseEntity<>(res, HttpStatus.OK);
        }

        var updated = updatedDistrict.get();
        updated.setName(dto.getName());

        var data = this.districtRepository.save(updated);
        var res = new Response<>("",data);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Response<String>> delete(
            @PathVariable("id") Short id
    ) {
        var updatedDistrict = this.districtRepository.findById(id);
        if (updatedDistrict == null || updatedDistrict.isEmpty()){
            var res = new Response<String>("Quận không tồn tại",null,HttpStatus.BAD_REQUEST);
            return new ResponseEntity<>(res, HttpStatus.OK);
        }

        this.districtRepository.deleteById(id);
        return new ResponseEntity<>(new Response<String>("","ok",HttpStatus.OK), HttpStatus.OK);
    }

}
