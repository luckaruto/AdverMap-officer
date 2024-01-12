package com.adsmanagement.reports;


import com.adsmanagement.common.Response;
import com.adsmanagement.config.UserInfoUserDetails;
import com.adsmanagement.reports.dto.AlterReportType;
import com.adsmanagement.reports.dto.CreateReportDto;
import com.adsmanagement.reports.dto.ProcessReportDto;
import com.adsmanagement.reports.dto.ReportDto;
import com.adsmanagement.reports.models.ReportState;
import com.adsmanagement.reports.models.ReportType;
import com.adsmanagement.surfaces.SurfaceService;
import com.adsmanagement.surfaces.dto.CreateSurfaceDto;
import com.adsmanagement.surfaces.dto.CreateSurfaceRequestDto;
import com.adsmanagement.surfaces.dto.SurfaceDto;
import com.adsmanagement.surfaces.dto.SurfaceRequestDto;
import com.adsmanagement.wards.Ward;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/api/v1/reports")
public class ReportController {
    private final ReportService reportService;
    private final ReportTypeRepository reportTypeRepository;

    @Autowired
    public ReportController(ReportService reportService, ReportTypeRepository reportTypeRepository) {
        this.reportService = reportService;
        this.reportTypeRepository = reportTypeRepository;
    }

    @GetMapping(path = "")
    public ResponseEntity<Response<Page<ReportDto>>> list(
            @RequestParam(defaultValue = "0") Short page,
            @RequestParam(defaultValue = "20") Short size,
            @RequestParam(required = false) Short cityId,
            @RequestParam(required = false) List<Short> wardIds,
            @RequestParam(required = false) List<Short> districtIds,
            @RequestParam(required = false) List<Short> surfaceIds,
            @RequestParam(required = false) ReportState state
    )   {
        var data = this.reportService.findAll(page,size,cityId,wardIds,districtIds,surfaceIds,state);

        var contents = new ArrayList<ReportDto>();
        for (int i = 0; i < data.getContent().size(); i++){
            contents.add(data.getContent().get(i).toDto());
        }

        Page<ReportDto> dataRes = new PageImpl<>(contents,data.getPageable(),data.getTotalElements());
        var res = new Response<>("",dataRes);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @PostMapping(path = "")
    public ResponseEntity<Response<ReportDto>> create(
            @RequestBody CreateReportDto createReportDto
    )   {
        var data = this.reportService.create(createReportDto);
        var res = new Response<>("",data.toDto());
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @PostMapping(path = "/{id}/process")
    public ResponseEntity<Response<ReportDto>> process(
            @RequestBody ProcessReportDto processReportDto,
            @PathVariable("id") Short id,
            @AuthenticationPrincipal UserInfoUserDetails userDetails

    )   {
        var user = userDetails.getUser();

        var data = this.reportService.process(id,user,processReportDto);
        var res = new Response<>("",data.toDto());
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Response<ReportDto>> detail(
            @PathVariable("id") Short id
    )   {
        var data = this.reportService.findById(id);

        if (data.isEmpty() || data.get() == null) {
            var res = new Response<ReportDto>("Báo cáo không tồn tại",null,HttpStatus.BAD_REQUEST);
            return new ResponseEntity<>(res, HttpStatus.OK);
        }

        var res = new Response<ReportDto>("",data.get().toDto(),HttpStatus.OK);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping(path = "/surfaces/{id}")
    public ResponseEntity<Response<Page<ReportDto>>>  findBySurfaceId(
            @RequestParam(defaultValue = "0") Short page,
            @RequestParam(defaultValue = "20") Short size,
            @PathVariable("id") Short surfaceId
    )   {
        var data = this.reportService.findBySurfaceId(page,size,surfaceId);

        var contents = new ArrayList<ReportDto>();
        for (int i = 0; i < data.getContent().size(); i++){
            contents.add(data.getContent().get(i).toDto());
        }

        Page<ReportDto> dataRes = new PageImpl<>(contents,data.getPageable(),data.getTotalElements());
        var res = new Response<>("",dataRes);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping(path = "/type")
    public ResponseEntity<Response<Page<ReportType>>>  getReportType(
            @RequestParam(defaultValue = "0") Short page,
            @RequestParam(defaultValue = "20") Short size
    )   {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());

        var data = this.reportTypeRepository.findAll(pageable);
        var res = new Response<>("",data);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping(path = "/type/all")
    public ResponseEntity<Response<List<ReportType>>>  getReportTypeAll(
    )   {
        var data = this.reportTypeRepository.findAll();
        var res = new Response<>("",data);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @PostMapping(path = "/type/{id}")
    public ResponseEntity<Response<ReportType>>  updateReportType(
            @PathVariable("id") Short id,
            AlterReportType reportTypeDto
    )   {
        var data = this.reportTypeRepository.findById(id);
        if (data == null || data.isEmpty()){
            var res = new Response<ReportType>("Hình thức tố cáo không tồn tại",null,HttpStatus.BAD_REQUEST);
            return new ResponseEntity<>(res, HttpStatus.OK);
        }

        var d = data.get();
        d.setName(reportTypeDto.getName());
        var resData = this.reportTypeRepository.save(d);
        var res = new Response<>("",resData);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @PostMapping(path = "/type")
    public ResponseEntity<Response<ReportType>>  createReportType(
            AlterReportType reportTypeDto
    )   {
        var resData = this.reportTypeRepository.save(new ReportType((short) 0,reportTypeDto.getName()));
        var res = new Response<>("",resData);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @DeleteMapping(path = "/type/{id}")
    public ResponseEntity<Response<String>>  deleteReportType(
            @PathVariable("id") Short id
    )   {
        var data = this.reportTypeRepository.findById(id);
        if (data == null || data.isEmpty()){
            var res = new Response<String>("Hình thức tố cáo không tồn tại",null,HttpStatus.BAD_REQUEST);
            return new ResponseEntity<>(res, HttpStatus.OK);
        }

        var exists = this.reportService.countByReportType(id);
        if (exists != null && exists > 0) {
            var res = new Response<String>("Không thể xoá vì đã có báo cáo bằng hình thức này",null,HttpStatus.BAD_REQUEST);
            return new ResponseEntity<>(res, HttpStatus.OK);
        }


        this.reportTypeRepository.deleteById(id);
        var res = new Response<>("","ok");
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

}
