package com.adsmanagement.surfaceAllowance;

import com.adsmanagement.districts.District;
import com.adsmanagement.districts.DistrictRepository;
import com.adsmanagement.spaces.SpaceRepository;
import com.adsmanagement.spaces.SpaceRequestRepository;
import com.adsmanagement.spaces.dto.CreateSpaceDto;
import com.adsmanagement.spaces.dto.CreateSpaceRequestDto;
import com.adsmanagement.spaces.dto.ProcessResponseDto;
import com.adsmanagement.spaces.models.RequestState;
import com.adsmanagement.spaces.models.Space;
import com.adsmanagement.spaces.models.SpaceRequest;
import com.adsmanagement.surfaceAllowance.dto.CreateSurfaceAllowanceDto;
import com.adsmanagement.surfaceAllowance.dto.ProcessResponse;
import com.adsmanagement.surfaceAllowance.models.SurfaceAllowance;
import com.adsmanagement.surfaces.SurfaceRepository;
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
public class SurfaceAllowanceService {
    private final SpaceRepository spaceRepository;
    private final SpaceRequestRepository spaceRequestRepository;

    private final DistrictRepository districtRepository;

    private final WardRepository wardRepository;

    private  final SurfaceRepository surfaceRepository;

    private final SurfaceAllowanceRepository surfaceAllowanceRepository;

    @Autowired
    public SurfaceAllowanceService(SpaceRepository spaceRepository,
                                   DistrictRepository districtRepository,
                                   WardRepository wardRepository,
                                   SpaceRequestRepository spaceRequestRepository,
                                   SurfaceAllowanceRepository surfaceAllowanceRepository,
                                   SurfaceRepository surfaceRepository
    ) {
        this.spaceRepository = spaceRepository;
        this.districtRepository = districtRepository;
        this.wardRepository = wardRepository;
        this.spaceRequestRepository = spaceRequestRepository;
        this.surfaceAllowanceRepository = surfaceAllowanceRepository;
        this.surfaceRepository = surfaceRepository;
    }

    public Page<SurfaceAllowance> findAll(Short page, Short size, Short cityId, List<Short> wardIds, List<Short> districtIds, Short spaceId) {
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

        Page<SurfaceAllowance> data;
        if (wardIds != null && !wardIds.isEmpty()) {
            if (spaceId != null) {
                data = this.surfaceAllowanceRepository.findAllByWardIdInAndSpaceId(wardIds,pageable, spaceId);
            } else {
                data = this.surfaceAllowanceRepository.findAllByWardIdIn(wardIds,pageable);
            }
        } else {
            if (spaceId != null) {
                data = this.surfaceAllowanceRepository.findAllBySpaceId(pageable, spaceId);
            } else {
                data = this.surfaceAllowanceRepository.findAll(pageable);
            }
        }

        return data;
    }

    public SurfaceAllowance create(CreateSurfaceAllowanceDto dto) {
        return this.surfaceAllowanceRepository.save(dto.toSurfaceAllowance());
    }

    public Optional<SurfaceAllowance> findById(Short id) {
        return this.surfaceAllowanceRepository.findById(id);
    }

    @Transactional
    public SurfaceAllowance process(SurfaceAllowance req, ProcessResponse processResponseDto, User user){

        req.setResponse(processResponseDto.getResponse());
        req.setApprovedBy( new User(user.getId()));
        req.setState(processResponseDto.getState());

        var res = this.surfaceAllowanceRepository.save(req);

        if (processResponseDto.getState() == RequestState.APPROVED) {
            var surface = req.toSurface();
            var newS = this.surfaceRepository.save(surface);
        }

        return res;
    }

}
