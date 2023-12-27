package com.adsmanagement.surfaces;


import com.adsmanagement.common.Response;
import com.adsmanagement.config.UserInfoUserDetails;
import com.adsmanagement.spaces.dto.CreateSpaceRequestDto;
import com.adsmanagement.spaces.dto.SpaceRequestDto;
import com.adsmanagement.surfaces.dto.CreateSurfaceDto;
import com.adsmanagement.surfaces.dto.CreateSurfaceRequestDto;
import com.adsmanagement.surfaces.dto.SurfaceDto;
import com.adsmanagement.surfaces.dto.SurfaceRequestDto;
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
@RequestMapping(path = "/api/v1/surfaces")
public class SurfaceController {
    private final SurfaceService surfaceService;

    @Autowired
    public SurfaceController(SurfaceService surfaceService) {
        this.surfaceService = surfaceService;
    }

    @GetMapping(path = "")
    public ResponseEntity<Response<Page<SurfaceDto>>> list(
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "20") Integer size,
            @RequestParam(required = false) Integer cityId,
            @RequestParam(required = false) List<Integer> wardIds,
            @RequestParam(required = false) List<Integer> districtIds,
            @RequestParam(required = false) List<Integer> spaceIds

            )   {
        var data = this.surfaceService.findAll(page,size,cityId,wardIds, districtIds,spaceIds);

        var contents = new ArrayList<SurfaceDto>();
        for (int i = 0; i < data.getContent().size(); i++){
            contents.add(data.getContent().get(i).toDto());
        }

        Page<SurfaceDto> dataRes = new PageImpl<>(contents,data.getPageable(),data.getTotalElements());
        var res = new Response<>("",dataRes);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @PostMapping(path = "")
    public ResponseEntity<Response<SurfaceDto>> create(
           @RequestBody CreateSurfaceDto createSurfaceDto
    )   {
        var data = this.surfaceService.create(createSurfaceDto);
        var res = new Response<>("",data.toDto());
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @PostMapping(path = "/{id}/request")
    public ResponseEntity<Response<SurfaceRequestDto>> createRequest(
            @PathVariable("id") int surfaceId,
            @RequestBody CreateSurfaceRequestDto createSurfaceRequestDto,
            @AuthenticationPrincipal UserInfoUserDetails userDetails
    )   {
        var user = userDetails.getUser();
        createSurfaceRequestDto.setUserId(user.getId());
        createSurfaceRequestDto.setSurfaceId(surfaceId);

        var data = this.surfaceService.createRequest(createSurfaceRequestDto, user);
        var res = new Response<>("",data.toDto());
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping(path = "/request")
    public ResponseEntity<Response<Page<SurfaceRequestDto>>> listRequest(
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "20") Integer size,
            @RequestParam(required = false) Integer cityId,
            @RequestParam(required = false) List<Integer> wardIds,
            @RequestParam(required = false) List<Integer> districtIds,
            @RequestParam(required = false) List<Integer> surfaceIds,
            @AuthenticationPrincipal UserInfoUserDetails userDetails
    )   {
        var user = userDetails.getUser();
        var data = this.surfaceService.findAllRequest(page, size,cityId, districtIds, wardIds, surfaceIds);

        var contents = new ArrayList<SurfaceRequestDto>();
        for (int i = 0; i < data.getContent().size(); i++){
            contents.add(data.getContent().get(i).toDto());
        }

        Page<SurfaceRequestDto> dataRes = new PageImpl<>(contents,data.getPageable(),data.getTotalElements());
        var res = new Response<>("",dataRes);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }
}
