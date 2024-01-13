package com.adsmanagement.reports;


import com.adsmanagement.reports.models.Report;
import com.adsmanagement.reports.models.ReportState;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;


public interface ReportRepository extends JpaRepository<Report, Short>, CrudRepository<Report, Short> {

    Page<Report> findAll(Pageable pageable);

    Page<Report> findAllByState(Pageable pageable, ReportState state);

    Page<Report> findAllByWardIdIn(Pageable pageable, List<Short> wardIds);

    Page<Report> findAllByWardIdInAndState(Pageable pageable, List<Short> wardIds, ReportState state);

    Page<Report> findAllBySurfaceIdIn(Pageable pageable, List<Short> surfaceIds);

    Page<Report> findAllBySurfaceIdInAndState(Pageable pageable, List<Short> surfaceIds, ReportState state);

    Page<Report> findAllByWardIdInAndSurfaceIdIn(Pageable pageable, List<Short> wardIds, List<Short> surfaceIds);
    Page<Report> findAllByWardIdInAndSurfaceIdInAndState(Pageable pageable, List<Short> wardIds, List<Short> surfaceIds, ReportState state);

    Long countByReportTypeId(Short reportTypeId);
}