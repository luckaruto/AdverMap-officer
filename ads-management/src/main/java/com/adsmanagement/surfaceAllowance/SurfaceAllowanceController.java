package com.adsmanagement.surfaceAllowance;


import com.adsmanagement.common.Response;
import com.adsmanagement.config.UserInfoUserDetails;
import com.adsmanagement.spaces.SpaceRepository;
import com.adsmanagement.spaces.dto.*;
import com.adsmanagement.spaces.models.RequestState;
import com.adsmanagement.surfaceAllowance.dto.CreateSurfaceAllowanceDto;
import com.adsmanagement.surfaceAllowance.dto.ProcessResponse;
import com.adsmanagement.surfaceAllowance.dto.SurfaceAllowanceDto;
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
@RequestMapping(path = "/api/v1/surface-allowance")
public class SurfaceAllowanceController {
    private final SurfaceAllowanceService surfaceAllowanceService;
    private final SpaceRepository spaceRepository;

    @Autowired
    public SurfaceAllowanceController(SurfaceAllowanceService surfaceAllowanceService, SpaceRepository spaceRepository) {
        this.surfaceAllowanceService = surfaceAllowanceService;
        this.spaceRepository = spaceRepository;
    }

    @GetMapping(path = "")
    public ResponseEntity<Response<Page<SurfaceAllowanceDto>>> list(
            @RequestParam(defaultValue = "0") Short page,
            @RequestParam(defaultValue = "20") Short size,
            @RequestParam(required = false) Short spaceId,
            @RequestParam(required = false) Short cityId,
            @RequestParam(required = false) List<Short> wardIds,
            @RequestParam(required = false) List<Short> districtIds
            )   {
        var data = this.surfaceAllowanceService.findAll(page,size,cityId,wardIds, districtIds,spaceId);

        var contents = new ArrayList<SurfaceAllowanceDto>();
        for (int i = 0; i < data.getContent().size(); i++){
            contents.add(data.getContent().get(i).toDto());
        }

        Page<SurfaceAllowanceDto> dataRes = new PageImpl<>(contents,data.getPageable(),data.getTotalElements());
        var res = new Response<>("",dataRes);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Response<SurfaceAllowanceDto>> detail(
            @PathVariable("id") Short id
    )   {
        var data = this.surfaceAllowanceService.findById(id);

        if (data.isEmpty() || data.get() == null) {
            var res = new Response<SurfaceAllowanceDto>("Không tồn tại",null,HttpStatus.BAD_REQUEST);
            return new ResponseEntity<>(res, HttpStatus.OK);
        }

        var res = new Response<>("",data.get().toDto(),HttpStatus.OK);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @PostMapping(path = "")
    public ResponseEntity<Response<SurfaceAllowanceDto>> createSurfaceAllowance(
            @RequestBody CreateSurfaceAllowanceDto createSurfaceAllowanceDto,
            @AuthenticationPrincipal UserInfoUserDetails userDetails
    )   {
        var spaceId =  createSurfaceAllowanceDto.getSpaceId();

        var spaceO = this.spaceRepository.findById(spaceId);
        if (spaceO== null || spaceO.isEmpty()) {
            var res = new Response<SurfaceAllowanceDto>("Điểm đặt quảng cáo không tồn tại",null,HttpStatus.BAD_REQUEST);
            return new ResponseEntity<>(res, HttpStatus.OK);
        }

        if (spaceO.get().getWard() != null){
            createSurfaceAllowanceDto.setWardId(spaceO.get().getWard().getId());
        }

        var user = userDetails.getUser();
        createSurfaceAllowanceDto.setUserId(user.getId());
        var data = this.surfaceAllowanceService.create(createSurfaceAllowanceDto);
        var res = new Response<>("",data.toDto());
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @PostMapping(path = "/{id}/process")
    public ResponseEntity<Response<SurfaceAllowanceDto>> process(
            @PathVariable("id") Short id,
            @RequestBody ProcessResponse processResponse,
            @AuthenticationPrincipal UserInfoUserDetails userDetails
    )   {
        var reqO = this.surfaceAllowanceService.findById(id);
        if (reqO == null || reqO.isEmpty()) {
            var res = new Response<SurfaceAllowanceDto>("Yêu cầu cấp phép không tồn tại",null,HttpStatus.BAD_REQUEST);
            return new ResponseEntity<>(res, HttpStatus.OK);
        }

        if (reqO.get().getState() != null && reqO.get().getState() == RequestState.APPROVED) {
            var res = new Response<SurfaceAllowanceDto>("Yêu cầu cấp phép đã được duyệt",null,HttpStatus.BAD_REQUEST);
            return new ResponseEntity<>(res, HttpStatus.OK);
        }

        var user = userDetails.getUser();

        var data = this.surfaceAllowanceService.process(reqO.get(),processResponse, user);
        var res = new Response<>("",data.toDto());


        return new ResponseEntity<>(res, HttpStatus.OK);

    }

    @PostMapping(path = "/{id}/cancel")
    public ResponseEntity<Response<SurfaceAllowanceDto>> cancel(
            @PathVariable("id") Short id,
            @AuthenticationPrincipal UserInfoUserDetails userDetails
    )   {
        var req = this.surfaceAllowanceService.findById(id);
        if (req == null || req.isEmpty()) {
            var res = new Response<SurfaceAllowanceDto>("Yêu cầu cấp phép không tồn tại",null,HttpStatus.BAD_REQUEST);
            return new ResponseEntity<>(res, HttpStatus.OK);
        }

        if (req.get().getState() != RequestState.IN_PROGRESS) {
            var res = new Response<SurfaceAllowanceDto>("Không thể huỷ yêu cầu",null,HttpStatus.BAD_REQUEST);
            return new ResponseEntity<>(res, HttpStatus.OK);
        }

        var user = userDetails.getUser();
        var data = this.surfaceAllowanceService.process(req.get(),new ProcessResponse(RequestState.CANCELED, ""), user);
        var res = new Response<>("",data.toDto());

        return new ResponseEntity<>(res, HttpStatus.OK);
    }
}
