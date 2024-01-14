package com.adsmanagement.spaces;

import com.adsmanagement.districts.District;
import com.adsmanagement.districts.DistrictRepository;
import com.adsmanagement.notifications.Notification;
import com.adsmanagement.notifications.NotificationRepository;
import com.adsmanagement.notifications.NotificationService;
import com.adsmanagement.notifications.NotificationType;
import com.adsmanagement.spaces.dto.CreateSpaceDto;
import com.adsmanagement.spaces.dto.CreateSpaceRequestDto;
import com.adsmanagement.spaces.dto.ProcessResponseDto;
import com.adsmanagement.spaces.models.RequestState;
import com.adsmanagement.spaces.models.Space;
import com.adsmanagement.spaces.models.SpaceRequest;
import com.adsmanagement.surfaceAllowance.SurfaceAllowanceRepository;
import com.adsmanagement.surfaces.SurfaceRepository;
import com.adsmanagement.surfaces.SurfaceRequestRepository;
import com.adsmanagement.users.models.User;
import com.adsmanagement.wards.Ward;
import com.adsmanagement.wards.WardRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class SpaceService {
    private final SpaceRepository spaceRepository;
    private final SurfaceRepository  surfaceRepository;
    private final SpaceRequestRepository spaceRequestRepository;

    private final NotificationService notificationService;

    private final DistrictRepository districtRepository;

    private final WardRepository wardRepository;

    private final SurfaceAllowanceRepository surfaceAllowanceRepository;

    private final SurfaceRequestRepository surfaceRequestRepository;

    @Autowired
    public SpaceService(SpaceRepository spaceRepository,
                        DistrictRepository districtRepository,
                        WardRepository wardRepository,
                        SpaceRequestRepository spaceRequestRepository,
                        SurfaceAllowanceRepository surfaceAllowanceRepository,
                        SurfaceRepository  surfaceRepository, NotificationService notificationService, SurfaceRequestRepository surfaceRequestRepository
    ) {
        this.spaceRepository = spaceRepository;
        this.districtRepository = districtRepository;
        this.wardRepository = wardRepository;
        this.spaceRequestRepository = spaceRequestRepository;
        this.surfaceAllowanceRepository = surfaceAllowanceRepository;
        this.surfaceRepository = surfaceRepository;
        this.notificationService = notificationService;
        this.surfaceRequestRepository = surfaceRequestRepository;
    }

    public Page<Space> findAll(Short page, Short size, Short cityId, List<Short> wardIds, List<Short> districtIds) {
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

        Page<Space> data;
        if (wardIds != null && !wardIds.isEmpty()) {
            data = this.spaceRepository.findAllByWardIdIn(wardIds,pageable);
        } else {
            data = this.spaceRepository.findAll(pageable);
        }

        return data;
    }

    public Space create(CreateSpaceDto createSpaceDto) {
        return this.spaceRepository.save(createSpaceDto.ToSpace());
    }

    public SpaceRequest createRequest(CreateSpaceRequestDto createSpaceRequestDto, User user){
        return this.spaceRequestRepository.save(createSpaceRequestDto.ToSpaceRequest(user));
    }

    @Transactional
    public SpaceRequest processRequest(SpaceRequest req, ProcessResponseDto processResponseDto, User user){

        req.setResponse(processResponseDto.getResponse());
        req.setApprovedBy( new User(user.getId()));
        req.setState(processResponseDto.getState());

        var res = this.spaceRequestRepository.save(req);

        var space = req.getSpace();

        if (processResponseDto.getState() == RequestState.APPROVED) {
            if (space != null) {
                space.setFieldByRequest(req);
                var sp = this.spaceRepository.save(space);
            }

        }

        NotificationType notificationType;
        switch (processResponseDto.getState()){
            case APPROVED -> notificationType = NotificationType.REQUEST_APPROVED;
            case REJECTED -> notificationType = NotificationType.REQUEST_REJECTED;
            case CANCELED -> notificationType = NotificationType.REQUEST_CANCELED;
            default -> notificationType = NotificationType.REQUEST_IN_PROGRESS;
        }
        var noti = new Notification((short) 0,req.getUser(),false,new Date(),new Date(),"",req.getResponse(),
                notificationType, space.getLatitude(), space.getLongitude());

        this.notificationService.save(noti);


        return res;
    }


    public Page<SpaceRequest> findAllRequest(Short page, Short size,Short spaceId, Short cityId, List<Short> wardIds, List<Short> districtIds) {
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

        Page<SpaceRequest> data;
        if (wardIds != null && !wardIds.isEmpty()) {
            if (spaceId != null) {
                data = this.spaceRequestRepository.findAllByWardIdInAndSpaceId(wardIds,spaceId,pageable);
            } else {
                data = this.spaceRequestRepository.findAllByWardIdIn(wardIds,pageable);
            }
        } else {
            if (spaceId != null) {
                data = this.spaceRequestRepository.findAllBySpaceId(spaceId,pageable);
            } else {
                data = this.spaceRequestRepository.findAll(pageable);
            }
        }

        return data;
    }


    public Optional<Space> findById(Short id) {
        return this.spaceRepository.findById(id);
    }

    @Transactional
    public void delete(Short id) {
        this.spaceRequestRepository.deleteBySpaceId(id);
        this.surfaceAllowanceRepository.deleteBySpaceId(id);
        this.surfaceRequestRepository.deleteBySpaceId(id);
        this.surfaceRepository.deleteBySpaceId(id);
        this.spaceRepository.deleteById(id);
    }
}
