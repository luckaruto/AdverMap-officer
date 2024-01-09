package com.adsmanagement.notifications;


import com.adsmanagement.reports.models.Report;
import com.adsmanagement.reports.models.ReportState;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;


public interface NotificationRepository extends JpaRepository<Notification, Short>, CrudRepository<Notification, Short> {

    Page<Notification> findAll(Pageable pageable);

    Page<Notification> findAllByUserAddress(Pageable pageable, String userAddress);

    Page<Notification> findAllByIsSeen(Pageable pageable, Boolean isSeen);

    Page<Notification> findAllByUserId(Pageable pageable, Short userId);

    Page<Notification> findAllByIsSeenAndUserAddress(Pageable pageable, Boolean isSeen, String userAddress);


    long countByUserIdAndIsSeen(Short userId, Boolean isSeen);

}