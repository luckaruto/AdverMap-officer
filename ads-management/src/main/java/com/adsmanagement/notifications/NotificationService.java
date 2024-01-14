package com.adsmanagement.notifications;

import com.adsmanagement.reports.ReportRepository;
import com.adsmanagement.users.UserManagementDistrictRepository;
import com.adsmanagement.users.UserManagementWardRepository;
import com.adsmanagement.ws.Message;
import com.adsmanagement.ws.WSService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Date;

import static com.adsmanagement.spaces.models.RequestState.APPROVED;

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

        noti.setSeen(true);

        return this.notificationRepository.save(noti);
    }

    public Integer seenAll(Short userId) {

        var notiList = this.notificationRepository.findAllByUserIdAndIsSeen(userId,false);
        if (notiList== null || notiList.size() == 0){
            return 0;
        }


        for (var i = 0; i< notiList.size();i++){
            var noti = notiList.get(i);
            noti.setSeen(true);
            this.notificationRepository.save(noti);
        }



        return notiList.size();
    }

    public Notification save(Notification notification){


        var createdNoti = this.notificationRepository.save(notification);

        var message = new Message(notification.getType(),notification.getContent(),notification.getLatitude(), notification.getLongitude());

        if (createdNoti.getUser() != null ){
            this.wsService.notifyUser(createdNoti.getUser().getId().toString(),message);
        }

        return createdNoti;
    }

}