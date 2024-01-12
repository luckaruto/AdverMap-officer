package com.adsmanagement.cities;


import com.adsmanagement.common.Response;
import com.adsmanagement.districts.DistrictRepository;
import com.adsmanagement.reports.dto.ReportDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/api/v1/cities")
public class CityController {
    private final CityService cityService;

    private final DistrictRepository districtRepository;

    @Autowired
    public CityController(CityService cityService, DistrictRepository districtRepository) {
        this.cityService = cityService;
        this.districtRepository = districtRepository;
    }

    @GetMapping(path = "/all")
    public ResponseEntity<Response<Iterable<City>>> list() {
        var data = this.cityService.findAll();
        var res = new Response<>("",data);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping(path = "")
    public ResponseEntity<Response<Page<City>>> list(
            @RequestParam(defaultValue = "0") Short page,
            @RequestParam(defaultValue = "20") Short size
    ) {
        var data = this.cityService.list(page,size);
        var res = new Response<>("",data);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @PostMapping(path = "")
    public ResponseEntity<Response<City>> create(
            UpdateCityDto dto
    ) {
        var exists = this.cityService.findByName(dto.getName());
        if (exists != null && !exists.isEmpty()){
            var res = new Response<City>("Thành phố với tên này đã tồn tại",null,HttpStatus.BAD_REQUEST);
            return new ResponseEntity<>(res, HttpStatus.OK);
        }

        var data = this.cityService.create(dto);
        var res = new Response<>("",data);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @PostMapping(path = "/{id}")
    public ResponseEntity<Response<City>> update(
            @PathVariable("id") Short id,
            UpdateCityDto dto
    ) {
        var exists = this.cityService.findByName(dto.getName());
        if (exists!= null && !exists.isEmpty()){
            var res = new Response<City>("Thành phố với tên này đã tồn tại",null,HttpStatus.BAD_REQUEST);
            return new ResponseEntity<>(res, HttpStatus.OK);
        }

        var updatedCity = this.cityService.findById(id);
        if (updatedCity == null || updatedCity.isEmpty()){
            var res = new Response<City>("Thành phố không tồn tại",null,HttpStatus.BAD_REQUEST);
            return new ResponseEntity<>(res, HttpStatus.OK);
        }

        var updated = updatedCity.get();
        updated.setName(dto.getName());

        var data = this.cityService.save(updated);
        var res = new Response<>("",data);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Response<String>> delete(
            @PathVariable("id") Short id
    ) {
        var updatedCity = this.cityService.findById(id);
        if (updatedCity == null || updatedCity.isEmpty()){
            var res = new Response<String>("Thành phố không tồn tại",null,HttpStatus.BAD_REQUEST);
            return new ResponseEntity<>(res, HttpStatus.OK);
        }

        var districts = this.districtRepository.countByCityId(id);
        if (districts != null && districts > 0) {
            var res = new Response<String>("Không thể xoá vì có quận trực thuộc",null,HttpStatus.BAD_REQUEST);
            return new ResponseEntity<>(res, HttpStatus.OK);
        }
        this.cityService.delete(id);

        return new ResponseEntity<>(new Response<String>("","ok",HttpStatus.OK), HttpStatus.OK);
    }



}
