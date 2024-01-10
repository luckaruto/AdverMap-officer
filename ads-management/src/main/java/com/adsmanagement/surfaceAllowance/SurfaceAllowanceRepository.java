package com.adsmanagement.surfaceAllowance;
;
import com.adsmanagement.surfaceAllowance.models.SurfaceAllowance;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface SurfaceAllowanceRepository extends JpaRepository<SurfaceAllowance, Short>, CrudRepository<SurfaceAllowance, Short> {


    Page<SurfaceAllowance> findAllByWardIdIn(List<Short> wardIds, Pageable pageable);
    List<SurfaceAllowance> findAllByWardIdIn(List<Short> wardIds);
}