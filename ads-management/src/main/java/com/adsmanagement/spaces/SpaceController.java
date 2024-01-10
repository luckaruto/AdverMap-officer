package com.adsmanagement.spaces;


import com.adsmanagement.common.Response;
import com.adsmanagement.config.UserInfoUserDetails;
import com.adsmanagement.spaces.dto.*;
import com.adsmanagement.surfaces.dto.SurfaceDto;
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
@RequestMapping(path = "/api/v1/spaces")
public class SpaceController {
    private final SpaceService spaceService;

    @Autowired
    public SpaceController(SpaceService spaceService) {
        this.spaceService = spaceService;
    }

    @GetMapping(path = "")
    public ResponseEntity<Response<Page<SpaceDto>>> list(
            @RequestParam(defaultValue = "0") Short page,
            @RequestParam(defaultValue = "20") Short size,
            @RequestParam(required = false) Short cityId,
            @RequestParam(required = false) List<Short> wardIds,
            @RequestParam(required = false) List<Short> districtIds
            )   {
        var data = this.spaceService.findAll(page,size,cityId,wardIds, districtIds);

        var contents = new ArrayList<SpaceDto>();
        for (int i = 0; i < data.getContent().size(); i++){
            contents.add(data.getContent().get(i).toDto());
        }

        Page<SpaceDto> dataRes = new PageImpl<>(contents,data.getPageable(),data.getTotalElements());
        var res = new Response<>("",dataRes);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @PostMapping(path = "")
    public ResponseEntity<Response<SpaceDto>> create(
           @RequestBody CreateSpaceDto createSpaceDto
    )   {
        var data = this.spaceService.create(createSpaceDto);
        var res = new Response<>("",data.toDto());
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @PostMapping(path = "/{id}/request")
    public ResponseEntity<Response<SpaceRequestDto>> createRequest(
            @PathVariable("id") Short spaceId,
            @RequestBody CreateSpaceRequestDto createSpaceRequestDto,
            @AuthenticationPrincipal UserInfoUserDetails userDetails
    )   {
        createSpaceRequestDto.setSpaceId(spaceId);
        var user = userDetails.getUser();
        var data = this.spaceService.createRequest(createSpaceRequestDto, user);
        var res = new Response<>("",data.toDto());
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping(path = "/request")
    public ResponseEntity<Response<Page<SpaceRequestDto>>> listRequest(
            @RequestParam(defaultValue = "0") Short page,
            @RequestParam(defaultValue = "20") Short size,
            @RequestParam(required = false) Short cityId,
            @RequestParam(required = false) List<Short> wardIds,
            @RequestParam(required = false) List<Short> districtIds,
            @AuthenticationPrincipal UserInfoUserDetails userDetails
    )   {
        var user = userDetails.getUser();
        var data = this.spaceService.findAllRequest(page, size, cityId, wardIds, districtIds);

        var contents = new ArrayList<SpaceRequestDto>();
        for (int i = 0; i < data.getContent().size(); i++){
            contents.add(data.getContent().get(i).toDto());
        }

        Page<SpaceRequestDto> dataRes = new PageImpl<>(contents,data.getPageable(),data.getTotalElements());
        var res = new Response<>("",dataRes);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Response<SpaceDto>> detail(
            @PathVariable("id") Short id
    )   {
        var data = this.spaceService.findById(id);

        if (data.isEmpty() || data.get() == null) {
            var res = new Response<SpaceDto>("Quảng cáo không tồn tại",null,HttpStatus.BAD_REQUEST);
            return new ResponseEntity<>(res, HttpStatus.OK);
        }

        var res = new Response<>("",data.get().toDto(),HttpStatus.OK);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

}
