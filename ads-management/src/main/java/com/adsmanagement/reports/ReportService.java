package com.adsmanagement.reports;

import com.adsmanagement.config.EmailService;
import com.adsmanagement.districts.District;
import com.adsmanagement.districts.DistrictRepository;
import com.adsmanagement.notifications.NotificationService;
import com.adsmanagement.reports.dto.CreateReportDto;
import com.adsmanagement.reports.dto.ProcessReportDto;
import com.adsmanagement.reports.models.Report;
import com.adsmanagement.reports.models.ReportState;
import com.adsmanagement.spaces.SpaceRepository;
import com.adsmanagement.surfaces.SurfaceRepository;
import com.adsmanagement.users.models.User;
import com.adsmanagement.wards.Ward;
import com.adsmanagement.wards.WardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ReportService {
    private final SurfaceRepository surfaceRepository;

    private final EmailService emailService;
    private final ReportRepository reportRepository;
    private final SpaceRepository spaceRepository;

    private final NotificationService notificationService;
    private final DistrictRepository districtRepository;

    private final WardRepository wardRepository;

    @Autowired
    public ReportService(
            SurfaceRepository surfaceRepository,
            DistrictRepository districtRepository,
            WardRepository wardRepository,
            SpaceRepository spaceRepository,
            ReportRepository reportRepository,
            EmailService emailService,
            NotificationService notificationService
    ) {
        this.surfaceRepository = surfaceRepository;
        this.districtRepository = districtRepository;
        this.wardRepository = wardRepository;
        this.spaceRepository = spaceRepository;
        this.reportRepository = reportRepository;
        this.emailService = emailService;
        this.notificationService = notificationService;
    }

    public Page<Report> findAll(Short page, Short size, Short cityId, List<Short> wardIds, List<Short> districtIds, List<Short> surfaceIds, ReportState reportState) {
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

    public Report process(Short id, User user, ProcessReportDto processReportDto) {
        var report = this.reportRepository.findById(id);
        if (report == null || report.isEmpty()){
            return null;
        }
        var u = report.get();
        u.setState(processReportDto.getState());
        u.setResponse(processReportDto.getResponse());
        u.setApprovedBy(new User(user.getId()));

        var re = this.reportRepository.save(u);

        this.emailService.sendReportMail(re);

        this.notificationService.sendNotifyForReport(id);

        return re;
    }

    public Optional<Report> findById(Short id) {
        return this.reportRepository.findById(id);
    }

    public  Page<Report> findBySurfaceId(Short page, Short size,Short id){
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());

        var list = new ArrayList<Short>();
        list.add(id);
        return this.reportRepository.findAllBySurfaceIdIn(pageable,list);
    }

    public Long countByReportType(Short reportTypeId) {
        return this.reportRepository.countByReportTypeId(reportTypeId);
    }
}
