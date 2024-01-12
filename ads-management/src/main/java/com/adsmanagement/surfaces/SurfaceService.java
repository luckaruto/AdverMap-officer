package com.adsmanagement.surfaces;

import com.adsmanagement.districts.District;
import com.adsmanagement.districts.DistrictRepository;
import com.adsmanagement.spaces.*;
import com.adsmanagement.spaces.dto.ProcessResponseDto;
import com.adsmanagement.spaces.models.RequestState;
import com.adsmanagement.spaces.models.Space;
import com.adsmanagement.spaces.models.SpaceRequest;
import com.adsmanagement.surfaceAllowance.SurfaceAllowanceRepository;
import com.adsmanagement.surfaceAllowance.models.SurfaceAllowance;
import com.adsmanagement.surfaces.dto.CreateSurfaceDto;
import com.adsmanagement.surfaces.dto.CreateSurfaceRequestDto;
import com.adsmanagement.surfaces.dto.ProcessResponse;
import com.adsmanagement.surfaces.dto.UpdateSurfaceDto;
import com.adsmanagement.surfaces.models.Surface;
import com.adsmanagement.surfaces.models.SurfaceRequest;
import com.adsmanagement.users.models.User;
import com.adsmanagement.wards.Ward;
import com.adsmanagement.wards.WardRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SurfaceService {
    private final SurfaceRepository surfaceRepository;

    private final  SurfaceRequestRepository surfaceRequestRepository;
    private final SurfaceAllowanceRepository surfaceAllowanceRepository;
    private final SpaceRepository spaceRepository;

    private final DistrictRepository districtRepository;

    private final WardRepository wardRepository;

    @Autowired
    public SurfaceService(
            SurfaceRepository surfaceRepository,
            DistrictRepository districtRepository,
            WardRepository wardRepository,
            SpaceRepository spaceRepository,
            SurfaceRequestRepository surfaceRequestRepository, SurfaceAllowanceRepository surfaceAllowanceRepository
    ) {
        this.surfaceRepository = surfaceRepository;
        this.districtRepository = districtRepository;
        this.wardRepository = wardRepository;
        this.spaceRepository = spaceRepository;
        this.surfaceRequestRepository = surfaceRequestRepository;
        this.surfaceAllowanceRepository = surfaceAllowanceRepository;
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

    @Transactional
    public SurfaceRequest processRequest(SurfaceRequest req, ProcessResponse processResponseDto, User user){

        req.setResponse(processResponseDto.getResponse());
        req.setApprovedBy( new User(user.getId()));
        req.setState(processResponseDto.getState());

        var res = this.surfaceRequestRepository.save(req);

        if (processResponseDto.getState() == RequestState.APPROVED) {
            var surface = req.getSurface();
            if (surface != null) {
                surface.setFieldByRequest(req);
                var sp = this.surfaceRepository.save(surface);
            }

            res.setSurface(surface);

        }


        return res;
    }

    public Page<SurfaceRequest> findAllRequest(Short page, Short size, Short cityId, List<Short> districtIds, List<Short> wardIds, List<Short> surfaceIds, RequestState state) {
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
            if (state != null) {
                return this.surfaceRequestRepository.findAllByWardIdsAndSurfaceIdsAndState(pageable, wardIds, surfaceIds,state);
            }
            return this.surfaceRequestRepository.findAllByWardIdsAndSurfaceIds(pageable, wardIds, surfaceIds);
        }

        if (wardIds != null && wardIds.size() >0) {
            if (state != null) {
                return this.surfaceRequestRepository.findAllByWardIdsAndState(pageable, wardIds,state);
            }
            return this.surfaceRequestRepository.findAllByWardIds(pageable, wardIds);
        }

        if (surfaceIds != null && surfaceIds.size() >0) {
            if (state != null) {
                return this.surfaceRequestRepository.findAllBySurfaceIdsAndState(pageable, surfaceIds,state);
            }
            return this.surfaceRequestRepository.findAllBySurfaceIds(pageable, surfaceIds);
        }

        if (state != null) {
            return this.surfaceRequestRepository.findAllByState(pageable,state);
        }

        return  this.surfaceRequestRepository.findAll(pageable);

    }

    public Optional<Surface> findById(Short id) {
        return this.surfaceRepository.findById(id);
    }

    public Surface update(Short id, UpdateSurfaceDto dto){

        var sur = this.surfaceRepository.findById(id);
        if (sur == null || sur.isEmpty()){
            return  null;
        }

        var surface = sur.get();
        surface.setFieldByUpdateDto(dto);
        var res = this.surfaceRepository.save(surface);
        return res;
    }

    @Transactional
    public void delete(Short id){

        var sur = this.surfaceRepository.findById(id);
        if (sur == null || sur.isEmpty()){
            return;
        }

        this.surfaceRequestRepository.deleteBySurfaceId(id);
        this.surfaceRepository.deleteById(id);
    }
}
