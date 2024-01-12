package com.adsmanagement.notifications;

import com.adsmanagement.config.EmailService;
import com.adsmanagement.districts.District;
import com.adsmanagement.districts.DistrictRepository;
import com.adsmanagement.reports.ReportRepository;
import com.adsmanagement.reports.dto.CreateReportDto;
import com.adsmanagement.reports.dto.ProcessReportDto;
import com.adsmanagement.reports.models.Report;
import com.adsmanagement.reports.models.ReportState;
import com.adsmanagement.spaces.SpaceRepository;
import com.adsmanagement.surfaces.SurfaceRepository;
import com.adsmanagement.users.UserManagementDistrictRepository;
import com.adsmanagement.users.UserManagementWardRepository;
import com.adsmanagement.users.models.User;
import com.adsmanagement.wards.Ward;
import com.adsmanagement.wards.WardRepository;
import com.adsmanagement.ws.WSService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class NotificationService {


    private final NotificationRepository notificationRepository;

    private final ReportRepository reportRepository;

    private final UserManagementDistrictRepository userManagementDistrictRepository;


    private final UserManagementWardRepository userManagementWardRepository;

    private final WSService wsService;
    @Autowired
    public NotificationService(
            NotificationRepository notificationRepository,
            ReportRepository reportRepository,
            UserManagementDistrictRepository userManagementDistrictRepository,
            UserManagementWardRepository userManagementWardRepository,
            WSService wsService
    ) {
        this.notificationRepository = notificationRepository;
        this.reportRepository = reportRepository;
        this.userManagementWardRepository = userManagementWardRepository;
        this.userManagementDistrictRepository = userManagementDistrictRepository;
        this.wsService = wsService;
    }

    public void sendNotifyForReport(Short reportId) {
        var reportO = this.reportRepository.findById(reportId);
        if (reportO == null || reportO.isEmpty()) {
            return;
        }

        var report = reportO.get();

        if (report.getUserAddress() != null && report.getUserAddress() != "") {
            Notification noti = new Notification((short) 0, report, null, false, new Date(), new Date(), report.getUserAddress(), report.getState(), report.getResponse(), NotificationType.USER);
            this.notificationRepository.save(noti);

            this.wsService.notifyUser(report.getUserAddress(),"test");
        }

        var approver = report.getApprovedBy();
        if (approver != null) {
            Notification noti = new Notification((short) 0, report, approver, false, new Date(), new Date(), report.getUserAddress(), report.getState(), report.getResponse(), NotificationType.ADMIN);
            this.notificationRepository.save(noti);
            this.wsService.notifyUser(approver.getId().toString(),"test");

        } else {
            var ward = report.getWard();
            var wardId = ward.getId();

            var wardUser = this.userManagementWardRepository.findByWardId(wardId);

            if (wardUser != null && wardUser.size() > 0) {
                for (var i = 0; i < wardUser.size(); i++) {
                    Notification noti = new Notification((short) 0, report, wardUser.get(i).getUser(), false, new Date(), new Date(), report.getUserAddress(), report.getState(), report.getResponse(), NotificationType.ADMIN);
                    this.notificationRepository.save(noti);
                    this.wsService.notifyUser(wardUser.get(i).getUser().toString(),"test");

                }
            }

            var districtId = ward.getDistrict().getId();

            var districtUser = this.userManagementDistrictRepository.findByDistrictId(wardId);

            if (districtUser != null && districtUser.size() > 0) {
                for (var i = 0; i < districtUser.size(); i++) {
                    Notification noti = new Notification((short) 0, report, districtUser.get(i).getUser(), false, new Date(), new Date(), report.getUserAddress(), report.getState(), report.getResponse(), NotificationType.ADMIN);
                    this.notificationRepository.save(noti);
                    this.wsService.notifyUser(districtUser.get(i).getUser().toString(),"test");

                }
            }
        }

    }

    public Page<Notification> findAll(Short page, Short size, Short userId) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        return this.notificationRepository.findAllByUserId(pageable, userId);
    }

    public long count(Short userId) {
        return this.notificationRepository.countByUserIdAndIsSeen(userId,false);
    }

    public Notification seen(Short notiId, Short userId) {

        var noti = this.notificationRepository.getById(notiId);

        var userNoti = noti.getUser();
        if (userNoti == null) {
            return  null;
        }

        if (userNoti.getId() != userId) {
            return null;
        }

        noti.setIsSeen(true);

        return this.notificationRepository.save(noti);
    }

    public Integer seenAll(Short userId) {

        var notiList = this.notificationRepository.findAllByUserIdAndIsSeen(userId,false);
        if (notiList== null || notiList.size() == 0){
            return 0;
        }


        for (var i = 0; i< notiList.size();i++){
            var noti = notiList.get(i);
            noti.setIsSeen(true);
            this.notificationRepository.save(noti);
        }



        return notiList.size();
    }


}