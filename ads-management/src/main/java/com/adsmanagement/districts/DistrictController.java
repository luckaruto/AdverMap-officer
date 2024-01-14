package com.adsmanagement.districts;


import com.adsmanagement.cities.City;
import com.adsmanagement.cities.CityRepository;
import com.adsmanagement.cities.UpdateCityDto;
import com.adsmanagement.common.PaginationResult;
import com.adsmanagement.common.Response;
import com.adsmanagement.wards.Ward;
import com.adsmanagement.wards.WardRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/api/v1/districts")
@Tag(name = "Quản lý quận", description = "Dùng để Quản lý quận")

public class DistrictController {
    private final DistrictService districtService;
    private final DistrictRepository districtRepository;

    private final WardRepository wardRepository;

    private final CityRepository cityRepository;

    @Autowired
    public DistrictController(DistrictService districtService, DistrictRepository districtRepository, WardRepository wardRepository, CityRepository cityRepository) {
        this.districtService = districtService;
        this.districtRepository = districtRepository;
        this.wardRepository = wardRepository;
        this.cityRepository = cityRepository;
    }

    @Operation(summary = "Get paginated list of districts")
    @ApiResponse(responseCode = "200", description = "Paginated list of districts",
            content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = Response.class)))
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

    @Operation(summary = "Get all districts")
    @ApiResponse(responseCode = "200", description = "List of all districts",
            content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = Response.class)))
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

    @Operation(summary = "Create a new district")
    @ApiResponse(responseCode = "200", description = "District created successfully",
            content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = Response.class)))
    @ApiResponse(responseCode = "400", description = "District with the same name already exists or City not found",
            content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = Response.class)))
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

    @Operation(summary = "Update a district by ID")
    @ApiResponse(responseCode = "200", description = "District updated successfully",
            content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = Response.class)))
    @ApiResponse(responseCode = "400", description = "District with the same name already exists or District not found",
            content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = Response.class)))
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

    @Operation(summary = "Delete a district by ID")
    @ApiResponse(responseCode = "200", description = "District deleted successfully",
            content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = Response.class)))
    @ApiResponse(responseCode = "400", description = "District not found or Cannot delete district with dependent wards",
            content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = Response.class)))
    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Response<String>> delete(
            @PathVariable("id") Short id
    ) {
        var updatedDistrict = this.districtRepository.findById(id);
        if (updatedDistrict == null || updatedDistrict.isEmpty()){
            var res = new Response<String>("Quận không tồn tại",null,HttpStatus.BAD_REQUEST);
            return new ResponseEntity<>(res, HttpStatus.OK);
        }

        var ward = this.wardRepository.findAllByDistrict_Id(id);
        if (!ward.isEmpty()) {
            var res = new Response<String>("Không thể xoá quận vì có phường trực thuộc",null,HttpStatus.BAD_REQUEST);
            return new ResponseEntity<>(res, HttpStatus.OK);
        }

        this.districtRepository.deleteById(id);
        return new ResponseEntity<>(new Response<String>("","ok",HttpStatus.OK), HttpStatus.OK);
    }

}
