package com.adsmanagement.reports;

import com.adsmanagement.districts.District;
import com.adsmanagement.districts.DistrictRepository;
import com.adsmanagement.reports.dto.CreateReportDto;
import com.adsmanagement.reports.models.Report;
import com.adsmanagement.reports.models.ReportState;
import com.adsmanagement.spaces.SpaceRepository;
import com.adsmanagement.surfaces.SurfaceRepository;
import com.adsmanagement.wards.Ward;
import com.adsmanagement.wards.WardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ReportService {
    private final SurfaceRepository surfaceRepository;

    private final ReportRepository reportRepository;
    private final SpaceRepository spaceRepository;

    private final DistrictRepository districtRepository;

    private final WardRepository wardRepository;

    @Autowired
    public ReportService(
            SurfaceRepository surfaceRepository,
            DistrictRepository districtRepository,
            WardRepository wardRepository,
            SpaceRepository spaceRepository,
            ReportRepository reportRepository
    ) {
        this.surfaceRepository = surfaceRepository;
        this.districtRepository = districtRepository;
        this.wardRepository = wardRepository;
        this.spaceRepository = spaceRepository;
        this.reportRepository = reportRepository;
    }

    public Page<Report> findAll(Short page, Short size, Short cityId, List<Short> wardIds, List<Short> districtIds, List<Short> surfaceIds, ReportState reportState) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());

        if (wardIds == null || wardIds.isEmpty()) {
            // filter by cityId
            if (districtIds == null || districtIds.isEmpty()) {
                Page<District> districtRes = this.districtRepository.findAllByCity_Id(cityId,pageable);

                List<District> districts  = districtRes.getContent();
                if (districts != null && !districts.isEmpty()) {
                    districtIds = new ArrayList<>();
                    for (int i = 0; i < districts.size(); i++ ){
                        districtIds.add(districts.get(i).getId());
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

        if (wardIds != null && wardIds.size() > 0) {
            if (surfaceIds != null && surfaceIds.size()>0) {
                if (reportState != null) {
                    return this.reportRepository.findAllByWardIdInAndSurfaceIdInAndState(pageable, wardIds, surfaceIds, reportState);
                } else {
                    return this.reportRepository.findAllByWardIdInAndSurfaceIdIn(pageable, wardIds, surfaceIds);
                }
            } else {
                if (reportState != null) {
                    return this.reportRepository.findAllByWardIdInAndState(pageable, wardIds, reportState);
                } else {
                    return this.reportRepository.findAllByWardIdIn(pageable, wardIds);
                }
            }
        }

        if (surfaceIds != null && surfaceIds.size()>0) {
            if (reportState != null) {
                return this.reportRepository.findAllBySurfaceIdInAndState(pageable, surfaceIds, reportState);
            } else {
                return this.reportRepository.findAllBySurfaceIdIn(pageable, surfaceIds);
            }
        } else {
            if (reportState != null) {
                return this.reportRepository.findAllByState(pageable, reportState);
            } else {
                return this.reportRepository.findAll(pageable);
            }
        }

    }

    public Report create(CreateReportDto createReportDto) {
        return this.reportRepository.save(createReportDto.toReport());
    }

}
