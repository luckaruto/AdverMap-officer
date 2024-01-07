package com.adsmanagement.surfaces;

import com.adsmanagement.spaces.models.SpaceRequest;
import com.adsmanagement.surfaces.models.SurfaceRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SurfaceRequestRepository extends JpaRepository<SurfaceRequest, Short>, CrudRepository<SurfaceRequest, Short> {
    Page<SurfaceRequest> findAll(Pageable pageable);

    @Query(value = "SELECT sw.* FROM surface_requests sw INNER JOIN surfaces s ON s.id = sw.surface_id INNER JOIN spaces sp ON sp.id = s.space_id INNER JOIN wards w ON w.id = sp.ward_id WHERE w.id IN (:ward_ids) AND s.id IN (:surface_ids)",
            countQuery = "SELECT count(*) FROM surface_requests sw INNER JOIN surfaces s ON s.id = sw.surface_id INNER JOIN spaces sp ON sp.id = s.space_id INNER JOIN wards w ON w.id = sp.ward_id WHERE w.id IN (:ward_ids) AND s.id IN (:surface_ids)",
            nativeQuery = true)
    Page<SurfaceRequest> findAllByWardIdsAndSurfaceIds(Pageable pageable, @Param("ward_ids") List<Short> wardIds,@Param("surface_ids") List<Short> surfaceIds);

    @Query(value = "SELECT sw.* FROM surface_requests sw INNER JOIN surfaces s ON s.id = sw.surface_id INNER JOIN spaces sp ON sp.id = s.space_id INNER JOIN wards w ON w.id = sp.ward_id WHERE w.id IN (:ward_ids)",
            countQuery = "SELECT count(*) FROM surface_requests sw INNER JOIN surfaces s ON s.id = sw.surface_id INNER JOIN spaces sp ON sp.id = s.space_id INNER JOIN wards w ON w.id = sp.ward_id WHERE w.id IN (:ward_ids)",
            nativeQuery = true)
    Page<SurfaceRequest> findAllByWardIds(Pageable pageable, @Param("ward_ids") List<Short> wardIds);

    @Query(value = "SELECT sw.* FROM surface_requests sw INNER JOIN surfaces s ON s.id = sw.surface_id  WHERE  s.id IN (:surface_ids)",
            countQuery = "SELECT count(*) FROM surface_requests sw INNER JOIN surfaces s ON s.id = sw.surface_id  WHERE s.id IN (:surface_ids)",
            nativeQuery = true)
    Page<SurfaceRequest> findAllBySurfaceIds(Pageable pageable,@Param("surface_ids") List<Short> surfaceIds);
}