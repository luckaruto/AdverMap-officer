package com.adsmanagement.surfaces;

import com.adsmanagement.districts.District;
import com.adsmanagement.districts.DistrictRepository;
import com.adsmanagement.spaces.*;
import com.adsmanagement.spaces.models.Space;
import com.adsmanagement.surfaces.dto.CreateSurfaceDto;
import com.adsmanagement.surfaces.dto.CreateSurfaceRequestDto;
import com.adsmanagement.surfaces.models.Surface;
import com.adsmanagement.surfaces.models.SurfaceRequest;
import com.adsmanagement.users.models.User;
import com.adsmanagement.wards.Ward;
import com.adsmanagement.wards.WardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SurfaceService {
    private final SurfaceRepository surfaceRepository;

    private final  SurfaceRequestRepository surfaceRequestRepository;
    private final SpaceRepository spaceRepository;

    private final DistrictRepository districtRepository;

    private final WardRepository wardRepository;

    @Autowired
    public SurfaceService(
            SurfaceRepository surfaceRepository,
            DistrictRepository districtRepository,
            WardRepository wardRepository,
            SpaceRepository spaceRepository,
            SurfaceRequestRepository surfaceRequestRepository
    ) {
        this.surfaceRepository = surfaceRepository;
        this.districtRepository = districtRepository;
        this.wardRepository = wardRepository;
        this.spaceRepository = spaceRepository;
        this.surfaceRequestRepository = surfaceRequestRepository;
    }

    public Page<Surface> findAll(Short page, Short size, Short cityId, List<Short> wardIds, List<Short> districtIds, List<Short> spaceIds) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());

        if (wardIds == null || wardIds.isEmpty()) {
            // filter by cityId
            if (districtIds == null || districtIds.isEmpty()) {
                if (cityId != null) {
                    Page<District> districtRes = this.districtRepository.findAllByCity_Id(cityId,pageable);
                    List<District> districts  = districtRes.getContent();

                    if (districts == null || districts.size() == 0) {
                        return  new PageImpl<>(new ArrayList<>(),pageable,0);
                    }

                    if (districts != null && !districts.isEmpty()) {
                        districtIds = new ArrayList<>();
                        for (int i = 0; i < districts.size(); i++ ){
                            districtIds.add(districts.get(i).getId());
                        }
                    }
                }
            }

            // filter by districtId
            if (districtIds != null && !districtIds.isEmpty()) {
                Page<Ward> res = this.wardRepository.findAllByDistrict_IdIn(districtIds,pageable);

                List<Ward> wards  = res.getContent();
                if (wards != null && !wards.isEmpty()) {
                    wardIds = new ArrayList<>();
                    for (int i = 0; i < wards.size(); i++ ){
                        wardIds.add(wards.get(i).getId());
                    }
                }
            }
        }


        List<Short> spaceIdArr = new ArrayList<>();
        if (wardIds != null && !wardIds.isEmpty()) {
            List<Space> spaces = null;
            if (spaceIds != null && spaceIds.size() > 0) {
                spaces = this.spaceRepository.findAllByWardIdInAndIdIn(wardIds, spaceIds);
            } else{
                spaces = this.spaceRepository.findAllByWardIdIn(wardIds);
            }

            if (spaces != null && spaces.size() > 0 ) {
                for (var i = 0; i < spaces.size(); i++){
                    spaceIdArr.add(spaces.get(i).getId());
                }
            }
        } else {
            spaceIdArr =spaceIds;
        }


        Page<Surface> data;
        if (spaceIdArr != null && spaceIdArr.size() > 0 ) {
            data = this.surfaceRepository.findAllBySpaceIdIn(spaceIdArr,pageable);
        } else {
            data = this.surfaceRepository.findAll(pageable);
        }

        return data;
    }

    public Surface create(CreateSurfaceDto createSurfaceDto) {
        return this.surfaceRepository.save(createSurfaceDto.toSurface());
    }


    public SurfaceRequest createRequest(CreateSurfaceRequestDto createSurfaceRequestDto, User user){

        return this.surfaceRequestRepository.save(createSurfaceRequestDto.toSurfaceRequest());
    }

    public Page<SurfaceRequest> findAllRequest(Short page, Short size,Short cityId,List<Short> districtIds,List<Short> wardIds,List<Short> surfaceIds) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());

        if (wardIds == null || wardIds.isEmpty()) {
            // filter by cityId
            if (districtIds == null || districtIds.isEmpty()) {
                if (cityId != null) {
                    Page<District> districtRes = this.districtRepository.findAllByCity_Id(cityId,pageable);
                    List<District> districts  = districtRes.getContent();

                    if (districts == null || districts.size() == 0) {
                        return  new PageImpl<>(new ArrayList<>(),pageable,0);
                    }

                    if (districts != null && !districts.isEmpty()) {
                        districtIds = new ArrayList<>();
                        for (int i = 0; i < districts.size(); i++ ){
                            districtIds.add(districts.get(i).getId());
                        }
                    }
                }

            }

            // filter by districtId
            if (districtIds != null && !districtIds.isEmpty()) {
                Page<Ward> res = this.wardRepository.findAllByDistrict_IdIn(districtIds,pageable);

                List<Ward> wards  = res.getContent();
                if (wards != null && !wards.isEmpty()) {
                    wardIds = new ArrayList<>();
                    for (int i = 0; i < wards.size(); i++ ){
                        wardIds.add(wards.get(i).getId());
                    }
                }
            }
        }

        if (wardIds != null && surfaceIds != null && wardIds.size() > 0 && surfaceIds.size() > 0){
            return this.surfaceRequestRepository.findAllByWardIdsAndSurfaceIds(pageable, wardIds, surfaceIds);
        }

        if (wardIds != null && wardIds.size() >0) {
            return this.surfaceRequestRepository.findAllByWardIds(pageable, wardIds);
        }

        if (surfaceIds != null && surfaceIds.size() >0) {
            return this.surfaceRequestRepository.findAllBySurfaceIds(pageable, surfaceIds);
        }

        return  this.surfaceRequestRepository.findAll(pageable);

    }
}
