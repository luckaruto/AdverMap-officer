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
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "Quản lý báo cáo", description = "Dùng để Quản lý báo cáo")
public class ReportController {
    private final ReportService reportService;
    private final ReportTypeRepository reportTypeRepository;

    @Autowired
    public ReportController(ReportService reportService, ReportTypeRepository reportTypeRepository) {
        this.reportService = reportService;
        this.reportTypeRepository = reportTypeRepository;
    }

    @Operation(summary = "Get paginated list of reports")
    @ApiResponse(responseCode = "200", description = "Paginated list of reports",
            content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = Response.class)))
    @GetMapping(path = "")
    public ResponseEntity<Response<Page<ReportDto>>> list(
            @Parameter(description = "Page number (default: 0)")
            @RequestParam(defaultValue = "0") Short page,

            @Parameter(description = "Number of items per page (default: 20)")
            @RequestParam(defaultValue = "20") Short size,

            @Parameter(description = "Filter by city ID (optional)")
            @RequestParam(required = false) Short cityId,

            @Parameter(description = "Filter by ward IDs (optional)")
            @RequestParam(required = false) List<Short> wardIds,

            @Parameter(description = "Filter by district IDs (optional)")
            @RequestParam(required = false) List<Short> districtIds,

            @Parameter(description = "Filter by surface IDs (optional)")
            @RequestParam(required = false) List<Short> surfaceIds,

            @Parameter(description = "Filter by report state (optional)")
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

    @Operation(summary = "Create a new report")
    @ApiResponse(responseCode = "200", description = "Report created successfully",
            content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = Response.class)))
    @PostMapping(path = "")
    public ResponseEntity<Response<ReportDto>> create(
            @RequestBody CreateReportDto createReportDto
    )   {
        var data = this.reportService.create(createReportDto);
        var res = new Response<>("",data.toDto());
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @Operation(summary = "Process a report")
    @ApiResponse(responseCode = "200", description = "Report processed successfully",
            content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = Response.class)))
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

    @Operation(summary = "Get details of a report by ID")
    @ApiResponse(responseCode = "200", description = "Details of the report",
            content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = Response.class)))
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

    @Operation(summary = "Get paginated list of reports by surface ID")
    @ApiResponse(responseCode = "200", description = "Paginated list of reports by surface ID",
            content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = Response.class)))
    @GetMapping(path = "/surfaces/{id}")
    public ResponseEntity<Response<Page<ReportDto>>>  findBySurfaceId(
            @Parameter(description = "Page number (default: 0)")
            @RequestParam(defaultValue = "0") Short page,

            @Parameter(description = "Number of items per page (default: 20)")
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

    @Operation(summary = "Get paginated list of report types")
    @ApiResponse(responseCode = "200", description = "Paginated list of report types",
            content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = Response.class)))
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

    @Operation(summary = "Get list of all report types")
    @ApiResponse(responseCode = "200", description = "List of all report types",
            content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = Response.class)))
    @GetMapping(path = "/type/all")
    public ResponseEntity<Response<List<ReportType>>>  getReportTypeAll(
    )   {
        var data = this.reportTypeRepository.findAll();
        var res = new Response<>("",data);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @Operation(summary = "Update a report type by ID")
    @ApiResponse(responseCode = "200", description = "Report type updated successfully",
            content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = Response.class)))
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

    @Operation(summary = "Create a new report type")
    @ApiResponse(responseCode = "200", description = "Report type created successfully",
            content = @Content(mediaType ="application/json",
                    schema = @Schema(implementation = Response.class)))
    @PostMapping(path = "/type")
    public ResponseEntity<Response<ReportType>>  createReportType(
            AlterReportType reportTypeDto
    )   {
        var resData = this.reportTypeRepository.save(new ReportType((short) 0,reportTypeDto.getName()));
        var res = new Response<>("",resData);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @Operation(summary = "Delete a report type by ID")
    @ApiResponse(responseCode = "200", description = "Report type deleted successfully",
            content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = Response.class)))
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
