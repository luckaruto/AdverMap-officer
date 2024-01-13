package com.adsmanagement.reports;


import com.adsmanagement.reports.models.Report;
import com.adsmanagement.reports.models.ReportState;
import com.adsmanagement.reports.models.ReportType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;


public interface ReportTypeRepository extends JpaRepository<ReportType, Short>, CrudRepository<ReportType, Short> {

}